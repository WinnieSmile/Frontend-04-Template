<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2020-10-23 00:05:49
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





## （四）收集标准







## （五）CSS总论总结











# 选择器
## 选择器语法









## 选择器的优先级











## 伪类









## 伪元素


