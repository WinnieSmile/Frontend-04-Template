<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2020-09-25 23:28:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_04\README.md
-->
## js语言通识|泛用语言分类方法
* 非形式语言  
    * 中文，英文    
* 形式语言（乔姆斯基谱系）是计算机科学中刻画形式文法表达能力的一个分类谱系，是由诺姆·乔姆斯基于 1956 年提出的。是一种包含关系，它包括四个层次：  
    * 0型 （无限制文法或短语结构文法）包括所有的文法。
    * 1型 （上下文相关文法）生成上下文相关语言。
    * 2型 （上下文无关文法）生成上下文无关语言。
    * 3型 （正规文法）生成正则语言。  
## js语言通识|什么是产生式  
* 产生式（BNF）： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句   
* 巴科斯诺尔范式：即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。  
* 终结符： 最终在代码中出现的字符（ https://zh.wikipedia.org/wiki/  终结符与非终结符)
   
产生式的写法：  
（1）用尖括号括起来的名称来表示语法结构名    
例如 if语句、函数、字符串直接量 表示不同的语法结构
（2）语法结构分成基础结构和需要用其他语法结构定义的复合结构  
    基础结构称终结符   （ terminal Symbol ）
    复合结构称非终结符 （ Nonterminal Symbol ）  

一个语言里边一定有很多的终结符，再通过这些终结符它们之间的组合关系形成结构，然后来产生一些非终结符，一般来说，语言都有一个最上层的非终结符来代表整个语言的文体。
（3）引号和中间的字符表示终结符  
（4）可以有括号  
（5）*表示重复多次  
（6）| 表示或  
（7）+ 表示至少一次     

比如要做一个字母a的列表，字母a就是用双引号引起来，如果列表里边a至少要出现一次，那么我们就会在a后边加上一个 + 。   
如果想做一个 a或者b 的字符这样的列表，那可能就会写 a|b 然后括起来，后面加一个 +   


## 四则运算   
* 1 + 2 * 3   
## 终结符   
Number &nbsp;&nbsp;  +  &nbsp;&nbsp;   -  &nbsp;&nbsp;    *   &nbsp;&nbsp;   / 
## 非终结符   
* MultiplicativeExpression   
* AddtiveExpression  

BNF  
``` html
<MultiplicativeExpression>::=<Number>|  
    <MultiplicativeExpression>"*"<Number>|
    <MultiplicativeExpression>"/"<Number>
<AddtiveExpression>::=<MultiplicativeExpression>
    <AddtiveExpression>"+"<MultiplicativeExpression>|
    <AddtiveExpression>"-"<MultiplicativeExpression>|
```
作业：编写带括号的四则运算产生式   

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






