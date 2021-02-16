<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2021-02-16 21:29:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_08\README.md
-->
# 浏览器工作原理      
CSS规则的计算：计算每个元素匹配了哪些CSS规则，并且把CSS规则里面的内容放进元素的computedStyle上。 
## （一）排版（布局）   layout   
**第一步：根据浏览器属性进行排版**      
在CSS的基础上，通过排版的计算，得到一个带位置的DOM树，为下一步真实的渲染打下基础。

* 正常流：包含了 position、display、float等一系列属性。    
* flex      
* grid 

在`flex`排版里边，因为我们有时候是需要纵排，有时候是横排，都会受一些 flex属性 去限制。    
`主轴（Main Axis）`：排版的时候主要的延伸方向    
`交叉轴（Cross Axis）`：与主轴方向垂直    
在排版的最开始，根据 flex-direction 等属性去设置一下主轴是哪一个主轴，交叉轴是哪一个交叉轴。  

`flex`排版为例：    
```   
flex-direction: row
Main: width x left right
Cross: height y top bottom 
```
```
flex-direction: column
Main: height y top bottom
Cross: width x left right
```    
flex布局是需要知道子元素的，所以可以认为它的子元素一定是发生在标签的结束标签之前        

**第二步：收集元素进行**    
收集元素进行时为了后面计算元素位置的一个重要的准备工作，因为flex是允许我们去分行的，它的分行跟正常流其实算法是比较像的这样的一种排版方式。

当我们的元素所有的子元素的尺寸超过父元素的主轴尺寸的时候，那么就会进行分行。是允许用 no-wrap进行控制的。如果设置no-wrap，收集元素进行就会非常简单，强行分配进第一行就可以了。 

但是大部分情况都不是no-wrap：当来一个元素的时候，就先往当前行里面去放，如果来了一个元素，发现超出了放不下了，这个时候就不把超出的元素放进当前行，会新建一行。然后把这个元素放进一个新的行里。这样就又有了一个新的当前行，并且有较多的剩余空间。以此类推，把每一个元素按照这样的方式去收集进不同的行里面。

把flex容器的子元素flex item 收进各个行里面。

分行算法：      
* 根据主轴尺寸，把元素分进行
* 若设置了 no-wrap，则强行分配进第一行 

**第三步：计算主轴**    
* 计算主轴方向   
    * 找出所有Flex元素
    * 把主轴方向的剩余尺寸按比例分配给这些元素
    * 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素
    * 如果没有flex元素，则会根据 justifyContent来及计算每个元素的位置

根据flex属性来计算每一行里面的尺寸。    
在主轴方向已经有了size了，比如主轴方向如果是row的话，那么它的主轴的对应的属性就是width，flex布局最大的一个特点就是有这种带flex属性的元素，我们需要做的就是找出所有带flex属性的元素，然后把其他元素排剩下的空间，给它在flex属性上平均分配。    

flex是有值的，如果有多个flex元素，就按比例分配，比如说有三个flex元素，分别是 1 2，那么他们就分别是 1/4  1/4 和 1/2。就会把它按flex值的比例给它计算出来。    

当剩余空间是负数的时候，当我们去写不是它自由换行的模式，no-wrap的情况，所有的flex元素就都把它的宽度设置为0。剩余的元素会做等比例压缩。    

**第四步：计算交叉轴**     
主轴方向计算完之后，还需要把交叉轴尺寸全计算完，假如是row，主轴计算出来元素的width left right，下面就需要在交叉轴上计算它的height top bottom。   
一个元素的width left right height top bottom 都确定的话，这个元素的位置就完全确定了。（实际上这6个里边确定了4个，就可以确定剩余的2个了）     

行指flexLine，每一个flexLine的交叉轴尺寸其实已经可以知道
* 计算交叉轴方向
    * 根据每一行中最大元素尺寸计算行高
    * 根据行高flex-align 和 item-align，确定元素具体位置

## （二）渲染   
**第一步：绘制单个元素**   
准备一个图形环境，因为 Node.js没有图形的封装，所以用图片生成图片来代替，把绘制屏幕变成绘制到图片。    
http://npmjs.com/package/images    

总结：   
* 绘制需要依赖一个图形环境    
* 我们采用了 npm 包 images   
* 绘制在一个 viewport 上进行   
* 与绘制相关的属性：background-color、border、background-image等    
也可以根据 background-image 和 border继续扩展绘制的逻辑。   
gradient 是需要用 webGL 的库进行的。   
所有渲染的主体在render这个函数里面进行。 

**第二步：绘制DOM树**    
从单个元素的绘制进行到DOM绘制，只需要递归的调用它的render函数，就可以继续完成它的所有的DOM树的绘制。    
* 递归调用子元素的绘制方法完成DOM树的绘制   
* 忽略一些不需要绘制的节点   
* 实际浏览器中，文字绘制是难点，需要依赖字体库，把字体变成图片再去渲染，这里忽略。   
* 实际浏览器中，还会对一些图层做 compositing ，这里忽略。    

<br>

**浏览器从URL到最终呈现的过程：**    
URL → HTML代码 → DOM树 → 给DOM树加上CSS属性 → 把这些CSS属性，计算出来每一个元素的位置 → 在一张图片上把网页的内容渲染出来

   
