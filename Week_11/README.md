<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2020-12-08 22:11:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_11\README.md
-->
webGL 图形学：背景图渲染。加法线、简单3D建模。    
组件化、工具链(封装)、持续化和集成。    
学习node的语法，简单能写出node     
节点API、浏览器API 


# 重学HTML  
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
# 浏览器API
DOM、BOM(浏览器对象模型)
## （一）DOM API
DOM API分成了4个部分：   
**traversal系列的API**：可以去访问DOM树的所有的节点的这样的一个自动的迭代工具。【不推荐使用】   
**节点类API**：重要，最多使用  
**事件API**：所有的交互，想用JS跟HTML元素做交互，都需要通过事件   
**Range API**：比节点API能更精确的操纵DOM树，它的性能也是更好的，但是它应用性很差。    

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

## 一、节点类API  【节点操作】  
**1、导航类操作**      
说明：能允许我们在DOM树上自由的移动，我们可以根据节点之间的父关系、邻接关系找到一些我们想要的关键节点。 
``` 
节点导航（node节点）                   元素导航（Element节点：只找元素，文本节点会被忽略）

parentNode      找到父节点             parentElement         
chileNodes      找到子节点             children
firstChild      找到第一个节点         firstElementChild
lastChild       找到最后一个节点       lastElementChild
nextSibling     下一个邻居节点         nextElementSibling
previousSibling 上一个邻居节点         previousElementSibling
```
**2、修改操作**
```
appendChild
insertBefore
removeChild       移除一个元素
replaceChild    
```
**appendChild 和 insertBefore**： 它们两个是一组，最小化原则，假如我们有10个子节点，insertBefore 可以插10个位置，appendChild 可以插第11个位置，10个结点一共形成了11个空隙，所以说这两个API足够我们把节点插入到任何一个位置，所以说insertAfter是可以用 insertBefore 和 appendChild它们两个去实现的。所以就没有 insertAfter 这个API。    

**removeChild**： 移除一个元素，我们只得到一个元素的引用的时候，我们只能去找它的 parent 才可以把它移除的，这个移除的操作必须在它的parent上进行，我们没有办法把一个元素自身 remove掉。  

**replaceChild**：replaceChild相当于一次 remove 加上一次 insert，它的好处是也许可以节省 DOM操作，从API设计的角度来讲，它应该是一次性的替换掉。replaceChild是一个多余的设计。  【讨论API设计和浏览器实现上的区别】 

**3、高级操作**   
* compareDocumentPosition 是一个用于比较两个节点中关系的函数，可以得到前后的关系。
* contains 检查一个节点是否包含另一个节点的函数。
* isEqualNode 检查两个节点是否完全相同。（只要DOM树结构相同，这两个节点就相同了。用来检查节点的树形结构，不需要把它进行序列化）
* isSameNode 检查两个节点是否是同一个节点，实际上在JavaScript 中可以用"==="。
* cloneNode 复制一个节点，如果传入参数 true，则会连同子元素做深拷贝。（场景应用：做一些HTML的节点、HTML的模板）


## 二、事件API     
事件API里边想要理解这个事件，我们必须要理解事件的对象模型。   
**1、addEventListener  API**     
英文版： https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener     
中文版：https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener    
在所有的节点上都可以使用 addEventListener API   
语法：（有三个参数）
```javascript
target.addEventListener(type, listener [, options]);
target.addEventListener(type, listener [, useCapture]);
target.addEventListener(type, listener [, useCapture, wantsUntrusted  ]); // Gecko/Mozilla only
```
第一个参数 type：事件的类型，就是比如说click事件、keyboard、keydown、keyup、mousedown、mouseup这些都是有对应的事件的。   
第二个参数 listener  
第三个参数有两种形态：   
* 第一种可以是true或者false，这种时候它会改变事件的模式，它是捕获模式还是冒泡模式。如果是options，就允许你去传入更多的信息：包含三个部分：
    * capture：在option里写capture来控制它是冒泡模式还是捕获模式。capture是最关键的一个机制  

    所谓事件的冒泡和捕获跟监听是没有关系的，它在任何一次事件触发的过程中两个过程都会发生，不论你是否监听这个事件。

    冒泡捕获的过程就是浏览器自己去处理事件的这样的一套机制，不管你监不监听它的过程都是有的。任何一个事件都有一个先捕获再冒泡的过程。   

    先捕获再冒泡：我们手里的鼠标它并不能够提供我们到底点在哪个元素上这样的信息，真正点在哪个元素上我们是要通过计算，通过浏览器把它计算出来的，所以一定有一个过程就是捕获的过程，从外到内一层一层的去计算到底这个事件发生在哪个元素上这样的过程，这个过程就叫做捕获。冒泡则是我们已经算出来点到了哪个元素，层层的向外去触发，然后让这个元素去响应这个事件的过程，所以说冒泡的过程其实更符合人类的直觉。   

    **如果不传第三个参数的情况下，默认我们得到的应该是一个冒泡的事件的监听。**

    * once：表示这个事件是不是只响应一次
    * passive：表示这个事件是否是一个不会产生副作用的一个事件，就是你单纯的想要监听这个事件。       
    
    当我们用onScroll这样的高频次触发事件的时候，我们传入passive往往可以达到提升性能的这样的一个效果；但是如果想在这个事件发生的时候阻止这个事件的某些默认行为的话，那么一定要把这个passive写成true。移动端浏览器默认把passive设置成了false，所以提升性能。所以说如果在移动端去监听事件想要去阻止，如果说想阻止屏幕的滑动的这样的效果的时候，一定要再加上第三个参数，而且用options型的第三个参数，把passive置为false，那么它就可以阻止这个事件了。


**Event：冒泡与捕获 【实例】**    
互相嵌套的元素 a b； b元素在a元素的里层
```html
<div id="a" style="width: 100%; height: 300px; background:lightblue;">
    <div id="b" style="width: 100%; height: 200px; background: pink;">
    
    </div>
</div>
```
将 a 和 b 元素的变量取出来，存成 a 和 b两个变量
```javascript
var a = document.getElementById("a");
var b = document.getElementById("b");
```
① 给 a 和 b 添加事件监听 （没有加第三个参数，这里默认是冒泡的事件。）
```javascript
a.addEventListener("click", function(){
    console.log("a")
})
b.addEventListener("click", function(){
    console.log("b")
})
```
执行结果： b a 。    
触发顺序：因为b在里层，所以说b会优先触发    
② 给 a 和 b 添加捕获事件
```javascript
b.addEventListener("click", function(){
    console.log("b1")
}, true)
a.addEventListener("click", function(){
    console.log("a1")
}, true)
```
执行结果： a1 b b1 a   
触发顺序：先触发了 a 的捕获事件，然后在 b 上的两个事件依次触发，最后事件又回到冒泡的 a 上。    
③ 给 b 上添加一个不论是冒泡还是捕获事件
```javascript
b.addEventListener("click", function(){
    console.log("b3")
})
```
执行结果：a1 b b1 b3 a     
触发顺序：后加的会加到后面去，先加的会先触发，这就是整个的元素的冒泡和捕获的这样的一个关系
## 三、 iterator迭代器
没有什么实际的用途，这个API设计风格过于老旧，没有跟现代 JavaScript 相结合，已经是一个被淘汰的状态
## 四、Range API
DOM树上有了节点API，我们可以对它进行任意的处置，不管是增删改查去遍历访问，这棵DOM树上面的所有的节点都可以很好的去操作，但是我们有些情况下是要操作半个节点或者是操纵批量节点，此时就需要 Range API。Range API是比节点类的node API更强大更细致，但是也更难用更难理解的API，它可以说是对DOM树的操作的一个万能的API。  
**1、Range API**    
HTML的文档流里面有起始点和一个终止点的这样的一段范围，range 是不能够跳的，所以说它可能是多个范围，但是每一个 range 它一定是一个连续的这样的一个范围。它的起点和终点，只要说起点在DOM树里的位置是先于终点就可以，它不需要管这个层级的关系。比如说start它可能位于前一个节点的三层的子节点里面，而后一个节点它位于一个后节点后边，起止点都是由一个element和一个偏移值来决定的，对于element来说，它的偏移值就是children，对于text node来说，偏移值就是文字的个数，range不一定是包含了一个完整的节点，它可以包含半个节点，它不需要去顾忌节点和节点之间的边界，所以说range选择的范围非常的灵活，在DOM树上可以任意选择一段。   

**2、range的selection创建方法：【重要】**    
* var range = new Range()  
* range.setStart(element, 9)
* range.setEnd(element, 4)
* var range = document.getSelection().getRangeAt();  

除了手工的指定起止点的这种方法，它还有一个获得的方式就是从selection来创建 Range。selection就是，拿鼠标往屏幕上一圈，就可以圈中一块地方，它还会有一个高光；range就是当有selection的时候，getSelection、getRangeAt(0)。现在的selection一般都是只支持一个Range，所以说我们使用getRangeAt(0)就可以了，然后它就可以选中一个Range（范围）。这样创建Range的方法就有了。   

**3、Range API 便捷方式【重要】**   
* range.setStartBefore  把起点设置到某个节点之前
* range.setEndBefore    把终止点设置到某个节点之前
* range.setStartAfter
* range.setEndAfter
* range.selectNode      选中某个元素
* range.selectNodeContents   选中一个元素的所有的内容

由于有时候不需要非常精确的数 offset，尤其是DOM树里面它的start end这些值，它有可能有一些空白的文本节点，因为我们在写HTML的时候，有时候它会缩进、换行等格式上的需求，所以说它会产生大量的空白节点，有时候为了这些空白节点压缩不压缩，此时range就容易数不准，此时就可以使用 setStartBefore、setEndBefore这些方法。  

**4、创建range之后，最主要的两个操作** 
* var fragment = range.extractContents()    

把range里面的内容取出来，range.extractContents()这个操作等于我们把这个range里面选取的内容从DOM树上完全的摘下来。   
* range.insertNode(document.createTextNode('aaaa'))       
`insertNode` 我们在range的位置去插入一个新的节点，这两个API基本上就完成了删和加这两个操作。    

注意：extractContents 出来的是fragment对象，fragment它也是node的一个子类。fragment它就能够去容纳一些元素，它在append的时候，它自己不会被append到DOM树上，但是它会把它所有的子节点代替它自己放上去，这个特性非常利于我们做一些DOM上的这种精细操作。fragment也是可以去执行DOM上面的一些API和方法的。比如说 querySelector，理论上也可以 addEventListener（一般不这样用） 

**5、range的基本的使用案例**      
```html
<div id="a">123<span style="background-color: pink;">456789</span>0123456789</div>
```

（1）div a，a 里边放了123，中间插了一个span，后面又插了一个0123456789，先把childNodes设到0，也就是123，然后把它设到3的位置，第二个就是把它childNode[2]的3的位置。
```javascript
let range = new Range();
range.setStart(document.getElementById("a").childNodes[0], 3);
range.setEnd(document.getElementById("a").childNodes[2], 3);
```
执行 `range.extractContents();`  结果是 

（2）把span标签里边的内容移除掉，但是保留span标签。   
移除的是 `456789</span>012` ，span标签还在，它的截止标签</span>会被创建一个新的。 
```javascript
let range = new Range();
range.setStart(document.getElementById("a").childNodes[1], 0);
range.setEnd(document.getElementById("a").childNodes[2], 3);
```   
执行 `range.extractContents();`  此时效果是一样的，但是DOM树里边（控制台查看Elements）的结果是不一样的，这个时候它的span标签还在，只不过是一个空标签，只不过是看不见的。     

（3）Range还可以移除半个标签，比如说我们在456的这个6后边去移除，我们给他设到 childNodes[1]，因为它有一个文本节点，所以说那么我们想在文本节点里面去选，所以要再加一层childNodes[0]，然后我们这个地方给一个3，让它从3开始，把它后边的都给它截掉。即把 `789</span>01234` 它是可以去选中半个标签的，这个半个标签它会被自动补上一个结束标签，不会真正出现半个标签，Range就会在这个范围把它截断。
```javascript
let range = new Range();
range.setStart(document.getElementById("a").childNodes[1].childNodes[0], 3);
range.setEnd(document.getElementById("a").childNodes[2], 3);
```   
执行 `range.extractContents();`  结果是：

**6、实例：用range和fragment去操作元素 【Range API的应用】**      
问题：把一个元素所有的子元素逆序。即 12345 变成 54321。

用各种不同层级的API都可以把它实现。用node节点操作，需要操作4次，进行4次插入操作。

* **考点一：** 你是否知道 DOM的collection，它是一个living collection。一操作取出来的 childNodes，它的取出来的值，这个集合会跟着变化。     
* **考点二：** 你知不知道这个元素的这些子元素，它在insert的时候是不需要先把它从原来的位置挪掉的，因为DOM树的性质，你进行insert操作的时候，如果它已经在DOM树上，或者是在另一棵DOM树上这都无所谓，它一定会把它先remove下来，然后再把它append到新的树上。隐藏点：使用Range API进行高效的DOM操作，最终我们可以完成一个完美的答案。    

**方法一：**    
知识储备：不知道DOM API性质，也不知道DOM树有自动remove的情况【基本的操作 】
```html
<div id="a">
    <span>1</span>
    <p>2</p>
    <a>3</a>
    <div>4</div>
</div>
```
```javascript
let element = document.getElementById("a");

function reverseChildren(element){
    let children = Array.prototype.slice.call(element.childNodes);

    for(let child of children){
        element.removeChild(child);
    }
    // element.innerHTML = "";

    children.reverse();

    for(let child of children){
        element.appendChild(child);
    }
}

reverseChildren(element);
```
分析：   
假设有一个元素a是外面的容器，里面有4个子节点，那么reverseChildren这个函数，它就会先把这个element取出来，然后去调用 reverseChildren，我们是这样设计接口的。在 reverseChildren 里边，如果我是不知道DOM API性质的，此时实现方式是： 【不需要知道DOM的知识 ，只需要知道 removeChild 和appendChild 这两个API       

我们通过 Array.prototype.slice这个方法把它的 childNodes变成一个普通的数组（普通数组取出来之后，肯定不会再随着 insert remove这些操作来改变自己），Array肯定不是一个living collection。假设我们也不知道DOM树有自动remove的情况，此时我们需要给element挨个的去remove，最后是 element.innerHTML，让它等于空来替代remove操作。此时利用数组的reverse方法（数组recerse，此时element的children其实并没有跟着变化），接下来，挨个再把children里面的这些子元素挨个appendChild上去。    
    
评价：算法时间复杂度没变，始终是O(n)，但是这样的写法比较冗余。    

**方法二：**   
储备知识：了解DOM API 性质的，知道节点API，可以操作节点。 
```html
<div id="a">
    <span>1</span>
    <p>2</p>
    <p>3</p>
    <div>4</div>
</div>
```
```javascript
let element = document.getElementById("a");

function reverseChildren(element){
    var l = element.childNodes.length;
    while(l-- > 0){
        element.appendChild(element.childNodes[l])
    }
}

reverseChildren(element);
```
分析：   
直接让它等于element的childNodes的length，首先来一个长度，把这个长度记下来，这个时候childNodes它是一个living collection，从后往前循环，把最后一个元素挪掉，它是不会影响前面的元素的，这样我们就可以直接在living collection 上操作了，不用再开一个数组，做法是 l等于element.childNodes.length，然后while l 自减，第一次这个l就会变成 childNodes.length - 1，这正是最后一个元素的序号，然后我们从后往前依次把这个child 给它 append 到这个元素上，等循环到最前面，正好把前面的所有的元素都已经挪到后边去了，这样我们就完成了 reverseChildren 的操作。     
 
评价：reverseChildren代码非常简洁，并且DOM的操作的数量是要比上一种方法要少，因为我们没有remove的操作。【正常的解法】   

**方法三：【最优】**     
使用Range API
```html
<div id="a">
    <span>1</span>
    <p>2</p>
    <a>3</a>
    <div>4</div>
</div>
```
```javascript
let element = document.getElementById("a");

function reverseChildren(element){
    let range = new Range();   //创建一个新的Range
    range.selectNodeContents(element);  //选中node的contents

    let fragment = range.extractContents();
    var l = fragment.childNodes.length;
    while(l-- >0){
        fragment.appendChild(fragment.childNodes[l])
    }
    element.appendChild(fragment);
}

reverseChildren(element);
```
分析：   
为了把元素里边的所有内容翻转过来，理论上最少需要两次DOM操作，第一次是把所有的节点拿下来，第二次是我们把这个节点全都翻转好最后把它放上去，所以说我们需要对element进行两次操作。   

用node的document的节点API，我们需要做至少三次的这样的一个插入，因为是DOM树的节点操作，所以每次它要产生重排，所以这个对它的性能影响是非常糟糕的，使用Range API可以给它缩减到两次，最多发生两次重排。
    
步骤：    
首先创建一个新的Range，然后去选中node的contents，然后把它extract出来，此时它会创建一个fragment，里边就是span p a。然后对fragment做appendChild，就是前面的操作，因为fragment是不需要发生重排的一个操作，所以说它的性能是比较高的，做完了之后给它做一个`appendChild(fragment)`，此时就会给它append上去了。  

代码执行：运行代码，在浏览器Sources下的 `let range = new Range(); `处打断点，来单步执行一下：       
第一步 selectNodeContents这个时候，此时的 a 元素的所有子元素内容都已经被选中了，这个时候一执行 extract 的话，div里面已经空了，然后对它进行插入操作，因为fragment已经离开了 document，所以说此时对fragment做appendChild操作的时候，对真实的DOM树没有任何影响，完全是一种自行计算的这样一个过程，最后appendChild一下子 4321就出来了，所以它只进行了一次重排，整个过程只进行了两次重排。

总结：如果以后对DOM树有高性能的操作的要求，比如说写框架，里面会用到 fragment和range，range负责在DOM树上选中，并且把它摘下来，fragment可以批量的把它append上去，这两个是非常强大的DOM树的能力。掌握了Range API就是对DOM的最高水准了，能够灵活的运用fragement 和Range API，想实现任何对DOM树的操作都是没有问题的。

# （二）CSSOM   
DOM API约等于它是HTML语言的一个对象化，DOM API基本上跟HTML的能力是非常的对等的，比如说HTML中有几种节点类型，DOM树里边就有对应的class，就有对应 element 的子类、或者是node的子类。所以说DOM是对HTML所描述的文档的一个抽象。    
对CSS文档的一个抽象，就是CSSOM。    

## 一、CSSOM基础API
CSSOM严格上说，它也是需要从 DOM API去进行访问的，因为CSS代码就是嵌在HTML的代码里边的，所以说 CSS 的一切的API都需要通过 document.styleSheets 这个属性去访问。    
如何获取 styleSheets 这个属性    

**1、document.styleSheets**       
创建使用CSS有两种用法
* 第一种：使用style标签      
直接在内容里边写CSS 
* 第二种：使用link标签    
在href属性的url里面      
 
如果想要改style标签里边的styleSheets，就直接改它的innerHTML就可以了，如果link标签创建的话就不好改了，因为href不一定是 data uri，有可能是 http或者其他协议，是改变不了它里边的内容的。但是在CSSOM里边是可以访问到它的。        

**实例：**  
```css
<style title="Hello">
a::before{
    color: red;
    content: "Hello";
}
</style>
<link rel="stylesheet" title="x" href="data:text/css, p%7Bcolor:blue%70">
<a>world</a>
```

在浏览器中运行 Hello world， Hello是是一个伪元素，world是一个文本。   
执行 document.styleSheets。    
不是通过它的href去访问的，而是通过它里边的rules去访问的。    

**2、styleSheets的子类**    
```javascript
document.styleSheets[0].cssRules
document.styleSheets[0].insertRule("p { color:pink; }",0)
document.styleSheets[0].removeRules(0)
```   
styleSheets里边有CSSRules（当做一个类似数组的collection去取出来），在一个样式表里边styleSheets就代表一个样式表，它对应着一个style标签，或者是一个link标签，它里面有若干条rule。是可以通过 insertRule和removeRule去控制它一个样式表里有哪些的规则。    

insertRule：传入一段CSS代码，后面是一个位置；它插入的也不是个rule对象，它是一个字符串。       
insertRule和removeRule给一个对应的位置，就可以加入新的CSS规则进去了。    
rule分为at-rule和普通rule。普通rule叫CSSStyleRule，at-rule跟前边CSS的at-rule的语法是一一对应的。   

CSSOM基本对应的就是CSS语法，CSS语法里有什么，CSSOM里面就有什么。charsetRule、importRule、mediaRule、fontFaceRule等   
```
CSSStyleRule        重点
CSSCharsetRule
CSSImportRule
CSSMediaRule
CSSFontFaceRule
CSSPageRule
CSSNamespaceRule
CSSKeyframesRule
CSSKeyframesRule
CSSSupportsRule
```

**（1）CSSStyleRule**   
* selectorText String
* style K-V结构。   

通过CSSOM修改样式，比起直接修改style标签来说有很多好处，比如批量修改。    

比如说有一个list，想给它的颜色统一换一换，有CSSRule在的话，一种选择是给它加上一个对应的class；另一个就是，有一些伪元素是没办法直接通过DOM API去访问的比如说想改变图里面的Hello的颜色，就必须通过CSSOM去修改这些伪元素的表现。    

**实例：**
```css
<style title="Hello">
a::before{
    color: red;
    content: "Hello";
}
</style>
<link rel="stylesheet" title="x" href="data:text/css, p%7Bcolor:blue%70">
<a>world</a>
```
将上面的Hello world中的Hello改变成浅绿色：首先取CSS的styleSheets[0]，它也是 cssRules[0]    
```javascript
document.styleSheets[0].cssRules[0].style.color = "lightgreen"
```


**（2）getComputedStyle**     
**特点：** 可以取到页面上元素最终真实渲染的时候所需要的CSS的属性，同时，它也能够访问到伪元素上。    

**应用：** 通过 getComputedStyle 去获取一些真实的比如说 transform。比如说：    
* 元素的拖拽   
* CSS动画：有一些中间态，需要暂停这个动画，这个时候我们没有办法通过 DOM API style属性和 CSSRules去判断它当前播到哪里了，因为它是一个中间值，此时我们也会使用 getComputedStyle 

**写法：**
* window.getComputedStyle(elt,pseudoElt);
    * elt 想要获取的元素
    * pseudoElt 可选，伪元素

**实例：**
```css
<style title="Hello">
a::before{
    color: red;
    content: "Hello";
}
</style>
<link rel="stylesheet" title="x" href="data:text/css, p%7Bcolor:blue%70">
<a>world</a>
```
**Ⅰ、** 对元素调用 getComputedStyle， 找 a 元素：获取所有a元素已经计算出来的属性。
```javascript
getComputedStyle(document.querySelector("a"))
```

**Ⅱ、** 获取伪元素
```javascript
getComputedStyle(document.querySelector("a"), "::before")
```
**Ⅲ、** 获取伪元素计算好的样式 
```javascript
getComputedStyle(document.querySelector("a"), "::before").color   //
```

## 二、CSSOM View 部分    
CSSOM是跟CSS语言相对应的这样的一个模型，在完成了 layout之后，实际上渲染出来的图形，它也会包含一部分属性，如何获取layout，甚至说是 render之后得到的一些信息，此时就需要依赖 CSSOM 的View部分API    

CSSOM 的View部分API 与CSS的模型不太一致，主要是与浏览器最后画上去的视图非常的相关。   

**1、window API**  
**（1）**   

在浏览器上能够找到最顶层的一个东西就是浏览器窗口，浏览器的窗口，它会有一些很重要的特性，如下：    
* window.innerHeight, window.innerWidth   【重要】    

实际上所使用的viewport，也就是浏览器的HTML的内容实际上渲染所用的区域的高度和宽度。
* window.outerWidth, window.outerHeight    

包含了浏览器自带的工具栏，比如说把 inspector 调出来后inspector占的空间，它是浏览器的窗口总共占的尺寸，这个值没有太大用处，因为我们不需要关心整个window有多大，但是浏览器API为了完备性也可以获取。
* window.devicePixelRatio   【重要】

表示屏幕上的物理像素与代码里面的逻辑像素 px，它俩之间的这样的一个比值，正常的设备这两个比值是 1:1。Retina屏上是1:2，在有些安卓机上还会有 1:3 的DPR（devicePixelRatio）。DPR与我们实现代码的时候的布局是非常相关的。在css里写1px表示像素，但是实际上它不一定跟机器的物理像素重合。如果说DPR大于1，可能还需要一些技巧来实现真正1px的细线。
* window.screen  【不太重要】 
    * window.screen.width  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;实际上的屏幕的宽
    * window.screen.height &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;实际上的屏幕的高
    * window.screen.availWidth  &nbsp;&nbsp;&nbsp;可以使用的宽
    * window.screen.availHeight &nbsp;&nbsp;可以使用的高

注意：有些安卓机会把屏幕上的一部分做成物理上的按钮，这种情况下availWidth与实际上的width、availHeight与实际上的height就会发生一些不一样，实际上都是跟设备的硬件相关的信息。    

window 的API里只有innerHeight、innerWidth 和 devicePixelRatio 这三个是非常重要的。

**（2）**   开一个新的浏览器窗口时   
window.open() 方法：    传三个参数，可以指定打开的浏览器窗口它的宽高、在屏幕上所处的位置    
```javascript
window.open("about:blank","blank","width=100,height=100,left=100,right=100")

moveTo(x, y)    //改变位置
moveBy(x, y)    //改变位置
resizeTo(x, y)  //改变window尺寸
resizeBy(x, y)  //改变window尺寸
```
实例：   
利用 window API 打开一个新的窗口,进行resize、move操作   
```html
<button id="open" onclick="window.w = window.open('about:blank', '_blank', 'width=100,height=100,left=100,right=100')">open window</button>
<button onclick="w.resizeBy(30, 30)">resize</button>
<button onclick="w.moveBy(30, 30)">move</button>
```
**2、scroll 相关API 【应用率高】**      
实现拖拽效果等  
scroll分为 scroll的元素和window的scroll。   
```
scrollTop           找当前位置                  
scrollLeft          找当前位置                  
scrollWidth         可滚动内容的最大宽度         
scrollHeight        可滚动内容的最大高度                   
scroll(x,y)         别名scrollTo(x,y) 滚动到特定的位置             
scrollBy(x,y)       在当前的基础上滚动一个差值
scrollIntoView()    强制滚到屏幕的可见区域
```  

```
window              顶层的window，有滚动条的时候这些API才会生效
scrollX
scrollY
scroll(x,y)
scrollBy(x,y)
```
**3、layout相关的API**   
获取浏览器 layout 之后的两好方法：能够真实的取到所有元素的位置，而且这两个API的兼容性非常好。   

应用：想获取一个元素与它父元素的差值、位置的相对位置时，使用 getBoundingClientRect() 这个API 会很便捷。 
   
* **getClientRects()**     
在每个元素上可以调用 getClientRects 来获取它生成的所有的盒。所有的元素都会生成盒，有些元素它会生成多个盒。
* **getBoundingClientRect()**    
取一个包裹元素所有内容的一个方块，一定只能取到一个，是把所有的元素生成的盒所包含的区域给取出来。    

**实例**     
创建了一个div，div上边会有一些文字，讨论div里边的`<span class="x">文字 文字</span>` 
```css
.x::before{
    content: "额外 额外 额外 额外 额外";
    background-color: pink;
}
``` 
```html
<div style="width: 100px; height: 400px; overflow: scroll;">
    文字 <span class="x" style="background-color: lightblue;">文字 文字 文字 文字 文字 文字 文字</span>
</div>
```
```javascript
var x = document.getElementsByClassName("x")[0];  //把span中的x取出来
```
执行 `x.getClientRects()`       
会得到6个盒，即6个长方体的范围，实际上生成是也是6个这样的盒，分别位于不同的位置。     
【注意：伪元素也会参与到生成盒的过程中。伪元素在页面上是无法被选中的】    

执行 `x.getBoundingClientRect()`    
一定都只会获取一个，它的bottom、height 决定了它的尺寸，是正好圈住所有的盒的。
   
## （三）其他的API    
API的来源，有4个标准化组织   
* khronos  【计算机图形和视频方面具有权威性，最著名的作品是OpenGL标准】
    * WebGL
* ECMA    
    * ECMAScript    
* WHATWG   【从W3C分裂出去的子组织】
    * HTML
* W3C   
    * webaudio
    * CG/WG   【CG是Community Group；WG是Working Group】
    CG产生的一些标准没有放进W3C的官方网站里面    

全部API的分类和整理   
`<script></script>` 

```javascript
let names = Object.getOwnPropertyNames(window); //javascript语言里边的一些内容

function filterOut(names, props) {
    let set = new Set();
    props.forEach(o => set.add(o));
    return names.filter(e => !set.has(e));
}

// ECMA 262
{
    let js = new Set();
    let objects = ["globalThis", "console", "BigInt", "BigInt64Array", "BigUint64Array", "Infinity", "NaN", "undefined", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Array", "Date", "RegExp", "Promise", "Proxy", "Map", "WeakMap", "Set", "WeakSet", "Function", "Boolean", "String", "Number", "Symbol", "Object", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint16Array", "Uint32Array", "Uint8ClampedArray", "Atomics", "JSON", "Math", "Reflect", "escape", "unescape"];
    objects.forEach(o => js.add(o));
    names = names.filter(e => !js.has(e));  //过滤

}


// 【第一类】Subclass of Node 
/*
    过滤掉node的子节点：比如 HTMLSpanElement DivElement AnchorElement 这些DOM API  
    根据继承关系过滤出来
*/  
names = names.filter( e => {
    try { 
        return !(window[e].prototype instanceof Node)
    } catch(err) {
        return true;
    }
}).filter( e => e != "Node");  


// 【第二类】events 事件  
names = names.filter( e => !e.match(/^on/))   //将以on开头的都过滤掉


// 【第三类】webkit private
names = names.filter( e => !e.match(/^webkit/))  //过滤掉webkit私有属性，以webkit开头的


// 【第四类】https://html.spec.whatwg.org/#window  
{
    let names = Object.getOwnPropertyNames(window)
    let js = new Set();
    let objects = ["BigInt", "BigInt64Array", "BigUint64Array", "Infinity", "NaN", "undefined", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Array", "Date", "RegExp", "Promise", "Proxy", "Map", "WeakMap", "Set", "WeakSet", "Function", "Boolean", "String", "Number", "Symbol", "Object", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "ArrayBuffer", "SharedArrayBuffer", "DataView", "Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint16Array", "Uint32Array", "Uint8ClampedArray", "Atomics", "JSON", "Math", "Reflect", "escape", "unescape"];
    objects.forEach(o => js.add(o));
    names = names.filter(e => !js.has(e));

    names = names.filter( e => {
        try { 
            return !(window[e].prototype instanceof Node)
        } catch(err) {
            return true;
        }
    }).filter( e => e != "Node")

    let windowprops = new Set();
    objects = ["window", "self", "document", "name", "location", "history", "customElements", "locationbar", "menubar", " personalbar", "scrollbars", "statusbar", "toolbar", "status", "close", "closed", "stop", "focus", " blur", "frames", "length", "top", "opener", "parent", "frameElement", "open", "navigator", "applicationCache", "alert", "confirm", "prompt", "print", "postMessage", "console"];
    objects.forEach(o => windowprops.add(o));
    names = names.filter(e => !windowprops.has(e));
}


//【第五类】https://html.spec.whatwg.org/
// 过滤掉来自HTML带来的API (HTML里已经有的)
{
    let interfaces = new Set();
    objects = ["ApplicationCache", "AudioTrack", "AudioTrackList", "BarProp", "BeforeUnloadEvent", "BroadcastChannel", "CanvasGradient", "CanvasPattern", "CanvasRenderingContext2D", "CloseEvent", "CustomElementRegistry", "DOMStringList", "DOMStringMap", "DataTransfer", "DataTransferItem", "DataTransferItemList", "DedicatedWorkerGlobalScope", "Document", "DragEvent", "ErrorEvent", "EventSource", "External", "FormDataEvent", "HTMLAllCollection", "HashChangeEvent", "History", "ImageBitmap", "ImageBitmapRenderingContext", "ImageData", "Location", "MediaError", "MessageChannel", "MessageEvent", "MessagePort", "MimeType", "MimeTypeArray", "Navigator", "OffscreenCanvas", "OffscreenCanvasRenderingContext2D", "PageTransitionEvent", "Path2D", "Plugin", "PluginArray", "PopStateEvent", "PromiseRejectionEvent", "RadioNodeList", "SharedWorker", "SharedWorkerGlobalScope", "Storage", "StorageEvent", "TextMetrics", "TextTrack", "TextTrackCue", "TextTrackCueList", "TextTrackList", "TimeRanges", "TrackEvent", "ValidityState", "VideoTrack", "VideoTrackList", "WebSocket", "Window", "Worker", "WorkerGlobalScope", "WorkerLocation", "WorkerNavigator"];
    objects.forEach(o => interfaces.add(o));

    names = names.filter(e => !interfaces.has(e));
}

//http://www.ecma-international.org/ecma-402/5.0/index.html#Title

names = names.filter(e => e != "Intl")

//https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.15

names = filterOut(names, ["WebGLVertexArrayObject","WebGLTransformFeedback","WebGLSync","WebGLSampler","WebGLQuery","WebGL2RenderingContext","WebGLContextEvent","WebGLObject", "WebGLBuffer", "WebGLFramebuffer", "WebGLProgram", "WebGLRenderbuffer", "WebGLShader", "WebGLTexture", "WebGLUniformLocation", "WebGLActiveInfo", "WebGLShaderPrecisionFormat", "WebGLRenderingContext"]);

//https://www.w3.org/TR/webaudio/

names = filterOut(names, ["AudioContext", "AudioNode", "AnalyserNode", "AudioBuffer", "AudioBufferSourceNode", "AudioDestinationNode", "AudioParam", "AudioListener", "AudioWorklet", "AudioWorkletGlobalScope", "AudioWorkletNode", "AudioWorkletProcessor", "BiquadFilterNode", "ChannelMergerNode", "ChannelSplitterNode", "ConstantSourceNode", "ConvolverNode", "DelayNode", "DynamicsCompressorNode", "GainNode", "IIRFilterNode", "MediaElementAudioSourceNode", "MediaStreamAudioSourceNode", "MediaStreamTrackAudioSourceNode", "MediaStreamAudioDestinationNode", "PannerNode", "PeriodicWave", "OscillatorNode", "StereoPannerNode", "WaveShaperNode", "ScriptProcessorNode", "AudioProcessingEvent"]);

//https://encoding.spec.whatwg.org/#dom-textencoder

names = filterOut(names, ["TextDecoder", "TextEncoder", "TextDecoderStream", "TextEncoderStream"]);


//https://streams.spec.whatwg.org/#blqs-class

names = filterOut(names, ["ReadableStream", "ReadableStreamDefaultReader", "ReadableStreamBYOBReader", "ReadableStreamDefaultController", "ReadableByteStreamController", "ReadableStreamBYOBRequest", "WritableStream", "WritableStreamDefaultWriter", "WritableStreamDefaultController", "TransformStream", "TransformStreamDefaultController", "ByteLengthQueuingStrategy", "CountQueuingStrategy"]);



//https://wicg.github.io/BackgroundSync/spec/#sync-manager-interface

names = filterOut(names, ["SyncManager"]);



console.log(names.length);


```
