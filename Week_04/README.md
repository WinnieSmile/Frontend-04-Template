<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2020-12-15 22:02:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_04\README.md
-->
## （一）、js语言通识   
* 产生式    
* 语言的分类：乔姆斯基谱系、声明式、数据、编程语言    
* 动态、静态、类型系统    
* 编程语言的一般的结构
## 一、泛用语言分类方法
* 非形式语言  
    * 中文，英文    
* 形式语言（乔姆斯基谱系）是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。是一种包含关系，它包括四个层次：  
    * 0型 （无限制文法或短语结构文法）包括所有的文法。
    * 1型 （上下文相关文法）生成上下文相关语言。
    * 2型 （上下文无关文法）生成上下文无关语言。
    * 3型 （正规文法）生成正则语言。  
## 二、 什么是产生式  
参考资料：https://blog.csdn.net/u014287775/article/details/56014778
* 产生式（BNF）： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句   
* 巴科斯诺尔范式：即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。  
* 终结符： 最终在代码中出现的字符（ https://zh.wikipedia.org/wiki/  终结符与非终结符)
  
**1、产生式的写法：**  
（1）用尖括号括起来的名称来表示语法结构名    
例如 if语句、函数、字符串直接量 表示不同的语法结构     
（2）语法结构分成基础结构和需要用其他语法结构定义的复合结构  
* 基础结构称终结符   （ terminal Symbol ）
* 复合结构称非终结符 （ Nonterminal Symbol ）  

一个语言里边一定有很多的终结符，再通过这些终结符它们之间的组合关系形成结构，然后来产生一些非终结符，一般来说，语言都有一个最上层的非终结符来代表整个语言的文体。    
（3）引号和中间的字符表示终结符  
（4）可以有括号  
（5）*表示重复多次  
（6）| 表示或  
（7）+ 表示至少一次     

比如要做一个字母a的列表，字母a就是用双引号引起来，如果列表里边a至少要出现一次，那么我们就会在a后边加上一个 + 。   
如果想做一个 a或者b 的字符这样的列表，那可能就会写 a|b 然后括起来，后面加一个 +   


## 2、BNF  
``` html
<MultiplicativeExpression>::=<Number>|  
    <MultiplicativeExpression>"*"<Number>|
    <MultiplicativeExpression>"/"<Number>
<AddtiveExpression>::=<MultiplicativeExpression>
    <AddtiveExpression>"+"<MultiplicativeExpression>|
    <AddtiveExpression>"-"<MultiplicativeExpression>|
```
相关知识点：   

**四则运算**  
* 1 + 2 * 3   

**终结符**   
Number &nbsp;&nbsp;  +  &nbsp;&nbsp;   -  &nbsp;&nbsp;    *   &nbsp;&nbsp;   / 

**非终结符**   
* MultiplicativeExpression   
* AddtiveExpression  

## 3、【作业】：编写带括号的四则运算产生式

例如有一个式子是  ( 2+3 ) * 4 * ( 5 * 6) ，看看是否能够套到产生式里。

写法一：

``` html
<BracketExpression>::=<Number>|  
    "("<AddtiveExpression>")"|

<AddtiveExpression>::=<MultiplicativeExpression>|
    <AddtiveExpression>"+"<MultiplicativeExpression>|
    <AddtiveExpression>"-"<MultiplicativeExpression>|

<MultiplicativeExpression>::=<BracketExpression>|
    <MultiplicativeExpression>"*"<BracketExpression>|
    <MultiplicativeExpression>"/"<BracketExpression>|
```

写法二：
``` html
<Mul>::=<Number>|<Mul>"*"<Atomic>|<Mul>"/"<Atomic>
<Add>::=<Mul>|<Add>"+"<Mul>|<Add>"-"<Mul>
<Atomic>::="("<Add>")"|<Number>
```

写法三：

``` html

<PrimaryExpression>=<DecimalNumber>|"("+<LogicalExpress>")"

<AdditiveExpression>=<PrimaryExpression>|<AddtiveExpression>
    "+"<PrimaryExpression>|<AddtiveExpression>
    "-"<PrimaryExpression>  

<MultiplicativeExpression>=<DecimalNumber>|<MultiplicativeExpression>
    "*"<DecimalNumber>|<MultiplicativeExpression>
    "/"<DecimalNumber>
<LogicalExpress>=<DecimalNumber>|
    <LogicalExpress>"||"<AdditiveExpression>|
    <LogicalExpress>"&&"<AdditiveExpression>
```
写法四：
``` html
<MultiplicativeExpression>::=<Number>|  
    <MultiplicativeExpression>"*"<Number>|
    <MultiplicativeExpression>"/"<Number>
<AddtiveExpression>::=<MultiplicativeExpression>|
    <AddtiveExpression>"+"<MultiplicativeExpression>|
    <AddtiveExpression>"-"<MultiplicativeExpression>|
<BracketExpression>::=<AddtiveExpression>|
    "("<AddtiveExpression>")""*"<AddtiveExpression>|
    "("<AddtiveExpression>")""/"<AddtiveExpression>|
    "("<AddtiveExpression>")""+"<AddtiveExpression>|
    "("<AddtiveExpression>")""-"<AddtiveExpression>|
```

写法五：

``` html
<Pri>::=<Number>|
    "("<Muti>")"|
    "("<Add>")"|

<Multi>::<Pri>|
    <Multi>"*"<Pri>|
    <Multi>"*"<Pri>
<Add>::=<Multi>|
    <Add>"+"<Multi>|
    <Add>"/"<Multi>
```

## 三、深入理解产生式    
通过产生式理解乔姆斯基谱系    
* 0型 无限制文法
    * `?::=?` 

上面的例子中，产生式的左边只有一个非终结符，但是在产生式里是可以在左边产生多个非终结符，比如说一个 a 字，就可以产生 10 个各种不同样的非终结符，然后由它们再组成一些复杂的这样的语法结构，无限制文法里边就是随便写，定义的左边和右边不论写什么东西都可以。 
* 1型 上下文相关文法    
    * `?<A>?::=?<B>?`    
    开头问号`<A>`结束问号 ::=开头问号`<B>`结束问号    
    开头问号表示上文，结束问号表示下文    

1型 上下文相关文法，对产生式的书写做出了一定的限制，它也可以左边、右边写多个非终结符，但是变的只能有一个，左边变化的只能有一个，变化的部分是有前面和后面的这样的一个关系，一定是有一个固定的不变的部分。即前面问号（第一个问号）开头的部分，和后边（第二个问号、第四个问号）结束的部分。     
上下文相关文法：根据前后来判别每一个符号，不管是终结符还是非终结符，它所表达的意义的这样的一种文法。 
* 2型 上下文无关文法 
    * `<A>::=?`

产生式左边的部分只能有一个符号，左边只能有一个非终结符，右边随便写，可以是一大堆产生一个非终结符；也可以是终结符和非终结符的混合。
* 3型 正则文法    
    * `<A>::=</A>` 
    * `<A>::=?<A> x`     

假如正则文法是递归定义的，那么它不允许这个定义 A 出现在尾巴上，它只允许比如说左边是一个符号，右边 A 一定是出现在产生式的最开头的，它不能出现在尾巴上。根据这个规则，所有的正则文法都是可以被用正则表达式来表示的。    
例子：   
```javascript
{
    get a { return 1 },
    get : 1
}


2 ** 1 ** 2
```
JavaScript 虽然总体上属于上下文无关文法，其中的表达式部分大部分属于正则文法，但是有两个特例：    
* ** 运算符，表示乘方。       
`2 ** 1 ** 2` 结果是 2，因为它是右结合的。1 ** 2 先运算，所以说1的平方是1，2的1次方是2，所以结果是2。        
* get 关键字   
定义对象的时候，在get后面写a，表示它是个类似关键字的东西；不写a，即get 后面直接冒号，表示它自己是属性名。所以严格按照乔姆斯基谱系理解的话，JavaScript是属于上下文相关文法。   

在JavaScript引擎的实现上，可以理解为它的总体的编程的结构都是一个针对上下文无关的这样的一个分析，一旦遇到像 get 这样的上下文相关的地方就会单独的用代码做一些特例处理，所以说一般不会把JavaScript归结为上下文相关文法去处理。    

## 四、其它产生式   
乔姆斯基谱系除了可以用 BNF 来定义，还有很多产生式的类型。    
EBNF、ABNF 都是针对 BNF 做了一些语法上的扩展。   
JavaScript里面书写产生式的例子      
```
AdditiveExpression :
    MultiplicativeExpression
    AdditiveExpression +
MultiplicativeExpression
    AdditiveExpression -
MultiplicativeExpression
```
这段产生式的开头是用缩进来表示的它开头相当于产生式左边的非终结符，非终结符后边跟了一个冒号，之后给了两格的缩进。JavaScript的产生式它的非终结符，加号减号这样的是用加粗的黑体字来表示它是终结符的。

## 五、现代语言的分类    
**现代语言的特例**   
* C++ 中，* 可能表示乘号或者指针，具体是哪个，取决于星号前面的标识符是否被声明为类型。    

这就导致 C++ 变成了一个根本就不是形式语言，它是因为要去语义里面去取这个内容，但是 C++ 整个的语法分析本身是一个形式语言的这样的一个结构，所以说我们可以知道在现代的编程语言里面其实并不是严格贴合着乔姆斯谱系里面的各个模型去设计的。
* VB 中，< 可能是小于号，也可能是 XML 直接量的开始，取决于当前位置是否可以接受 XML直接量。  【是一个上下文相关的文法】   
* Python 中，行首的 tab符合空格会根据上一行的行首空白，以一定规则被处理成虚拟终结符 indent 或者 dedent。   

Python的处理会导致它变成了一个完全的非形式语言，因为我们任何的形式化定义都没有办法定义上一行行首的概念。  
* JavaScript 中，/ 可能是除号，也可能是正则表达式开头，处理方式类似于 VB，字符串模板中也需要特殊处理 } 右大括号，还有自动插入分号规则。 


大部分编程语言的主体都是上下文无关文法   

**语言的分类**   
* 形式语言 —— 用途   
    * 数据描述语言        
    JSON、HTML、XAML、SQL、CSS 
    * 编程语言     
    C、C++、Java、C#、Python、Ruby、Perl、   
    Lisp、T-SQL、Clojure、Haskell、   
    JavaScript
* 形式语言 —— 表达方式   
    * 声明式语言：只告诉我们结果是怎样的    
    JSON、HTML、XAML、SQL、CSS、Lisp、Clojure、Haskell   
    大部分的数据语言都是声明式的
    * 命令型语言：达成这个结果，它的每个步骤是怎样的。    
    C、C++、Java、C#、Python、Ruby、Perl、JavaScript

## 六、编程语言的性质     
**1、图灵完备性**   
所有的可计算的问题都可用来描述的，这样的语言就是具备图灵完备性。 
* 图灵完备性
    * 命令式 —— 图灵机    
        * goto
        * if和while    
        通过goto语句、if和while语句来实现图灵完备
    * 声明式 —— lambda
        * 递归    
        lambda可以理解为数学上的一种lambda函数，基本的意思是替换的关系。lambda演算通过递归实现图灵完备。

`图灵完备性`：在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。

`图灵机（Turing machine）`：又称确定型图灵机，是英国数学家艾伦·图灵于 1936 年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种计算模型，可以看作等价于任何有限逻辑数学过程的终极强大逻辑机器。

**2、动态与静态**    
`静态和动态语言`： https://www.cnblogs.com/raind/p/8551791.html    
* 动态：
    * 在用户的设备/在线服务器上
    * 产品实际运行时 &nbsp;&nbsp;&nbsp;（时机）
    * Runtime &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; （运行时）
* 静态：   
    * 在程序员的设备上
    * 产品开发时 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（时机）
    * Compiletime &nbsp;&nbsp;&nbsp; （编译时）

**3、类型系统**
* **动态类型系统与静态类型系统**   
    * **动态类型系统**：在用户的机器上、用户的内存里面能够找到的类型。【如JavaScript】    
    * **静态类型系统**：只在程序员编写代码的时候能够保留的类型信息。     
    【如C++】最终编译到目标的机器的代码的时候所有的类型信息都已经被丢掉了。    
    
    区分动态和静态的方法：看它在谁的电脑上能够保留下来。

    Java这种语言，因为提供了反射机制，所以更多的是一种半动态半静态的类型系统。在编译时主要的类型检查和类型的操作都已经在编译时被处理掉了。
* **强类型与弱类型**     
只是说明在编程语言里类型转换发生的形式，强类型的语言它的类型转换是不会默认发生的。   

**JavaScript是一个典型的弱类型的语言。**

    * **String + Number**    
    String与Number相加，JavaScript引擎会默认的把Number转换成String类型，最后得到一个String。
    * **String == Boolean**   
    在String和Boolean之间，做双等运算的话，会先把布尔转成Number，然后再跟String去做是否相同的对比。
* **复合类型**
    * **结构体**       
    {
        a: T1
        b: T2
    }    
    定义一个对象，它的 a 属性必须属于类型 T1。
    
    * **函数签名**    
    有一些函数，像 JavaScript语言函数是可以作为参数传递的。  
        * **参数类型**    
        参数类型是一个列表，所以说函数类型可能会有 T1、T2变成 T3 这种形式
        * **返回值类型**

* **子类型**   
如C++。    
所有的基于类的面向对象的语言，都会把类的结构关系变成类型的关系。    
类与类型不是一个概念，有了子类型，在做类型转换的时候，会有一些默认的行为，比如说能用父类型的地方都能用子类型。
* **泛型**     
把类型当做一个参数一样的东西，传递给某一段代码结构，这个代码结构才有可能是类，也有可能是函数。分别对应泛型类、泛型函数。泛型与子类型结合便会产生逆变、协变这样的东西。
    * **逆变 / 协变**   

`协变`：例1：加入Array是一个接受泛型的这样的数组，凡是能用到它的Parent的地方都能用到它的Child，都能用Child类型的数组去替代。不论对Array里面的元素做什么操作，Child类型肯定继承了Parent类型所有的功能。   
`逆变`：例2：如果说泛型的结构是一个Function，它接受 Child作为参数，接受Child作为参数，一定也能接受 Parent作为参数。这样的函数我们就可以把能接受Parent参数的函数传进去，让它代替能够接受Child的函数。

```
结构体：
{
    a: T1
    b: T2
}

函数签名：
(T1, T2) => T3

泛型：
凡是能用 Array<Parent> 的地方，都能用 Array<Child>
凡是能用 Function<Child> 的地方，都能用 Function<Parent>   

1. 泛型： 一般在 集合类用的比较多
2. 协变：子类可以转换成父类
3. 逆变：父类可以转换成子类
```

**强类型**： 无隐式转换

**弱类型**： 有隐式转换

**协变与逆变**： https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html
   
## 七、一般命令式编程语言   
```
Atom            Expression      Statement      Structure       Program

Identifier      Atom            Expression     Function        Program
Literal         Operator        Keyword        Class           Module
                Punctuator      Punctuator     Process         Package
                                               Namespace       Library
```
`原子级`（Atom）：是一个语言的最小的组成单位，它通常包含一些关键字、直接量、变量名这样的基本的单位。典型的是变量名、写1234这种字符串直接量/数字直接量。    
`表达式`（Expression）：原子级的这些结构他通过运算符相连接，加上一些辅助的符号，它就会构成一个表达式的结构，表达式通常是一个可以级联的结构。     JavaScript有四则运算、按位与、移位运算、比较运算、或、非这些逻辑运算。    
`语句`（Statement）：表达式加上一些特定的标识符和一些特定的关键字、一些特定的符号形成一定的结构。if条件语句，while、for这种循环语句。    
`结构化的层级`（Structure）、Function、Class、所用是把代码分成不同的块，然后分成不同的复用的结构；使用关键字来形成这种结构化的结构。     
`Program`（Program）：管理语言的模块和安装，在JavaScript里一般是 npm ，JavaScript本身有两个最顶级的定义，Program、module；module：准备好被复用的模块，program 实际执行的代码。Java里面有 Package这个概念，有些语言里则用的是Library这个概念。    

## （二）   
## 一、JS类型     
原子级：       
```
语法                            运行时
Grammar                         Runtime

Literal         字面值          Types
Variable        变量            Execution Context
Keywords        关键字
Whitespace      空白符
Line Terminator 换行符
```
类型：
```
Number          IEEE 754 float表示方法
String          1.ASCII、Unicode字符集； 2.UTF编码方式
Boolean
Object
Null            有值，但是为空，可赋值
Undefined       未定义（类似于Number里面的NAN）
Symbol          新加的基本类型，一定程度上代替了String的作用，可以用于Object里的索引。
```
Symbol与String最大的区别就是String的对象能取出来，Symbol的变量取不出来。 Symbol是用于Object的属性名这样的一种特殊类型。    
在编程中常用的是前五种：Number、String、Boolean、Object、Null。   
Null在早期JavaScript设计的时候出现偏差，它的typeof的值最后会出来一个Object。    

**1、Number**   
* IEEE 754 Double Float   
    * Sign (1)
    * Exponent (11)
    * Fraction (52)    

JavaScript中的数字对应到我们概念里面的有限位数的一个小数，再次也是对应到一个有理数，Number基本上不会用来表示无理数。   
Number 双精度浮点类型，Float表示浮点数，它的小数点是可以来回浮动的，基本思想是把一个数字拆成它的指数和有效位数。数的有效位数是决定了浮点数表示的精度；指数决定了浮点数表示的范围，所以说浮点数可以表示很大的数，但是数越大，它能表示的位置就越稀疏；比如我们在接近最大值的时候，它其实可能不是每个整数都能表示。浮点数有一个最大的整数表示范围，几乎会很少越最大的整数表示范围的界。浮点数还有一个可以表示的符号，可以表示正负。最终 IEEE754的浮点数 双精度浮点数表示是1个符号位加上11个指数位，再加上52个精度位表示的。每一个位就是一个bit，它可以是0或者1。指数有一个偏移，11位不光是为了表示正的，它还有表示负的范围，所以它会从1个1后边10个0，从这个开始比这大的就表示正的比这小的就表示负的。所以说指数位它有一个基准值。要剪掉基准值才是真实的2的n次方。   
最大的数是 2的2048次方减1、乘以52个1。表示的最小的正数是负的，全是0。基本值是1后边10个0，所以说是2的10次方。它就表示2的负10次方。    

**Number —— Grammar**
* DecimalLiteral   十进制（允许有小数）
    * `0`    
    * `0.`      
    * `.2`      
    * `1e3`  1表示有效数字，3表示指数，1e3表示1000
* BinaryIntegerLiteral  二进制（只支持整数）
    * `0b111`  以0b开头，后面只能写0或者1，不能有空格
* OctalIntegerLiteral   八进制
    * `0o10`  以0o开头，后面只能有0~7
* HexIntegerLiteral     十六进制
    * `0xFF`   16进制是以0x开头，可以写0~9的数字，从10开始，用A~F来表示10~16的值

注意：    
0.toString();  错误    
0 .toString();  正确  取属性的运算符    

**2、String**     
字符串的运行时  
* String
* Code Point
* Encoding    

a    97         

* ASCII      
ASCII 规定了127个字符：各种大写字母、各种小写字母、0~9、各种制表符、各种特殊的符号、换行等控制字符。用0~127来表示。     
* Unicode   
* UCS    
* GB   
    * GB2312
    * GBK(GB13000)
    * GB18030
* ISO-8859
* BIG5     
    
ASCII字符集本身最多占一个字节，它的编码跟码点是一模一样的。ASCII不存在编码问题。GB Unicode 存在编码问题。GB（国标）同时规定了字符集和编码方式。Unicode联合了很多国家的字符，它存在一些各种不同的编码方式。Unicode中表示ASCII范围的可以用 UTF-8表示，8就是8个比特位，也就是一个字节。UTF-8就是默认用一个字节表示一个字符。所有的ASCII字符在UTF-8里都是属于ASCII字符，它的编码方式是兼容的。一段ASCII编码的文字，同时也是一个UTF-8编码的这样的一段文字，反过来不成立。因为它默认一个字节，不是说所有的字符都能用一个字节。  

UTF16默认用16个比特位，也就是2个字节来表示1个字符。
```
UTF8        01100001    01100010
UTF16       00000000    01100001    00000000    01100010       
```

作业：写一段函数，把一个 string 代表的字节给转换出来。用 UTF8对 string进行编码  
```javascript
function UTF8_Encoding(string){
    // return new Buffer();
}
```
**String —— Grammar**     字符串的语法   
```
"abc"       双引号字符串 
'abc'       单引号字符串
`abc`       里边可以插 $ 符开始的变量，$符 和花括号这样的变量，这样它就是比较强大的字符串的直接量的写法。     
```   
**"abc" 与 'abc'**： 没啥区别，双引号字符串和单引号字符串，这两个没有任何区别，区别仅仅是在单双引号的使用下，双引号里边可以加单引号作为普通字符，单引号也可以加双引号作为普通字符。 这里边会有一些特殊字符，比如说回车 \n ，\t。   
如果说双引号字符里边还要用双引号的话，也是在前面加个反斜杠，没有特殊含义的字母，在前面加反斜杠都是它自身。 
   
练习：用正则表达式去匹配单引号和双引号的字符串的写法。      
答案：
```
"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\U[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*"      


'(?:[^'\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\U[0-9A-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux'"\\bfnrtv\n\\\r\u2028\u2029])*'
```
解析：首先是空白，空白的定义包含回车，包含斜杠、包含\r，\r是跟\n配合使用，\n是换行符，\r是回到行首，2028和2029都是分段和分页，这些都对应着一个带反斜杠的版本。还支持 \x转义 和\u转义 这两种转义的方法。    
bfnrtv 这几种特殊的字符，转义\x和\u的转义规则 
```
\b  \f  \n  \r  \t  \v
```
**反引号字符串 ``**     
String——Grammar——Template    
前面是可以在第一个反引号的前面是可以加一个函数名的，所以这个结构不一定是去处理这个字符串。它还可以把它作为一种语言让函数去做一些解析和处理。
```
`ab${x}abc${y}abc`
```
* `ab${   
* }abc${
* }abc`   

反引号字符串，看起来像是一个字符串的 literal直接量，它在里面塞了一个变量或者是里面允许用 $ 和大括号括起来的表达式。任何语言的词法分析不可能去把变量或者表达式做成一个结构。所以说这是一个语法结构，而不是一个词法结构。     

一个反引号后面跟着一个字符串，后边一个 $ 符和左大括号，这个才是一对括号关系。    
右大括号和最后的反引号它们之间是 literal 关系。  

一个反引号产生了 4 种不同的新的 token。这4种token跟中间的表达式共同的形成了一个 string template 这样的语法结构。一种是开始、一种是中间、一种是结束，前后都是反引号中间不插变量的形式。    

如果按照JS引擎的角度是有点难理解，其实是反过来的，被括起来的是一些裸的 JavaScript语法，被括起来之外的部分才是字符串的本体。     

**3、其他类型**    
* Boolean
    * true
    * false    

注意：true和false都是关键字  
* Null & Undefined    
    * null
    * undefined
    * void 0;   void不论后边跟什么都会把后边的表达式的值变成undefined这个值。

null和undefined 都表示空值，不同的是null表示有值但是是空；undefined语义上表示未定义这个值。   
null是关键字；undefined不是关键字，它是一个全局的变量。在早期的JS版本中 全局的变量我们可以给它重新赋值，比如说把undefined赋值成true，但是基本上不会这样做。null是关键字，不可以赋值，给它赋值会发生错误。

```javascript
function f(){
    var undefined = 1;   //合法，给undefined赋值为1
    console.log(undefined);
}

function f(){
    var null = 0;   //错误，null是关键字，不能作为变量名
    console.log(null);
}

```
## 二、JS对象    
1、对象的基础知识   
* 任何一个对象都是唯一的，这与它本身的状态无关。所以，即使状态完全一致的两个对象，也并不相等。

即使是两个状态完全一致的对象，也并不相等，所以有时候我们会把对象当数据用，并不是把对象当做对象用。一些典型的场景：比如传一个config，传config的过程其实并不是把对象当做对象去传，而是把对象当成一种数据载体去传，此时就涉及到对对象类型的使用与语言原本的设计用途的一些偏差。
* 我们用状态来描述对象。   

比如说，一条鱼，对象上面这个鱼有没有尾巴，眼睛有多大，这些可能会去用一些值来描述一个对象，这些值就是所谓的状态。这个状态其实是一个客观事实存在的一个状态，我们只是用一个数据去描述它。这些状态改变的就是行为。
* 状态的改变即是行为。  状态由对象决定的。       

状态的改变，比如说这个鱼，尾巴受伤了、尾巴来回摆动，这些都是属于它的状态的改变，这些状态的改变都是行为。 

对象三要素：唯一性的标识、状态、行为    

**（1）Class**   类    
类是一种常见的描述对象的方式。   

而 “归类” 和 “分类” 则是两个主要的流派。   
归类：研究单个的对象，从里面提取共性，然后把它们变成类， 变成类之后又在类之间去提取共性，把它们变成更高的抽象类。    
分类：把世间万物先抽象成一个基类Object，然后分类，比如说Object里面有什么。

对于“归类”方法而言，多继承是非常自然的事情，如 C++。   
而采用分类思想的计算机语言，则是单继承结构，并且会有一个基类Object。
**（2）Prototype**   原型      
原型是一种更接近人类原始认知的描述对象的方法。    
我们并不试图做严谨的分类，而是采用 “相似” 这样的方式去描述对象。    
任何对象仅仅需要描述它自己与原型的区别即可。   
原型Prototype更适合一些不那么清晰、描述比较自由的一些场景；分类Class更适用于一些比较严谨的场景。Class有一个优势是天然的跟类型系统是有一定的整合的所以说很多的语言就会选择把Class的继承关系整合进类型系统的继承关系。Class与Type是两个概念。    

小练习：狗咬人，“咬”这个行为该如何使用对象抽象？    
思路：    
```javascript
// 错误
class Dog{
    bite(human){
        // ……
    }
}
```
上面代码中定义一个Dog这样的一个class，给它一个bite方法，它咬了人，这样根据题目里面的描述是一模一样的。但是这个抽象是一个错误的抽象。因为它违背了面向对象的基本的特征，不论class  base还是prototype base，不论设计成哪个，只要bite发生在狗身上，那么它就是错的。     

因为面向对象的三要素，对象的行为，不是现实生活中的对象的行为，而是改变对象的行为，bite这个动作改变了人的状态，人身上是改变人的行为，它的命名应该是下面这样的。   

对人来说，他只需要关心我受到了什么样的伤害就可以了，不需要关心到底是狗咬的还是谁咬的。
   
狗咬人是一个业务逻辑，当我们设计人的class的时候，我们只设计改变 Human对象内部的状态的方法，所以它的正确命名应该是 hurt，至于damage是什么格式，它有可能是从狗的bite这个行为里面生成出来的，但是不可能是直接传一只狗进来。   

* 我们不应该受到语言描述的干扰。
* 在设计对象的状态和行为时，我们总是遵循“行为改变状态”的原则。 
```javascript
// 正确
class Human{
    hurt(damage){
        // ……
    }
}
```
**2、JavaScript中的对象**    
在JavaScript运行时，原生对象的描述方式非常简单，我们只需要关心原型Prototype和属性Property两个部分。

一个对象是一个属性的集合，JavaScript 的每一个对象都有一个Prototype，属性可以用来描述状态，而JavaScript它的属性既可以用来描述状态，又可以用来描述行为，因为JavaScript的函数也是可以放进属性里的，所以这两个状态和行为得以统一，唯一标识性，JavaScript用内存地址来表示对象的唯一性。JavaScript里面原生支持了一个原型机制，当我们去找一个对象的属性的时候，如果它自身不包含这个属性，那么它就会到原型上去找，如果它的原型不是空的话，那么它还会继续往它的原型的原型上去找。这样就形成了链式这样的行为，成为原型链。     
JavaScript获取属性的行为时会沿着原型的指向一路往上去找，一直找到原型为Null的这样的一个原型对象。    

属性：   
```
Symbol          Data
String          Accessor
```
JavaScript属性是一个 kv 对，它的特点是我们可以根据 k 找到 v，JavaScript的属性 k值可以是两种类型，一种是Symbol，一种是String。   

String是一个可以猜出来的一种 k，别人看了源代码，他就可以从任何一个地方拿到这个对象实例之后，他总能访问到你的属性。

Symbol 它在内存里创建了之后，他只能通过变量去引用它，没有办法构造两个一模一样的Symbol。即使两个Symbol的名字是一样的，它们也是不相等的。这样的话，Symbol就很好的实现了属性访问的权限控制。如果你不把Symbol的名字传递给下一家，那么你的编写的代码的使用者是没有办法去访问你用Symbol名字作为 k 的属性值的。      

（1）`JavaScript 的属性的值的部分有两种形态`：
* 数据属性
* 访问器属性 

一般来说，数据属性用于描述状态，访问器属性则用于描述行为。数据属性中如果存储函数，也可以用于描述行为。        

当我们访问属性时，如果当前对象没有，则会沿着原型找原型对象是否有此名称的属性，而原型对象还可能有原型，因此，会有 “原型链” 这一说法。     

这一算法保证了，每个对象只需要描述自己和原型的区别即可。    

JavaScript 提供了一系列的语法和API，可以把 JavaScript 的对象相关的语法和API分成4个部分：   
* {}.[]   Object.defineProperty   提供了一个基本的对象机制，我们能够通过语法去创建对象、访问属性和定义新的属性、改变属性的特征值，这个是基本的面向对象的能力。
* Object.create / Object.setPrototypeOf / Object.getPrototypeOf     
基于原型的描述对象的方法。可以通过 Object.create在指定原型的前提下创建对象，而我们有可以修改一个对象的原型，或者获取一个对象的原型。 
* new / class / extends   
以基于分类的方式去描述对象，这种方式，尽管它在运行时仍然会被转换成 JavaScript 的原型相关的访问，但是从语法上来看、从它的抽象能力上来看，它完全就是一个基于类的这样的面向对象的组织方式。
* new / function / prototype   【尽量不要用】     

（2）JavaScript 中还有一些特殊的对象，比如函数对象。   

除了一般对象的属性和原型，函数对象还有一个行为 `[[call]]`。     

`[[call]]`：  对象的内置行为，在JavaScript中无论通过任何的方式都没有办法访问到它。 

* 我们用JavaScript中的function关键字、箭头运算符或者 Function 构造器创建的对象，会有 `[[call]]` 这个行为。       

* 我们用类似 f() 这样的语法把对象当做函数调用时，会访问到 `[[call]]`这个行为。   
如果对应的对象没有 `[[call]]`行为，则会报错。

`Array[[length]]`：数组对象，它的长度会随着增加新的数字型的这样的属性而变化。    
`Object.prototype[[setPrototypeOf]]`：所有对象的原型，它是没有setPrototypeOf的方法，可以调，但是这样调用会失效。    

**作业**：找出JavaScript标准里面所有具有特殊行为的对象。（即JavaScript里面定义的那些我们没法用普通对象，即属性加原型来描述的这样的对象的行为）


+++++++++++++++++++++++++++++++++++

```
Array:      具有自动计算长度的对象集合。
Function:   具有方法和执行能力的对象。
Arguments:  函数内具有实体的形参。
Map:        引用地址为key的对象。
Set:        自动去重的Array对象集合。
```
+++++++++++++++++++++++++++++++++++
```
Array：                  Array 的 length 属性根据最大的下标自动发生变化。
Object.prototype：       作为所有正常对象的默认原型，不能再给它设置原型了。
String：                 为了支持下标运算，String 的正整数属性访问会去字符串里查找。
Arguments：              arguments 的非负整数型下标属性跟对应的变量联动。
模块的namespace 对象：   特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import 吧。
类型数组和数组缓冲区：    跟内存块相关联，下标运算比较特殊。
bind 后的 function：     跟原来的函数相关联。
``` 




