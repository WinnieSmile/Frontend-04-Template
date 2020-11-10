<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2020-11-11 00:10:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_10\README.md
-->
# CSS排版     
## （一）盒
``` 
源代码      语义        表现
标签        元素        盒      
Tag         Element     Box
``` 
* HTML代码中可以书写开始 `标签`，结束 `标签`，和自封闭 `标签` 。    
* 一对起止 `标签`，表示一个 `元素`。   
* DOM树中存储的是 `元素`，和其他类型的节点（Node）。       
*Dom树中存储的不全是元素，Dom树中存储的东西，叫做节点node，元素是节点的一种。比如说文本节点也是节点，但它并不是元素；注释节点也是节点，但是不是元素；CDATA节点，还有一些像是 processing-instruction、DTD等都是会存进DOM树中，但是它并不是元素。* 
* CSS选择器选中的是`元素`，或者伪元素。      
* CSS选择器选中的 `元素`，在排版时可能产生多个`盒`。    
*CSS选择器选中的元素不一定是跟盒是一一对应关系，有可能是一对多的关系。但是有盒一般来说必定有对应的元素。伪元素也是依附于某个选中的元素产生的。*  
* 排版和渲染的基本单位时 `盒`。   
实际上很多个元素都会产生盒，比如说 inline 的元素它会因为分行而产生多个盒；而带有伪元素，被伪元素选择器选中的这些元素它也会生成多个盒，所以进行排版和渲染的基本单位都是盒。    

**盒模型**   
首先它是一个多层的结构，最里边的这一层叫做content，就是它的内容，在content和border之间有一圈空白，这一圈叫做padding，也就是内边距。在border的外边有一圈空白，这个叫做margin，也就是外边距。   
为什么要有padding和margin？    
padding主要影响的是盒内的排版，margin主要影响的是盒本身的排版。padding决定了里边可排布的content的区域的大小，margin决定了盒周围至少要存在的空白区域的大小。    
盒模型里边的width（宽度）也是有价值的，它有可能会被box-sizing属性去设置，最常见的两个值是 content-box、border-box。content-box意思是我们设置的width属性只包含content内容，所以这个时候盒它所排版占用的区块就是content-box的尺寸+它的padding+它的border+它的margin（这样不合常理）。所以后来出现 box-sizing:border-box。border-box它的宽度就包含了padding和border的尺寸。   
box-sizing:content-box;    content+padding+border+margin   
box-sizing:border-box;     content    
主要的盒模型影响的属性（影响盒模型的尺寸）：margin、padding、border、box-sizing

## （二）正常流
正常流 → flex排版 → grid排版   

CSS里排版只排两样东西：盒、文字。排版就是给每个盒安排到正确的位置，给每个字安排到正确的位置。正确的位置就是位置和尺寸。 （打比方就是我们的写字，写中文作文。从上到下，从左到右）   

正常流排版   
第一步：收集盒进行 （收集盒盒文字进行hang）   

第二步：计算盒在行hang中的排布  （盒和文字在行中的排布）  

第三步：计算行的排布  （计算行与行之间的排布）   

inline-level-box  行内的盒  （一行） 

block-level-box  块级盒  （单独占一行）    

line-box    行盒（文字和inline-level-box排出的行叫做行盒）   

实际上，在一个正常流里边，它就是一个一个的line-box和block-level-box这样的一个从上到下的排布。如果没有block-level-box，那就都是行盒，但是也是从上到下的一个流程，每个行盒的内部是有一个从左到右的这样的一个排布的方式。   

排块级的叫做 BFC（从上往下排布的上下文），行内的叫做 IFC（从左往右排布的上下文）可能受writing-mode的影响。    
即block-level-formatting-context（块级格式化上下文）和 inline-level-formatting-context（行内级格式化上下文）。    

正常流会分成块级的排布和行级的排布。


## （三）正常流的行级排布
css里的行模型   
line-top   
text-top   
base-line   
text-bottom   
line-bottom

* 注意点1：行内盒 inline-block, 它的基线是随着自己里面的文字去变化的。一般不建议给行内盒使用基线对齐的，一般是给个 vertical-align: top/bottom/middle 。   

```html
<div style="font-size: 50px; line-height: 100px; background-color: pink;">
   
    <span>Hello good 中文</span>
    <!-- 基线的对齐的规则：盒的下边缘与文字的下边缘对齐 -->
    <div style="line-height:70px; width:100px; height:150px; background-color:aqua; display:inline-block"></div>  

    <!-- 基线位置变了，它的基线变成了它里边文字的最后一行的基线 -->
    <div style="line-height:70px; width:100px; height:150px; background-color:aqua; display:inline-block">b</div> 
    
    <div style="line-height:70px; width:100px; height:150px; background-color:aqua; display:inline-block">b<br/>c</div>

</div>

```

解决方法：给个 vertical-align: top/bottom/middle
vertical-align: top 是跟行的顶缘对齐  
vertical-align: bottom 是跟行的底缘对齐   
vertical-align: text-bottom   跟文字的底部对齐

```html
<div style="font-size: 50px; line-height: 100px; background-color: pink;">

    <!-- 中心线 -->
    <div style="vertical-align: middle; overflow: visible; display: inline-block; width: 1px; height: 1px;">
        <div style="width: 1000px; height: 1px; background: red;"></div>
    </div>
   
    <span>Hello good 中文</span>
    <!-- <div style="line-height:70px; width:100px; height:150px; background-color:aqua; display:inline-block">b<br/>c</div> -->

    <!-- 使用 vertical-align -->
    <div style="vertical-align:top; line-height:70px; width:100px; height:150px; background-color:aqua; display:inline-block">b<br/>c</div>

</div>

```


## （四）正常流的块级排布 

float  与 clear   

浮动元素，浮动元素已经脱离了正常流，但是它是一个依附于正常流去定义的这样的一类元素的排布方式。  

float基本规则： 根据 W3C标准，float可以视为，先把这个元素排到页面的某个特定的位置，当它是正常流里的元素。如果上面有float，需要朝着这个方向去挤一下。  
计算位置的时候，这里的文字，会把行盒的宽度根据 float 产生的占据的宽度，然后来进行调整。float一个显著的特征就是：它会影响我们生成的这些行盒的这样的尺寸。   

当一个float元素出现了以后，它不止影响自己所在的这一行，凡是它的高度所占据的范围内，我们的所有的行盒都会根据这个 float 的元素的尺寸调整自己的大小超出了这个 float 的范围，那么就不考虑了。   


如果说有两个float，float:right在右边，下边又有一个float，此时下边这个float会受到上边float的影响。  

**margin折叠只有正常流里有，正常流里只有BFC里有margin折叠。margin 折叠只会发生在 BFC中。**



## （五）BFC合并
BFC：块级格式化上下文
* Block Container：里面有BFC的
能容纳正常流的盒，里面就有BFC，有哪些？

* Block-level Box：外面有BFC的
* Block Box = Block Container + Block-level Box:
里外都有BFC的。 

解释：Block-level Box 是外面有 BFC 的这种盒，
能放进 BFC 里的盒，正常流里有两种 Formatting Context ，一种是 BFC，一种是 IFC，所以说 文字只能放进 IFC里，盒的话要么把它放进里层的IFC里，要么放进外层的BFC里。如果没有IFC，就创建一个新的IFC，但是 Block-level Box ，它的盒子外面可以有BFC，也就是说它能够被放进 BFC 里的这种盒子，还有一个非常关键的是，Block Box，Block Box等于上面两个概念之和。就是说，它既是 Block Container ，又是 Block-level Box 。它就是里外都有BFC。  

**Block Container**  
display的值：
```
block           是Block Container
inline-block    是Block Container
table-cell      是Block Container （table-row 不是正常流，但是table-cell是）
flex item       display:flex;不是Block Container，但是它的子元素 flex item 如果没有特殊的display的话，那么它都是 Block Container
grid cell       所有的grid的cell都是 Block Container
table-caption   table有table-caption，表格的标题，它里边也是正常流。 
``` 
`所有能够容纳里边不是特殊的 display 的模式的，它里边默认就是正常流。`

**Block-level Box**
```
Block level                         Inline level

display: block                      display: inline-block
display: flex                       display: inline-flex
display: table                      display: inline-table
display: grid                       display: inline-grid
```
特殊：display: run-in


**Block Box**
设立 BFC  
* floats
* absolutely positioned elements
* block containers( such as inline-blocks, table-cells, and table-captions ) that are not block boxes,
    * flex items
    * grid cell
* and block boxes with 'overflow' other than 'visible'

什么时候，什么样的盒会创建 BFC ？Establish BFC 。第一种可能性是 floats、就是这些浮动的元素里边它就是一个正常的正常流，所以说它会创建BFC。 absolutely positioned elements 就是绝对定位的元素，它里边也会创建 BFC。  


**BFC合并**
* block box && overflow:visible 
    * BFC合并与float
    * BFC合并与边距折叠  
    
默认这些能容纳正常流的盒，我们都认为它会创建 BFC ，但是有一种情况例外，Block Box 里外都是 BFC ，并且 overflow 是 visible，就相当于是没有BFC，此时会发生 BFC合并。    
BFC合并后的影响：  
1. float：因为发生了合并，所以说里边的行盒跟这个 float 就有了一定的影响。正常来说，如果是 block box 、它的overflow 不是 visible，它会创建独立 BFC 的话，那么它是整个的 block box 放进 BFC 里，那么它的宽度，整个的 block box 受 BFC 影响。但是如果不创建 BFC，那么它里边的行盒受 float 的影响。   
2. 边距折叠只会发生在同一个BFC里，那么如果创建了新的 BFC 的话，那么它就不会发生边距折叠。另外，如果说没有创建 BFC 的话，它就存在着一个同向的边距折叠。


## （六）Flex排版
步骤：
* 收集盒进行  
* 计算盒在主轴方向的排布  
* 计算盒在交叉轴方向的排布     
flex是可以去调整排布的方向的，所以我们不会用正常的 top left bottom right 这样的体系去描述。而是用主轴和交叉轴去描述。  

具体解释：
* 分行  
    * 根据主轴尺寸，把元素分进行
    * 若设置了 no-wrap，则强行分配进第一行  

假如有一个元素，我们让它跟行剩余的空间去比较，如果说这个已经满了，我们就把它创建一个新行，把它放到下一行。注意：如果设置了 no-wrap， 则会强行分配到第一行里面去，下一步计算主轴的时候再去处理这些溢出的部分。正常情况下，如果是可以 wrap 的话，那么flex就是永远会把这个元素往下一行去分，而不会让它超出行宽。  
* 计算主轴方向
    * 找出所有 flex 元素
    * 把主轴方向的剩余尺寸按比例分配给这些元素
    * 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素。

flex的layout主要是有一个Flex元素这样的一个概念，所有的Flex元素也就是Flex的盒，在这个位置它们两个是等同的概念，那么所有的这些带 Flex的元素，那么它都有一个不固定的宽度。     
所以这一行有剩余空间的话，我们就会让所有的这些 Flex 盒填满剩余空间，因为Flex属性它是有比例的，它有一个Flex属性，Flex为1，就分一份，Flex为2就分两份。比如说这一行有两个Flex元素，一个Flex值为1，一个Flex值为2；剩余300px，那么Flex为1的分100px，Flex为2的分200px，按比分配。    
如果剩余空间为负数，那所有的这些带 Flex 的都置为0，把剩下的这些等比压缩就可以了。  

* 计算交叉轴方向
    * 根据每一行中最大元素尺寸计算行高
    * 根据行高 flex-align 和 item-align，确定元素具体位置。
    
Flex的行高一定是最大元素的高度，算出行高之后，可以根据行高和 flex-align (每个元素上面的属性) 和 item-align (外边的容器上的属性) 就可以确定所有元素的具体位置，它有 stretch start end middle 这样的排布的规则。这样我们就能知道所有的交叉轴方向所有的元素的位置和尺寸了。这样我们就完成了整个的Flex的计算。   


# CSS动画与绘制
CSS所谓控制表现，它是有3类的内容，第1类就是控制元素的位置和尺寸的信息的，第2个就是控制绘制和之后实际看到的渲染的信息。第3类是有一些交互与动画的信息。  
## （一）动画
CSS里面最直接的一些特性  
**Animation**  

* @keyframes 定义
* animation: 使用

```css
@keyframes mykf{
    from { background:red; }
    to { background: yellow; }
}

div {
    animation: mykf 5s infinite;
}
```
Animation 包含两个部分，第1部分是使用 keyframes去定义动画的关键帧，第二个是使用 animation 属性去使用 这个关键帧的部分。  
首先我们可以用 keyframes 的 @rule 来定义关键帧，这个关键帧可以写一个 from 和一个 to， from和to里面都是 declaration ，from 后边的declaration跟CSS的rule里面的 declaration 是同一种东西，它都是声明了一些属性和它们的值。   
把animation 的关键帧设成了之前预定义好的 mykf的值，给它定义了5秒，并且让它是一个 infinite。   

Animation   
* animation-name 时间曲线；
* animation-duration 动画的时长；
* animation-timing-function 动画的时间曲线；
* animation-delay 动画开始前的延迟；
* animation-iteration-count 动画的播放次数；
* animation-direction 动画方向。   

```css
@keyframes mykf{
    0% { top:0; transition:top ease }
    50% { top:30px; transition:top ease-in }
    75% { top:10px; transition:top ease-out }
    100% { top:0; transition:top linear }
}
```

keyframes的定义是可以使用百分比，也可以使用 from to，from 大致相当于 0% ；to大致相当于 100%    
每一个关键帧里面都可以去定义很多的属性，有一个常见的技巧是我们在这个里面去定义 transition ，而不是使用 animation 的 timing-function 来让这个值发生改变，这样的话，它的每个两个关键帧之间它的 timing-function 都可以不用一样，不像 animation ，一旦这样指了之后，它的整个 timing-function 就确定了。就没有办法分段去指定了。   


Transition  

* transition-property 要变换的属性；
* transition-duration 变换的时长；
* transition-timing-fuction 时间曲线；
* transition-delay 延迟   

transition-timing-function    
来自一个三次贝塞尔曲线，参考网站 https://cubic-bezier.com/    
贝塞尔曲线的横轴表示的是时间，纵轴表示的是我们的进展，横轴的时间也是一个比例的时间，纵轴的属性变化的进展，它也是一个比例的进展，所以它们两个都是 0~1 的区间。






## （二）颜色





## （三）绘制




