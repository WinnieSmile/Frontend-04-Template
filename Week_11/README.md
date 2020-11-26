<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2020-11-26 23:45:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_11\README.md
-->
# （一）重学HTML  
HTML的定义：XML 与 SGML   
HTML是比较特别的语言，它有一定的继承关系，它的主要的源流来自于 XML 和 SGML，在某种意义上来说是HTML的一个超集，但是发展到 HTML5 以后的时代，HTML变成了一个接受 XML和SGML的一定灵感的这样的独立的语言；SGML的历史比较悠久，它大概是在上世纪60年代末产生的，最早由IBM在使用的一个数据的描述语言，它是一个非常庞大非常复杂的这样的一个数据描述的系统，在更往后，作为SGML的一个比较流行的子集 XML 开始，加入了一些其它的规定和改良，而HTML出来的年代基本上是完全使用了SGML这样的一个子集，这样的一种定义的方式，所以说它有符合 SGML 定义的DTD，到后期 W3C 对它做了 XML 化的尝试，所以说就有了 XHYML这样的一个版本，在更晚期 XHTML2 出现了，但是因为它过于严苛的规定，导致社区不能接受，最终 XHTML2 遭到了流产，这个语言没有真正的大规模的被使用起来。后来随着 HTML5 逐渐的再次重新定义了 HTML 和这两个语言的关系然后才得到了我们今天的 HTML。    

## 一、SGML   
**DTD与XML namespace**       
使用 Frameset，不使用 Frameset 等等一系列的这样的一个DTD，下面是老版本里边最新的 XHTML1 的 DTD，这个DTD里边包含的信息比较全，另外就是 XML 的 namespace ，namespace 是在1999年也是 XHTML的一个 namespace。     
HTML标准里边有一句话，任何人不得在实现浏览器的时候去访问这个DTD，因为全世界这么多网页，如果每个人都从 W3C的网站上去访问一下 DTD，W3C的网站基本就挂了。所以它虽然是个url，但是它禁止访问。    
http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd    
http://www.w3.org/1999/xhtml           
DTD是SGML 规定的定义它的子集的这样的一种文档的格式，HTML最早设计出来的是一个SGML的子集，所以说它有这个 DTD。 XHTML1.0 对应的应该是 HTML的4.2版本左右，所以说是HTML4的一个严格的模式。     
（1）DTD     
http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd   DTD文件解析
```html
<!--================ Character mnemonic entities =========================-->      
三个实体定义文件的这个演示  【重要】 
实体定义就是 & 符后边跟一系列的字，最后有一个分号; 这样的一种定义方式。 
<!--================== Imported Names ====================================-->    
从别处弄来的名字    
<!--=================== Generic Attributes ===============================-->
通用的属性   
<!--=================== Text Elements ====================================-->
文本元素    
<!--================ Document Structure ==================================-->
整个文档结构
<!--================ Document Head =======================================-->
文档头
<!--=================== Document Body ====================================-->
文档body
<!--=================== Paragraphs =======================================-->
片段
<!--=================== Headings =========================================-->
标题
<!--=================== Lists ============================================-->
列表
<!--=================== Address ==========================================-->
地址
<!--=================== Horizontal Rule ==================================-->
分割线
<!--=================== Preformatted Text ================================-->
预先定义好格式的文本
<!--=================== Block-like Quotes ================================-->
块状的注释
<!--================== The Anchor Element ================================-->
Anchor   
<!--===================== Inline Elements ================================-->
inline的元素（行内元素）
<!--==================== Object ======================================-->
对象
<!--=================== Images ===========================================-->
图片

```
**DTD里边的重要内容：**   
* 空格： `&nbsp;`;   
实现多个空格： white-space 属性 

* 符号：（常见的希腊字母）   
Omega、alpha、beta、gamma、lambda(函数式)  
在HTML中打出 lambda，则是 `&Lambda;`    

* 转义：    
quot 双引号  （使用 `&quot;` 就可以把它放到双引号括起来的属性的值里边）    
amp  &符    （在实际代码里写&符会被认为是一个转义的标志，用 `&amp;` 才不会报错）   
lt   小于号  （lt是一个标签开始的符号，在html中同时被作为尖括号使用，用 `&lt;`）    
gt   大于号    
apos    

（2）XML namespace   
URL对于 namespace 来说是一种可有可无的这样的一种设施。namespace每个url都代表了一个唯一的这样的一种语言，在HTML里边除了HTML的namespace，XHTML的namespace，它还有两个 namespace，一个是 MathML，一个是SVG，这三个都是最常用的namespace。       
http://www.w3.org/1999/xhtml  

## 二、HTML标签语义   
以这个页面为例写出语义化标签
http://static001.geekbang.org/static/time/quote/World_Wide_Web-Wikipedia.html


## 三、HTML语法 【重要】
合法元素 （节点）
```html 

Element(标签节点): <tagname> ……</tagname>
Text(文本节点): text
Comment(注释节点): <!-- comments -->
DocumentType: <!Doctype html>
ProcessingInstruction(预处理的语法): <?a 1?>
CDATA(CDATA节点，产生的是文本节点，是文本节点的另一种语法的表达):<![CDATA[]]>

```
字符引用 
```html  
&#161;     <!--  代表一个它的 ASCII字符 161 的这样的一个字符 --> 
&amp;      <!--  &符     -->
&lt;       <!--  小于号   -->
&quot;     <!--  双引号   -->
```
# （二）浏览器API
DOM、BOM(浏览器对象模型)
## DOM API
DOM API分成了4个部分：   
traversal系列的API：可以去访问DOM树的所有的节点的这样的一个自动的迭代工具。【不推荐使用】   
节点类API：重要，最多使用  
事件API：所有的交互，想用JS跟HTML元素做交互，都需要通过事件   
Range API：比节点API能更精确的操纵DOM树，它的性能也是更好的，但是它应用性很差。    

所有DOM树上能挂着的东西，都是统一继承自一个叫做 Node 的类，所有Node是所有这些节点的基类。挂在DOM树上的一定叫做 Node，但不一定是 Element（Node里面的节点80%、90%都是属于 Element）。Element是元素，有一对起始和结束标签。

除了Element可以作为节点的Node，还有Document节点根节点。也就是Document对象，其实它也继承了 Node。  

还有一类叫做 CharacterData（文本节点注释节点):ProcessingInstruction、CDATA     
DocumentFragment 文档片段：没有办法挂到任何一棵DOM树上，但是它也继承了Node节点，它也可以执行挂在DOM树上的操作，只不过是在挂的时候会把自己的所有的子节点给它塞到上面。（经常与 Range API搭配使用）   

DOCTYPE：也是一个节点，继承了 Node，只要 HTML 的语法里面有的，其实它都有一个对应的这样的 API 去操纵它。 
  
Node下面的这个元素子节点叫 Element，它下边其实还有 HTMLElement。  

HTML里面至少有三个比较常用的namespace，分别是 HTML、SVG 和 MathML。它们都会产生一个 Element 的这样的一个子类。HTML下面的这些子类就是：a标签等。通常子类的命名都是一个标签名后面呢加个Element，除a标签外（HTMLAnchorElement）。svg里面的a标签它叫 SVGAElement。   

归纳：
* Element：元素型节点，跟标签相对应
    * HTMLElement   
        * HTMLAnchorElement
        * HTMLAppletElement
        * HTMLAreaElement
        * HTMLAudioElement
        * HTMLBaseElement
        * HTMLBodyElement
    * SVGElement
        * SVGAElement
        * SVGAltGlyphElement
* Document：文档根节点
* CharacterData 字符数据
    * Text：文本节点：CDATASection：CDATA节点
    * Comment：注释
    * ProcessingInstruction：处理信息
* DocumentFragment：文档片段
* DocumentType：文档类型

1、《操作》  
**导航类操作**      
说明：能允许我们在DOM树上自由的移动，我们可以根据节点之间的父关系、邻接关系找到一些我们想要的关键节点。 
``` 
节点导航（node节点）                   元素导航（Element节点：只找元素，文本节点会被忽略）

parentNode      找到父节点            parentElement         
chileNodes      找到子节点            children
firstChild      找到第一个节点         firstElementChild
lastChild       找到最后一个节点       lastElementChild
nextSibling     下一个邻居节点         nextElementSibling
previousSibling 上一个邻居节点         previousElementSibling
```
**修改操作**
```
appendChild
insertBefore
removeChild
replaceChild    
```
appendChild 和 insertBefore 它们两个是一组，最小化原则，假如我们有10个子节点，insertBefore 可以插10个位置，appendChild 可以插第11个位置，10个结点一共形成了11个空隙，所以说这两个API足够我们把节点插入到任何一个位置，所以说insertAfter是可以用 insertBefore 和 appendChild它们两个去实现的。所以就没有 insertAfter 这个API。    

移除一个元素，我们只得到一个元素的引用的时候，我们只能去找它的 parent 才可以把它移除的，这个移除的操作必须在它的parent上进行，我们没有办法把一个元素自身 remove掉。然后就是 replaceChild，replaceChild相当于一次 remove 加上一次 insert，它的好处是也许可以节省 DOM操作，从API设计的角度来讲，它应该是一次性的替换掉。replaceChild是一个多余的设计。   

**高级操作**   
* compareDocumentPosition 是一个用于比较两个节点中关系的函数，可以得到前后的关系。
* contains 检查一个节点是否包含另一个节点的函数。
* isEqualNode 检查两个节点是否完全相同。（只要DOM树结构相同，这两个节点就相同了。用来检查节点的树形结构，不需要把它进行序列化）
* isSameNode 检查两个节点是否是同一个节点，实际上在Javascript 中可以用"==="。
* cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。（场景应用：做一些HTML的节点、HTML的模板）


2、《事件API》


