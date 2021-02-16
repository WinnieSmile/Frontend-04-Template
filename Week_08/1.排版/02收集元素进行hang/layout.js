/**
 * 
 * 准备工作，处理了flexDirection 和 wrap相关的属性，抽象成 main cross相关的属性。
 */

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

    console.log('收集所有的元素',items);

}
module.exports = layout;
