/**
 * 
 * 准备工作，处理了flexDirection 和 wrap相关的属性，抽象成 main cross相关的属性。
 */

const { scrypt } = require("crypto");
const { mainModule } = require("process");

function getStyle(element){
    if(!element.style){
        element.style = {};
    }

    for(let prop in element.computedStyle){
        // console.log(prop);
        var p = element.computedStyle.value;
        element.style[prop] = element.computedStyle[prop].value

        if(element.style[prop].toString().match(/px$/)){
            element.style[prop] = parseInt(element.style[prop]);
        }
        if(element.style[prop].toString().match(/^[0-9\.]+$/)){
            element.style[prop] = parseInt(element.style[prop]);
        }
    }
    return element.style;

}


function layout(element){
    if(!element.computedStyle){
        return ;
    }

    var elementStyle = getStyle(element);

    if(elementStyle.display !== 'flex'){
        return
    }

    var items = element.children.filter(e => e.type === 'element');

    items.sort(function(a, b){
        return (a.order || 0) - (b.order || 0)
    });

    var style = elementStyle;

    ['width', 'height'].forEach(size => {
        if(style[size] === 'auto' || style[size] === ''){
            style[size] = null;
        }
    })


    if(!style.flexDirection || style.flexDirection === 'auto'){
        style.flexDirection = 'row'
    }
    if(!style.alignItems || style.alignItems === 'auto'){
        style.alignItems = 'stretch';
    }
    if(!style.justifyContent || style.justifyContent === 'auto'){
        style.justifyContent = 'flex-start';
    }
    if(!style.flexWrap || style.flexWrap === 'auto'){
        style.flexWrap = 'nowrap';
    }
    if(!style.alignContent || style.alignContent === 'auto'){
        style.alignContent = 'stretch';
    }   

    // 定义变量，来代替属性做一些计算
    var mainSize, mainStart, mainEnd, mainSign, mainBase, crossSize, crossStart, crossEnd, crossSign, crossBase;

    if(style.flexDirection === 'row'){
        mainSize = 'width';     //主轴尺寸
        mainStart = 'left';
        mainEnd = 'right';
        mainSign = +1;
        mainBase = 0;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';
    }

    if(style.flexDirection === 'row-reverse'){
        mainSize = 'width';
        mainStart = 'right';
        mainEnd = 'left';
        mainSign = -1;
        mainBase = style.width;

        crossSize = 'height';
        crossStart = 'top';
        crossEnd = 'bottom';        
    }

    if(style.flexDirection === 'column'){
        mainSize = 'height';
        mainStart = 'top';
        mainEnd = 'bottom';
        mainSize = +1;
        mainBase = 0;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if(style.flexDirection === 'column-reverse'){
        mainSize = 'height';
        mainStart = 'bottom';
        mainEnd = 'top';
        mainSign = -1;
        mainBase = style.height;

        crossSize = 'width';
        crossStart = 'left';
        crossEnd = 'right';
    }

    if(style.flexWrap === 'wrap-reverse'){
        var tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        crossSign = -1;
    }else {
        crossBase = 0;
        crossSign = 1;
    }

    // 收集元素进行
    /**
     *  如果父元素没有设置主轴尺寸，比如说它的主轴尺寸是 width ，父元素是没有width，那么它就会进入到一个模式叫做 AutoMainSize。
     *  AutoMainSize意思就是说因为父元素没设置主轴尺寸，所以说由子元素把它撑开，这种情况下，它的尺寸无论如何也不会超。
     */
    var isAutoMainSize = false; 

    // 如果父元素没有设置主轴尺寸（无论如何都会排进同一行去）
    if(!style[mainSize]){   // auto sizing
        elementStyle[mainSize] = 0;
        //把它的所有的子元素的mainSize加起来就是它的主轴的size了。       
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            if(itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)){
                elementStyle[mainSize] = elementStyle[mainSize]
            }
        }
        isAutoMainSize = true;
        // style.flexWrap = 'nowrap';
    }   

    
    var flexLine = []
    var flexLines = [flexLine]   //所有的行放一个数组，第一行至少要有一行

    var mainSpace = elementStyle[mainSize];  //剩余空间
    var crossSpace = 0;

    for(var i = 0; i < items.length; i++){
        var item = items[i];
        var itemStyle = getStyle(item);  //取出item

        if(itemStyle[mainSize] === null){
            itemStyle[mainSize] = 0;  //如果没设置主轴尺寸，就给它个默认值0
        }

        //如果有flex属性，说明这个元素是一个可伸缩的（如果可伸缩，那一定可以放进这一行，不论这一行剩余多少空间）
        if(itemStyle.flex){
            flexLine.push(item);  //将这个元素放到 flexLine里面
        }else if(style.flexWrap === 'nowrap' && isAutoMainSize){
            mainSpace -= itemStyle[mainSize];
            // 如果item的交叉轴不等于null，会给它的crossSpace
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)){
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);  //计算行高。给crossSpace取最高的那个，因为在flex布局里面，它一行有多高取决于这一行里面最高的元素有多高（交叉轴尺寸最大的那个）。
            }
            flexLine.push(item);
        }else {
            // 换行的逻辑
            if(itemStyle[mainSize] > style[mainSize]){   //有些元素特别大，它比父元素主轴尺寸还大
                itemStyle[mainSize] = style[mainSize];   //这种情况就给它压到跟主轴尺寸一边大
            }
            // 如果说主轴里面剩下的空间不足以容纳每一个元素，接下来会采取换行策略。
            if(mainSpace < itemStyle[mainSize]){
                // 实际剩余的尺寸和实际占的尺寸计算出来
                flexLine.mainSpace = mainSpace;     //主轴剩余空间存到这一行上（一个flexLine它的空间它有可能是被均匀分配，也有可能是全部分配在开始或者结束，这个取决于设置什么样对应的属性）
                flexLine.crossSpace = crossSpace;   //交叉轴空间
                
                flexLine = [item];   //创建新的flexLine（创建新行）
                flexLines.push(flexLine);
                mainSpace = style[mainSize];  //重置mainSpace和crossSpace
                crossSpace = 0;
            }else {
                flexLine.push(item);
                //如果能放下元素，直接push就行
            }
            // 计算主轴和交叉轴的尺寸
            if(itemStyle[crossSize] != null && itemStyle[crossSize] !== (void 0)){
                crossSpace = Math.max(crossSpace, itemStyle)
            }
            mainSpace -= itemStyle[mainSize];
        }

    }

    //如果元素最终已经没的话，会给最后一行的flexLine加上mainSpace
    flexLine.mainSpace = mainSpace; 

    /**
     * 主轴方向的计算：怎么样分配 mainSpace，以及flex属性，根据flex属性去分配每一行剩余的 mainSpace
     *  
     */
    if(style.flexWrap === 'nowrap' || isAutoMainSize){  //如果是no-wrap的话，先给 crossSpace保存一下
        flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace;
    }else {
        flexLine.crossSpace = crossSpace;
    }

    // （单行逻辑）如果mainSpace是小于0的话，会对所有的元素进行等比压缩。等比压缩：根据它的主轴size去压缩的
    if(mainSpace < 0){
        // 等比压缩
        // overflow (happens only if container is single line), scale every item 
        var scale = style[mainSize] / (style[mainSize] - mainSpace);  // 期望的尺寸：style[mainSize] 容器的主轴尺寸 - mainSpace
        var currentMain = mainBase;
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            var itemStyle = getStyle(item);  //循环每一个元素，把它的样式找出来
            
            if(itemStyle.flex){  //flex是没有权利参与等比压缩的，它的尺寸就是0
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;  //如果有主轴尺寸的话，就会给它乘一个scale

            // 计算的不是元素的尺寸，而是元素的位置，所以会根据当前的主轴的位置，算出来一个压缩之后的left和right
            itemStyle[mainStart] = currentMain;  //当前排的位置
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];   //下一个元素的mainStart就是上一个元素的mainEnd
        }
    }else {
        // 多行逻辑（对每一个flexLine做处理）
        // process each flex line
        flexLines.forEach(function (items){

            var mainSpace = items.mainSpace;
            var flexTotal = 0;
            for(var i = 0; i < items.length; i++){
                var item = items[i];
                var itemStyle = getStyle(item);

                // 找到flex元素
                if((itemStyle.flex !== null) && (itemStyle.flex !== (void 0))){
                    flexTotal += itemStyle.flex;  //如果有flex的话，加到flex的总值上去
                    continue;
                }
            }

            // 有flex，则均匀地分布给每一个flex元素，如果没有flex元素，就需要用justifyContent。
            if(flexTotal > 0){
                // There is flexible flex items
                // 有flex元素，会占满整个行，justifyContent属性就用不上
                var currentMain = mainBase;
                for(var i = 0; i < items.length; i++){
                    var item = items[i];
                    var itemStyle = getStyle(item);

                    // 如果是flex元素，会根据mainSpace，收集元素进行的时候已经算出来的
                    if(itemStyle.flex){
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;  //每一行的主轴方向的剩余空间（等比划分）
                    }
                    itemStyle[mainStart] = currentMain
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd];
                }
            }else{
                // There is *NO* flexible flex items, which means, justifyContent shoud work
                // 没有flex元素，就需要把主轴方向的剩余空间，根据justifyContent规则去把它分配。justifyContent的值有（以row为例）：flex-start(从左向右排)、flex-end(从右向左排)、center(左右各留一个边)、space-between(所有元素的间隔)、space-around(前后各有间隔)                
                if(style.justifyContent === 'flex-start'){
                    var currentMain = mainBase;
                    var step = 0;   // 元素之间是没有间隔的
                }
                if(style.justifyContent === 'flex-end'){
                    var currentMain = mainSpace * mainSign + mainBase;
                    var step = 0;  // 元素之间没有间隔
                }               
                if(style.justifyContent === 'center'){
                    var currentMain = mainSpace / 2 * mainSign + mainBase;
                    var step = 0;   // 元素之间没有间隔
                }
                if(style.justifyContent === 'space-between'){
                    var step = mainSpace / (items.length - 1) * mainSign;  //每一个元素会有一个间隔，有(items.length-1)个间隔
                    var currentMain = mainBase;                  
                }
                if(style.justifyContent === 'space-around'){
                    var step = mainSpace / items.length * mainSign;  //有元素多个间隔
                    var currentMain = step / 2 + mainBase;                  
                }
                // 所有的元素都是会根据 mainStart和mainSize去算mainEnd。currentMain永远等于mainEnd加上一个step
                for(var i = 0; i < items.length; i++){
                    var item = items[i];
                    itemStyle[mainStart, currentMain];
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
                    currentMain = itemStyle[mainEnd] + step;
                }
                // 如果是row的话，就是宽 左 右 这三个值都已经被计算完毕了
                
            }


        })
    }

    // 计算交叉轴
    // compute the cross axis sizes
    // align-items, align-self
    var crossSpace;   //定义一个crossSpace变量，依次把它的交叉轴的所有的行的行高（flexLine的行高）都减掉

    if(!style[crossSize]){  //auto sizing
        crossSpace = 0; 
        elementStyle[crossSize] = 0;
        // 撑开的高度
        for(var i = 0; i < flexLines.length; i++){
            elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
        }
    }else {
        // 总的crossSize，依次减掉每一行的crossSize，最后就会得到一个剩余的行高
        crossSpace = style[crossSize]
        for(var i = 0; i < flexLines.length; i++){
            crossSpace -= flexLines[i].crossSpace;
        }
    }

    // 根据flex的alignContent属性分配行高
    if(style.flexWrap === 'wrap-reverse'){
        crossBase = style[crossSize];  //交叉轴计算是否从尾巴向头排布
    }else {
        crossBase = 0;
    }
    var lineSize = style[crossSize] / flexLines.length;   //计算每一行的 lineSize，每一行的lineSize等于总体的交叉轴尺寸然后除以行数。有多少行就会除掉

    var step;
    if(style.alignContent === 'flex-start'){
        crossBase += 0;
        step = 0;
    }
    if(style.alignContent === 'flex-end'){
        crossBase += crossSign * crossSpace;
        step = 0;
    }
    if(style.alignContent === 'center'){
        crossBase += crossSign * crossSpace / 2;   //剩余的空间除以2
        step = 0;
    }
    if(style.alignContent === 'space-between'){
        crossBase += 0;
        step = crossSpace / (flexLines.length - 1);
    }
    if(style.alignContent === 'space-around'){
        step = crossSpace / (flexLines.length);
        crossBase += crossSign * step / 2;
    }
    if(style.alignContent === 'stretch'){
        crossBase += 0;
        step = 0;
    } 
    
    flexLines.forEach(function (items){
        // 当前行的真实的交叉轴的尺寸
        var lineCrossSize = style.alignContent === 'stretch' ?
            items.crossSpace + crossSpace / flexLines.length :
            items.crossSpace;
        // 处理每一个元素
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            var itemStyle = getStyle(item);

            var align = itemStyle.alignSelf || style.alignItems;

            if(itemStyle[crossSize] === null){
                itemStyle[crossSize] = (align === 'stretch') ?
                lineCrossSize : 0
            }
            if(align === 'flex-start'){
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if(align === 'flex-end'){               
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize]
            }
            if(align === 'center'){
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if(align === 'stretch'){
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)))

                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart])
            }
        }

        // 每一行最终都会去影响交叉轴的位置，因为每一行都有一个base的位置
        crossBase += crossSign * (lineCrossSize + step);   //每一行结束了之后，我们要给 crossBase加上去
    })


    console.log('收集所有的元素',items);

}
module.exports = layout;
