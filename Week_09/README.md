<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2020-11-01 23:32:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_09\README.md
-->
重学CSS
# CSS总论：
## CSS语法的研究  
CSS2.1的语法（与CSS3有语法上的差异，但是作为入门还是不错的）  
https://www.w3.org/TR/CSS21/grammar.html#q25.0   
https://www.w3.org/TR/css-syntax-3  


下面是CSS的产生式
```css
stylesheet
  : [ CHARSET_SYM STRING ';' ]?
    [S|CDO|CDC]* [ import [ CDO S* | CDC S* ]* ]*
    [ [ ruleset | media | page ] [ CDO S* | CDC S* ]* ]*
  ;  
```
解释：
符号使用上的区别：   
[] 方括号：代表组的概念     
? 问号：代表可以存在可以不存在的意思    
| 单竖线：表示或的关系   
*星号：表示 0 个或多个    
产生式的含义：   
最开始允许一个 CHARSET ，这个 CHARSET 就是@charset的结构，接下来允许出现若干个 import ， CHARSET要么没有，要么就是一个，import 是可以出现多个的，但是它必须是在最前，它一定是在 CHARSET 之后，但是它在其他的规则的最前。 

接下来它支持一个长列表，这个长列表里面有三种结构，ruleset media 和 page，其他的都是空白符，CDO CDC是HTML注释的起点和止点，这个可以理解为一个历史包袱，早年的CSS它为了支持HTML里面不要把CSS文本显示出来，所以说允许在这个地方用HTML注释把CSS的内容变成HTML注释，这样旧的浏览器就会把CSS文本理解成HTML注释，而新的浏览器就可以把CSS文本理解为CSS的规则。所以在可以使用空白符的地方，多数的地方它都会支持一个CDO或者CDC这样的东西。基本上现代的浏览器是可以完全的支持CSS。所以看到CDO、CDC就可以忽略它了。

它可以重复的规则分成三种，ruleset就是我们普通的CSS规则，一个选择器后边跟一堆东西，另外就是 media 标签，media标签在2.1时代其实已经有了，但是在CSS3及更高的版本里面就有了Media Query这个东西，现在的 media 比 CSS2.1定义的要复杂的多。 page 主要用于打印的一些信息，一般来说，浏览器上是不会太用页面信息的。  

我们从 stylesheet 的总体结构就可以看到很多东西。下边是有效信息：   
CSS总体结构   
* @charset   
* @import   
* rules
    * @media  
    * @page   
    * rule     

CSS 的总体结构就是 @charset @import ，后面的是可重复规则，它们可以出现多个，而且对顺序没有要求，@media @page rule。一般我们写的都是 rule , 一般公司会给我们指定跟HTML一致的这样的一个 encoding 的模式，关于 charset 的知识在 JS中讲过。一般我们不需要在CSS里面声明自己的 charset ，另外我们会选择 UTF-8 或者 其他 ASCII兼容的编码方式，而我们在CSS代码里面会通过 encoding 转义的方式去把所有的字符都变成 ASCII字符集里面的内容，因为大部分字符集都兼容 ASCII字符集。 我们需要找到所有的 at-rule ，因为rule在新版本里会有变化，但是它总体上除了at-rule和普通rule，其实已经不会加新的结构了。   

首先找到所有CSS3里面的at-rule，然后再研究一下rule   
CSS：
* at-rules：@charset、@import、@media、@page、@counter-style、@keyframes、@fontface、@support、@namespace （被废弃的有 document、color-profile、font-feature。）   

这些中最重要并且最常用的有 @media、@keyframes、@fontface。  
   
supports基本上不太推荐使用，完全可以用一些工程工具去处理 support，像 page 这种用特定环境的，charset基本上也已经不用了，import我们大多数时候也是不会太去用的。像 namespace只有在极端的情况下，做一个补充去用。counter-style只有在我们写列表的时候而且需要定制这个列表的形状的时候才会去用。 
* rule


## （二）CSS @规则的研究

At-rules   

• @charset ： https://www.w3.org/TR/css-syntax-3/      
charset 在CSS3中重新定义了，主要作用是声明 CSS字符集基本没什么变化。

• @import ：https://www.w3.org/TR/css-cascade-4/    
import就在 css cascade级联标准里面，因为 CSS叫 cascading style sheet 级联样式表，所以它的级联样式表规则就有一个 import 

• @media ：https://www.w3.org/TR/css3-conditional/   
media不在 media query 标准里，它在CSS3的conditional标准里，media的conditional的标准，它又引用了 media query，规定了media后边的一部分的查询规则，media query 不是一个新特性，它是类似于一个预置好的函数，这样的就是一个查询媒体的规范。把查询媒体引入到CSS3中的是这个 https://www.w3.org/TR/css3-conditional/ 

• @page ： https://www.w3.org/TR/css-page-3/      
page是有一份单独的CSS3标准去讲述它，就是css-page-3，它主要是在我们打印的时候相关，理论上叫做分页媒体。事实上主要的分页媒体就是打印机。一般来说我们的浏览器是不分页的。

• @counter-style ：https://www.w3.org/TR/css-counter-styles-3    
counter-style是我们平时写列表的时候会有一个counter，列表前边的小黑点或者小数字

• @keyframes ：https://www.w3.org/TR/css-animations-1/    
keyframes是定义动画用的

• @fontface ：https://www.w3.org/TR/css-fonts-3/   
fontface是著名的我们用的 web font 的功能，fontface其实它可以用来定义一切字体。由此衍生 iconfont。

• @supports ：https://www.w3.org/TR/css3-conditional/    
supports 其实同样来自conditional的标准，它用来检查某些 CSS 的功能存不存在，supports本身是属于CSS3的，不推荐使用supports来检查CSS的兼容性。因为可能你检查的属性比supports这个规则还要好。

• @namespace ：https://www.w3.org/TR/css-namespaces-3/   
我们现在的HTML里面除了HTML命名空间，还引入了像 SVG MathML 这样的其他的命名空间的标记的标签。所以这其实是一个完备性的考量。不是一个特别重要的规则。


## （三）CSS规则的结构 

* 选择器   
* 声明   
    * Key
    * Value
```css
div{
    background-color:blue;
}
```

选择页面上所有的div元素，给它设置一下它的背景颜色。从这里可以看出来，CSS规则是分成了选择器部分和声明部分，所以在 toy browser里面使用了一个CSS的parser，它会把CSS规则 parse成 selector部分和 declaration部分。   
声明部分：它的声明是一行一行的，它是一个 K-V组成的一个列表，所以在CSS部分就会分成 选择器、K、V 三个部分。

CSS规则   
* Selector   
    * https://www.w3.org/TR/selectors-3/ （level3正在使用中）
    * https://www.w3.org/TR/selectors-4/ （level4标准制定中） 

* Key 
    * Properties   
    * Variables: https://www.w3.org/TR/css-variables/

key的作用，声明属性，但是随着 CSS Variable 这个标准出现，Key其实也出现了两种，一种是属性，一种是变量，所以 CSS Variable 这个属性又引入了新的 Key 值，是以双减号开头的。

* Value   
    * https://www.w3.org/TR/css-values-4/  

Value其实除了包含我们正常的值，它可能还会有一些函数类型的值。然后不同的属性，它可能要求不同类型的 value 。

level3中： 10.1. Grammar   

产生式的根元素，它是由 selectors_group，selectors_group 它是由 COMMA，就是逗号分隔的 selector 构成的，也就是说我们平时写的 selector 的时候，逗号是优先级最低的，它的结合性是排在最后，每一个selector是由一个simple_selector_sequence组成的，simple_selector_sequence是用 combinator 相连接的，combinator有几种：PLUS加号、GREATER大于号、TILDE波浪线、空格选择器。selector是由combinator连接的simple_selector_sequence，而simple_selector_sequence是由简单选择器构成的，简单选择器有类型选择器（什么都不带的）、universal选择器（星号）、HASH（带#的）、class选择器（带.的）、attrib选择器（方括号[]）、伪类或者伪元素（以单冒号或者双冒号开头的一批选择器）、negation（带NOT的选择器，是以:NOT开头的）。    

rule：   
Selector：select_group
          selector：> < sp> + -
          simple_selector：type（类型）  *  .  #   []   :（伪类）   ::（伪元素）   :not()      
Declaration：key：variables、properties    
             Value：calc、number、length、



## （四）收集标准
https://www.w3.org/TR/

```javascript    

Array.prototype.slice.call(document.querySelector("#container").children).filter(e => e.getAttribute("data-tag").match(/css/)).map(e => ({name:e.children[1].innerText, url:e.children[1].children[0].href}))

// 把父元素的container的children，也就是所有的这些list给它转成一个真正的数组，然后对这个数组进行过滤，把所有带CSS tag的元素过滤出来，这里match(/css/)不能用相等，因为它可能是有多个标签的，接下来我们对它做一个映射，我们根据DOM结构，把它的标题文本和URL取出来，然后我们就能得到DOM的这样一份比较干净的CSS标准的列表。

//然后我们把它做 JSON.stringify
JSON.stringify(Array.prototype.slice.call(document.querySelector("#container").children).filter(e => e.getAttribute("data-tag").match(/css/)).map(e => ({name:e.children[1].innerText, url:e.children[1].children[0].href})))

```


## （五）CSS总论总结
* CSS语法      
* at-rule    
* selector    
* variables     
* value      
* 实验


# 选择器
## 选择器语法
* 简单选择器    
  `星号*`         ： 通用选择器，可以选中任何的元素，相当于没有选择器      
  `div svgla`     ： div 它是这种叫做 type selector 类型选择器，它选择的是我们元素的tagName属性，HTML的命名空间主要有三个，HTML、SVG、MathML。如果要选SVG或者MathML中的元素就必须要用到单竖线，单竖线是我们的命名空间分隔符。在HTML中的分隔符是冒号:  CSS选择器里就是单竖线。namespace需要用到 @nameSpace的 at-rule去声明一下，这两个是配合使用的。    
  `.cls`          ：  以点开头的选择器，会选中一个class，class是可以用空白做分隔符，指定多个class，.class只要匹配其中的一个就可以了。    
  `#id`           ： id选择器可以用#开头选中一个id，这个必须是严格匹配，id里面也可以加减号等。     
  `[attr=value]`  ：    属性选择器，它囊括了class属性选择器和id选择器，attribute 它的完整的语法就是 attr=value，前半部分是name，后半部分是值。这个等号还可以在前面加浪线，表示像class一样。可以支持拿空格分隔的值的序列。如果在前面加单竖线，那么就表示这个属性以这个值开头即可。理论上是用属性选择器代替class选择器和id选择器。
  `:hover`        ： 伪类，是以冒号开头的。主要是一些元素的特殊的状态。多半来自交互。或者说有一些伪类选择器是带函数的伪类选择器。  
  `::before`      ：伪元素选择器，一般都是以双冒号开头，实际上在书写的时候以单冒号开头也可以。伪元素相对来说是选中一些原本不存在的元素，如果你不选，这个地方可能就不存在一个元素，如果选的话，就可能多了一个元素。    

* 复合选择器    
`<简单选择器><简单选择器><简单选择器>`     ：   把简单选择器挨着写，就成了一个复合选择器。它的语义是我们选中的元素必须同时match几个简单选择器，它是一个与的关系。    
`*或者 div 必须写在最前面`    ： 星或者div是必须写在最前面，伪类伪元素是一定要写在最后面。
* 复杂选择器   
`<复合选择器><sp><复合选择器>`     复合选择器用连接符连接就会成为复杂选择器。   
`<复合选择器>">"<复合选择器>`    
`<复合选择器>"~"<复合选择器>`   
`<复合选择器>"+"<复合选择器>`   
`<复合选择器>"||"<复合选择器>`   

复杂选择器是针对一个元素的结构来进行选择的。复合选择器之间用空格分割表示的是子孙选择器，当前元素必须得有空格左边的这样的一个父级结点或者祖先节点。它可以是父级也可以是父级的父级。空格的写法是从 CSS非常古老的版本，从2.1开始就支持的一种写法。这是CSS选择器最早设计出来的一种复合的方式。大于号连接的父子选择器必须是它的直接上级直接父元素。用浪线、用加号连接的，我们可以针对它的邻接关系进行选择，然后是双竖线，双竖线是 Selector Level 4才有的。当我们做表格的时候，做table的时候，这个是表示可以选中某一个列。还可以用逗号连接，构成一个选择器列表。但是一般来说，不会把逗号算进选择器里面。因为逗号相当于是两个选择器。逗号之间是或的关系。




## 选择器的优先级
简单选择器计数 
```css  
   1         2
  #id div.a#id{          
    //……
  }
```
选择器优先级其实是对一个选择器里面包含的所有简单选择器进行计数，我们说的选择器列表，不把它视为一个完整的选择器，因为选择器列表它中间是以逗号分隔开的，这些复杂选择器来进行简单选择器计数的。    

在这个例子里，#id空格div.a#id 这个里面包含了两个 id 选择器一个 div 选择器和一个 class 选择器，这个时候，我们根据选择器的优先级，会把选择器的优先级算出来是 0211，在选择器的标准里，有这样的描述，就是说我们会采用一个 N 进制来表示，所以 0211 可以视为它是一个巨大无比的进制里面的 4 位，所以如果我们取这个 N 作为进位，那么 S 整个的优先级也就是 specificity。      
**specificity 的原理：【记住】**    
s 就等于 0 乘以 N 的 3 次方加上 2 乘以 N 的二次方，加上 1 乘以 N 的一次方再加 1 ，我们只要取一个足够大的 N 算出来，就是选择器的优先级了。比如说我们取一个 100 万，我们采用 10 进制数，比较容易复合大家的职级，最后算出来的优先级就是 2000001000001 ，像 IE 的老版本，因为N取的值不够大，它要节省内存，取了个 255，所以 256 个 class 就相当于一个 id。后来大部分浏览器都选择了 65536，选择 65536之后基本上就再也没有发生过超过额度的事了。 现在浏览器都会采取一个足够大的值，它会选取一个 16 进制上比较完整的数，一般来说都是 256的整次幂，因为 256 正好是一个字节。    

**练习题：**   
请写出下面选择器的优先级    
div#a.b .c[id=x]   
#a:not(#b)     
*.a   
div.a   
  


## 伪类
* 链接/行为    
`:any-link`  能够匹配任何的超链接       
`:link`      匹配还没有访问过的超链接    
`:visited`   已经访问过的超链接    
*:link 加 :visited 等于 :any-link* &nbsp;一旦使用 visited之后，就再也没有办法对这个里面的元素去更改文字颜色之外的属性了。这样设计的原理是：一旦使用了 layout 相关的属性，比如说给 visited 把它的尺寸变得大一点，那么它就会影响排版。这样我们就可以通过 JavaScript API 去获取你这个链接它是不是 visited了。一旦你获取了它是否是 visited ，南无此时你就会知道用户访问过哪些网站了。这对于浏览器的安全性来说是一个致命的打击。早期的浏览器给 对visited 在伪类的规则里允许你设置透明度，虽然说你获取不到透明度的属性，但是透明度在渲染上非常的费时间，所以说黑客就加了很多的带透明度的visited的标签，他通过你计算的快慢然后就可以找出来你的元素最后到底是不是访问过了。（不要以为这种纯表现的就和安全没有关系，这个是一个综合的考量，CSS也能造成安全漏洞）    
`:hover`   用户鼠标挪上去了之后的状态    
`:active`  表示激活状态     
`:focus`   焦点在的状况     
`:target`  链接到当前的目标  【是用于给作为锚点 a 标签使用的，当前的 HASH指向了当前的 a 标签所表示的链接的话，那么它就会激活 target 伪类】
* 树形结构相关的伪类    
`:empty` 表示这个元素是否有子元素  
`:nth-child()`  表示这个元素是父元素的第几个 child。nth-child是一个非常复杂的伪类。它里边要支持一种语法，比如可以在括号里写 even odd 就是奇偶，也可以写 4N+1 3N-1 ，那它分别就会匹配到一种整数的这样的形态。【越是语法复杂越是简单来用，在里面不要写过于复杂的表达式，只用它来处理一下奇偶、逢三个多一个、逢四个多一个等这样的情况】     
`:nth-last-child()`  从后往前数。   
empty和nth-last-child 这两个选择器是通过强行写代码的状态来实现的。因为你最开始是不知道它是不是有子元素和最后一个元素。   
`:first-child :last-child :only-child` first-child其实是不破坏我们的CSS插入compute的时机的。last-child 和 only-child 是破坏了我们的时机。这两个和empty差不多，它破坏的并不严重。它只要在我们当前标签之后，再等一个token，我们就可以知道它是不是 last-child以及是不是 only-child，这种破坏回溯原则的这种特性，要么是浏览器实现不好，要么就是本身它的性能会不太好。尽量使用不破坏 CSS 回溯原则的，不要给 compute CSS添乱。  
* 逻辑型    
`:not伪类` 主流浏览器只支持它在里面写简单选择器的序列，也就是复合选择器。是没有办法写一些带空格的这种大于号的这种结构的、更没有办法在里面写带逗号的这种结构。只针对一个元素进行 not 判断这个对于浏览器来说实现起来是非常方便的。
`:where :has`  

注意：不建议把伪类选择器和前面的各种选择器写得非常复杂。因为在大部分情况下 HTML代码是归我们控制的。所以说我们很多时候是可以通过多加点 class 去解决的。选择器写的过于复杂，某种程度上来说HTML结构写的不合理。


## 伪元素    
`::before`   在元素的内容前 插入一个伪元素    
`::after`    在元素的内容后 插入一个伪元素    
一旦应用了before和after的属性，declaration 里面就可以写一个 content 的属性。不正常的元素是没有办法去写它的 content ，before 和 after 只要你写了 content属性，它就像一个真正的 DOM元素一样，可以去生成盒。来参与后续的排版和渲染。也可以指定 border background 这样的东西.可以理解为伪元素就是通过选择器向界面上添加了一个不存在的元素。 
   
而 first-line 和 first-letter机制有些不一样，这两个原本就已经存在了 content，first-line和first-letter，是选中第一行和选中第一个字母。  
`::first-line` 选中第一行，是已经完成排版之后的一个结果。   
`::first-letter`  选中第一个字母，它的特点并不是添加一个不存在的元素，而是它用一个不存在的元素把一部分的文本给它括了起来，让我们可以对它进行一些处理。    

所以说伪元素是有两种机制：第一种是无中生有；第二种就是把它括起来，把一些有特定逻辑意义的文字给它括起来。    

伪元素   
```html
<div>
<::before/>
content content content content  
content content content content   
content content content content
content content content content
content content content content
content content content content
<::after/>
<div>
```

带有before伪元素的这样的选择器给它实际选中的元素，给它的内容的前面增加了一个元素，我们只需要通过它的 content 属性为它添加文本内容即可。所以before和after 这两个伪元素，我们可以任意的指定它的 display，不管是显示成 inline 还是 inline-block 还是 block 都是没有问题的。所以说相对来说比较自由，我们在实现一些组件的时候，也会常常使用这种不污染的 DOM 树，但是却能实际创造视觉效果的方式来给页面添加一些修饰性这样的内容。我们的伪元素，其实 before和after都是相对来说比较好理解的。但是在真正应用起来，可以根据 before和after这种添加元素的特性，可以有很多用法。     

```html
<div>
<::first-letter/>c</::first-letter>
content content content content  
content content content content   
content content content content
content content content content
content content content content
content content content content
<::after/>
<div>
```   
::first-letter相当于我们有一个元素，把内容里面的第一个字母给它括了起来，这个 first-letter 是可以任意添加各种不同的属性。
应用：例如报纸上那种第一个字非常大，这种情况就可以用 ::first-letter 选择器给它实现出来。用 first-letter 选择器实现，它会比用 JS去实现更加的稳定。代码也优雅一些。   

::first-line 实际上是针对排版之后的 line ，其实跟我们源码里面的 first-line 没有任何的关系。所以说，假如我们的浏览器提供的渲染的宽度不同，有可能 first-line 在两个环境里面它最终控住的元素数量是不一样多的。所以我们是需要用 first-line 选择器的时候，我们需要根据需求的情况，千万不要想当然的去使用 first-line 。实际上，我们需要保持 first-line 选择器的语义正确。    
first-line 和 first-letter 它在选择器的属性上都是有要求的。     

可用属性    
`first-line` （first-line只支持下面的属性）   
* font系列   
* color系列   
* background系列   
* word-spacing   
* letter-spacing    
* text-decoration    
* text-transform    
* line-height 

`first-letter`  （first-letter 可支持下面的属性）
* font系列   
* color系列
* background系列
* word-spacing 
* letter-spacing
* text-decoration   
* text-transform   
* line-height   
* float                 （++）
* vertical-align        （++）
* 盒模型系列：margin ，padding ，border  （++）   

**思考题：**     
为什么 first-letter 可以设置 display:block、float 之类的属性的，而 first-line 不行呢？   

**作业：**
编写一个match函数。接受两个参数，第一个参数是一个选择器字符串性质，第二个是一个HTML元素，这个元素可以认为它一定会在一个DOM树里面，然后我们通过选择器和 DOM 元素来判断当前的元素是能够匹配到我们的选择器。不要使用任何内置的浏览器的函数，仅仅通过DOM的parent和children这些API来判断一个元素是否能够跟一个选择器相匹配。   

```javascript
function match(selector, element){
  return true;
}

match("div #id.class", document.getElementById("id"));




```









