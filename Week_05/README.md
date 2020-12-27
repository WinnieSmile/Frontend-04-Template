<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2020-12-27 21:49:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_05\README.md
-->
## （一）JS表达式   
一、运算符和表达式   
   
* 语法树与运算符优先级的关系
* 运算符的左值和右值的关系。   
* 运行时：类型转换、引用类型 

1、语法树与运算符优先级的关系   
乘除的优先级比加减高，括号的优先级比乘除更高。在构造语法树的时候需要考虑到这个因素，乘除会优先形成更小一级的语法结构，加减会形成更高一级的语法结构、1+2*3，2*3。   
在JavaScript的标准中，是用产生式来描述运算符的优先级的。   

2、表达式 - Expressions 
```
Member                          New
    a.b                         new Foo                         
    a[b]
    foo`string`
    super.b
    super[ 'b' ]
    new.target
    new Foo()
```
例如：     
new a()()    
new new a()    

Member类的运算符，点运算符是代表，还有其他的运算符。

① a.b和a[b]都是成员访问，区别是b是不是一个字符串。JavaScript中，用中括号里面写b这种形式是可以支持运行时的字符串；如果换成一个静态语言是不会允许你传一个变量进去这个位置。  

a.b 访问了一个属性，但是它从属性取出来的不是属性的值，它取出来的是一个引用，这个引用类型不是 JavaScript的七种基本类型之一。 
② Function，反引号的字符串这种形式，如果说它的前面加一个函数名，那么它会把这个反引号的字符串部分拆开，然后传进这个函数当做参数，这个运算它的优先级也是比较高的，与Member是属于同一级。    
③ 使用super关键字，只有在class的构造函数里面可以用，super.b和super[b]都属于 Member运算，优先级跟变量点和变量方括号是一样的。     
④ new.target的前后两个词都是固定的，一个字都不能换，与Member运算优先级是一致的。
⑥带括号的new，它的优先级与前面的这些是相同的，不带括号的new被单独的设为一个优先级，称作 new 表达式     
```
new a()() 
new new a()
```  
new之后，new a 后面跟了两对括号，a 后边的第一对括号是一个函数调用还是一个 new 运算的结果。在 member表达式里边包含 new 括号的情况下，new 括号的结构的优先级更高，所以说第一段括号一定是跟着前面 new 运算的，new 后边的 new foo，不带括号的优先级更低。    
比如：连续写了两个 new，后边跟了一个 class 名 a ，后面跟了一个括号，因为带括号的 new 它的运算的优先级更高，所以它的括号会跟着第二个 new 优先级结合。，否则就变成了，如果把这两个反过来，就变成了括号跟第一个 new 结合。    

3、Reference  运行时   
```
Object              delete
Key                 assign
```
一个运行时分为两个部分，第一个部分是一个对象，第二个部分是一个Key，对象是JavaScript对象，Key可以是 String，也可以是 Symbol。    
一个Reference 取出来的是一个 Objecct 和一个key，所以说它完全记录了 Member 运算的前半部分和后半部分。delete和assign这样的基础设施，它其实会用到 Reference类型，如果我们做加法或者减法的运算，我们会把 Reference直接解引用，像普通变量一样去使用，但是 Member表达式出来的，如果是放在 delete 之后，我们需要用到引用的特性。因为我们需要知道删除的是哪一个对象、哪一个Key。assign也是一样。当我们进行赋值的时候，也就是我们把 Member运算放在一个等号的左边，+=、-=、*=、/= 这类的assign运算都是一样的，我们把它放到左边的时候，我们也要知道我们把右边的这个表达式赋值给哪一个对象的哪一个属性。这就是引用类型的一个关键的特征。    
JavaScript就是引用类型在运行时来处理删除或者负值这样的写相关的操作。     

4、Call Expressions  call表达式
```
Call                    
    foo()
    super()                 Example:
    foo()['b']              new a()['b]
    foo().b
    foo()`abc`
```
Call Expression 是一个统称。最基础的 Call Expression 就是一个函数后边跟了一对圆括号。它的优先级要低于 new，同时也低于前面的所有的 Member 运算。但是在括号之后，如果加上取属性，比如说方括号 `[]`、比如说 `.b` 、反引号 ``。那么它会让表达式降级为 Call Expression。也就是后边的点运算它的优先级也降低了。   

语法结构能够表达的内容是要多于运算符优先级所能表达的，像这种点运算，它本身就可以有不同的优先级，它是它前面的语法结构来决定自己的优先级。    
带圆括号的属性，它的优先级比不带圆括号的要低两级。所以我们有时候用优先级解释运算符不是一种非常严谨的说法。真正严谨 是产生式，一级一级的语法结构来描述运算的有限顺序。   

例子 new a()['b']   
new出来了一个a对象，然后访问它的 b 属性。这部分可以理解为 Call New 和 Member其实原本的级别应该是差不多的。因为是要处理 new 后面的圆括号与谁结合的问题，所以才产生了三个不同的表达式的优先级。    

圆括号先跟 new 相结合，这个 new 是圆括号带来的，带圆括号的new是一个 Member Expression，它的优先级要高于 Call Expression ，同时后边的带方括号的属性访问，也是因为被圆括号，被 Call Expression 拉低了优先级，所以说它的优先级也变低了。     

5、Left Handside & Right Handside   左手和右手表达式
```javascript
a.b = c;    //正确。a.b是左手表达式 Left Handside
a+b = c     //错误。a+b是右手表达式 Right Handside
```   
只有 Left Handside 才有资格放到等号的左边，在JavaScript里其实并不会定义所谓的 Right Handside Expression，因为所有的 Expression 默认它如果不属于 Left Handside，那它一定属于 Right Handside。       

不能放到等号左边的：    
（1）自增自减 Update Expression
* Update Expression   
Update 是 Left Handside
    * a++
    * a--
    * --a
    * ++a

```javascript
++ a ++
++(a ++)
```    

从Update Expression 这一级开始，它已经是 Right Handside Expression 了。我们可以认为  Left Handside Expression 几乎一定是 Right Handside Expression，在JavaScript里面没有例外，在大部分语言里面也没有例外。Right Handside Expression 它是从 Update Expression 开始的，update是自增自减。  

（2）单目运算符   
* Unary
    * `delete a.b`
    * `void foo()`
    * `typeof a`
    * `+ a`
    * `- a`
    * `~ a`
    * `!a`
    * `await a`   

单目运算符最典型的是 delete，它后边必须是 Reference类型才能够生效。   

void 运算符是把后面不管什么东西都给它变成 undefined。这个运算符看似没用，但是其实它类似于空白、回车、它可以起到很好的改变语法结构的作用。    

typeof 也是单目运算符。      

`+` 正号其实并不会改变后面的表达式的值，如果后边是一个字符串的话，它就会发生一些类型转换。大部分的运算都会发生一些类型转换。表达式是类型转换的大户和重度用户。  

~ 是位运算，它把一个整数按位取反，如果不是整数，会把它强制转为整数。   

! 非运算，它是一个针对布尔型的运算，有时候会用两个非 !! 来把一个任何类型的数强制转换成布尔类型。    

await 也是一个单目运算，await会对更大的语法结构造成一些影响。    

（3）`**`  乘方 【右结合的运算符】
* Exponental   
    * `**`  乘方
```javascript
3 ** 2 ** 3         // 后边先运算，先算出来2的3次方，再算出来3的8次方
3 ** (2 ** 3)
```
大部分运算符都是左结合的，`**`它是JavaScript唯一一个右结合的运算符。

6、优先级更低，更高一级的语法结构    
    

* Multiplicative &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  乘除运算
    * `* / %`    

乘除运算、除了传统的乘除，JavaScript 里还支持一个取余运算 % 以及加减运算。对于所有的数字都必须是 Number 类型，它也会发生类型转换。
* Additive
    * `+ -`         

第一种是把两个字符串相连接起来，第二种是把两个数字相加。
* Shift
    * << >> >>>       
    
位运算、移位运算（左移右移）  
* Relationship   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 关系比较表达式
    * <， >， <=， >=， instanceof，in        

字符串的比较方法：         
比较两个字符串的字典顺序，有时候会被大家利用，一般不建议利用这个字符串的比较算法，非常容易出错。     

7、优先级再低一点的就是相等的比较。    
* Equality  &nbsp;&nbsp;&nbsp;&nbsp;  等号
    * ==
    * !=
    * ===
    * !==
* Bitwise  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 位运算
    * & ^ |
            
双等号，双等号在 JavaScript 里面是类型转换最为复杂的一种运算，它基本的原则就是类型相等的时候，就是正常的比较，类型不同的时候，它会优先的把布尔型的变量转换成 Number 类型，非常违反人类的直觉。如果两边是确定的类型，或者说一边是字符串，一边是 Number，还是可以用双等号的。    

位运算，按位与，异或和按位或。优先级比相等的比较还要更低一些。   

8、逻辑运算   
* Logical  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 逻辑运算符
    * &&
    * ||
* Conditional
    * ? :    

逻辑运算基本上是优先级最低的，与和或的关系。逻辑运算短路原则：如果 && 的前半部分得到的结果是 false 的话，后边的部分的表达式根本不会被执行；|| 前面的是true，后边的就不会被执行。所以说 && 和 || 有时候会被用来代替 if。    

Conditional 运算符是唯一一个三目运算符，它由一个问号和一个冒号分割成三个部分，第一个部分是条件，第二个部分是条件为真的时候执行的表达式的值。第三个部分是冒号后面的条件为假的时候执行的值。    

Conditional 也是有短路逻辑的，Conditional 当前面执行为 true 的时候，它的冒号的后半部分是不会被执行的。所以 Conditional 某种意义上也是可以代替 if 和 else的。     

※ Logical 和 Conditional 都是有短路逻辑的。所以不能保证写在这个结构里面的所有的表达式子结构都会被执行。其他的表达式结构都没有这个问题。    

二、类型转换    
语法结构上从小到大，运算符优先级上从高到低，解释了运算符和表达式。类型转换会发生在各种类型的强要求中。  
a+b、a[o]、a.   
Type Convertion    

* a + b   
* "false" == false
* a[o] = 1;

a+b 是一定要作用于字符串或者是作用于两个数字之间的，一旦 a 和 b 属于别的类型，那么它就会发生一个类型转换。比如说，一个字符串和一个数字相加，那么我们就要把这个数字转成字符串；如果说其中的一个是布尔类型，那么我们要根据相加的关系进行一下转换。     

类型转换是一个比较复杂的话题。对表达式来说，类型转换也是一个重要的基础设施。在整个的 JavaScript 里面最复杂的类型转换就是双等号。比如说字符串的 false，它跟布尔变量的 false，它们两个相比较并不相等。   

事实上，因为双等号的类型转换规则非常的复杂，总的类型相同它可以比较，类型不同它基本上是把它全转为 Number，然后再互相比较。比如说：空格与布尔变量 false 比较，是相等的；0 与 false 比较也是相等的。    

尽量使用 === ，或者是做完类型转换再进行比较，这样可以避免很多不必要的麻烦。    

Member Expression 里Object的key部分也会发生类型转换。   

位运算不但会转换成 Number 类型，还必须要把 Number 再转成整数类型。这是类型转换对表达式的意义。     


1、JavaScript的 7 种基本类型互相之间是怎么样进行转换：    

|           | Number                | String            |  Boolean      |   Undefined   |   Null    |   Object  |   Symbol  |
| :-----    | :----                 | :----             |  :----        |   :----       |   :----   |   :----   |   :----   |
| Number    | -                     |                   |  0 false      |   x           |   x       |   Boxing  |   x       |
| String    |                       | -                 |  "" false     |   x           |   x       |   Boxing  |   x       |
| Boolean   | true 1 、 false 0     | 'true'、'false'   |  -            |   x           |   x       |   Boxing  |   x       |
| Undefined | NaN                   | 'Undefined'       |  false        |   -           |   x       |   x       |   x       |
| Null      | 0                     | 'null'            |  false        |   x           |   -       |   x       |   x       |
| Object    | valueOf               | valueOf、toString |  true         |   x           |   x       |   -       |   x       |
| Symbol    | x                     | x                 |  x            |   x           |   x       |   Boxing  |   -       |    

① Number与String之间的转换，有一个较为复杂的规则。   
第三排的布尔型变量参与的转换：Number 和 布尔型变量，Number 0会转为 false，其他的数字会转成 true。    
Number 和 Object之间的转换，这个地方会发生一个装箱转换。   
② String，它跟布尔变量就是一个空字符串会转成 false，其他 String 都会转成 true，这个是跟 == 的比较结果会有较大的差异。String跟布尔变量转换，并不等于他们用双等号比较的时候一定会相等。   
③ Boolean，布尔变量它转换成其他，布尔变量转Number，它就会 true转1、false转0。所有的非0的 Number都会转成 true，但是 true转回去就都变成了1。String就是字符串的true和false。Object同样存在一个装箱转换，布尔变量是没有办法转成 undefined、Null、Symbol的。  

④ Undefined。Undefined是一个特殊的类型它转成 Number 的时候会得到 NaN 这个值（Not aNumber）、然后它转成 String 就是Undefined。大部分时候Undefined是不会参与任何类型转换的，它转成布尔变量就是false，Null跟Undefined不同，Null如果要转成Number的话，它得到的结果是0，转成 String，它同样是 'Null' 的值，它转成 布尔变量也是 false。Undefined和Null是没办法转成 Object的，所以说这两个之间实际上是不存在装箱转换的。  

⑤ Object 转成 Number的时候，是会调用 valueOf成员函数的，String会先后调用 valueOf 和 toString，凡是Object转成布尔变量一定是 true。  

⑥ Symbol 变量其实没有办法转换成任何的其他的变量，它最终只能够通过 boxing转成 Object。    

2、Unboxing 拆箱转换    
拆箱转换，是指我们把一个Object转成基本类型，这里面最主要的过程是   ToPremitive，ToPremitive发生在表达式定义的方方面面。比如加法，如果遇到了Object加Object或者Object参与运算的情况，它都会调用 ToPremitive过程。
* ToPremitive
* toString vs valueOf
* Symbol.toPrimitive

```javascript
var o = {
    toString(){
        return "2"
    },
    valueOf(){
        return 1
    },
    [Symbol.toPrimitive](){
        return 3
    }
}


```
上面这段代码中，一个对象 o 身上有三个方法的定义会影响到 ToPremitive ：
① toString 方法
② valueOf 
③ Symbol 的 toPrimitive    

如果定义了 Symbol.toPrimitive，那么它就会忽略 toString 和 valueOf，否则我们在进行不同的转换的时候，它会根据提示来决定调用 toString和valueOf的先后，例如：   
加法会优先调用 valueOf，比如即使是调用一个字符串参与的这样的加法，x + o 此时也是会先调用 valueOf，valueOf有这个方法，那么它就会得到 1。如果把 valueOf 和 toPrimitive 这两个都注释掉，那么 x + o 的结果就会得到 x2。   
只要有 Symbol 的 toPrimitive ，它就一定会得到 x3。   
当 o 作为属性名的时候，则会优先调用它的 toString 方法。比如下面这段代码   
```javascript
var x = {}   
x[o] = 1

console.log("x " + o)
```
x 等于一个对象， x[o] = 1，如果我们把 toPrimitive 注释掉，最后我们得到的结果是 x2 发生了改变，而不是 x1 发生了改变。每一个表达式都有一定的类型转换的这样的机制。大部分时候类型转换的机制是很清晰的，除了像 == 这样的特殊场景。    

位运算要先转 Number、转Number就一定会先调 valueOf，这种一定会用到字符串的场景，它就会先调 toString。    

3、Boxing 装箱转换    
| 类型     | 对象                       |  值                |
| :----    | :----                      | :----             |
| Number   | new Number(1)              |  1                |
| String   | new String("a")            |  "a"              |
| Boolean  | new Boolean(true)          |  true             |
| Symbol   | new Object(Symbol("a"))    |  Symbol("a")      |

Object是有类这个概念的，对每个基础类型，Object都提供了一个包装的类，但是Undefined和Null就没有包装类的，剩下的四个基础类型都是有包装类的，比如说 Number 它就是一个构造器，名为 Number。这个Number既可以使用 new 去调用，又可以直接调用，如果直接调用Number，它就会返回一个值，如果使用 new去调用，它就会返回一个 Object，这个时候，我们就称Number对象和值1 之间存在装箱关系。 String和 Boolean同理。    

注意：Symbol构造器是没有办法被 new调用的，所以如果想要创建一个Symbol对象，还需要用 Object构造器给它再包一层。只能通过调用 Symbol来获得一个Symbol类型的值。但是如果加了new，它就会抛错。事实上我们也是能够得到Symbol的包装类型的，所以它跟前面的三种略有一点点的区别。使用Member也就是说使用点或者方括号去访问属性的时候，如果点和方括号之前的变量或者表达式得到的是一个基础类型，那么就会自动调用装箱的过程，不需要我们再去调用标准里面规定的 Number、String、Boolean 这些构造器。   

所以，在Number这个Class上定义了什么样的值，那么我们正常的 Number类型的值它也可以通过点运算去访问。   

Number类型和Number类不是一个东西。可以通过typeOf区分到底是包装后的对象，还是包装前的值。    

**练习：**    
StringToNumber    
NumberToString      
Number有4种进制的定义，StringToNumber就是我们能够去解析这4种类型的String，并且把它变成 Number。    
NumberToString是一个逆向的过程，可以通传一个进制来指定它到底要转换成几进制的字符串。   

## （二）JS语句  

一、运行时相关概念     
Statement    语句    

```
Grammar              Runtime

简单语句             Completion Record       语句的执行结果的记录
组合语句             Lexical Environment     作用域相关
声明
```
1、Completion Record   &nbsp;&nbsp;&nbsp;&nbsp;语句完成状态的一个记录  
```javascript
if(x == 1)
    return 10;
```
完成的记录，每写一个语句，由JavaScript引擎去执行之后，会产生Completeion Record这样的东西。Completeion Record一定是有些字段的。     
* 我们需要一个数据结构来描述语句的执行结果：是否返回了？返回值是啥？等等……

**Completion Record 的组成**    
* [[type]]: normal,break,continue,return,or throw
* [[value]]: 基本类型
* [[target]]: label    

Completion Record 分成了三个部分。
* 类型 `[[type]]`，正常的语句它都是 normal、有一些语句会产生 break continue  return 或者 throw 这样的行为。所以说类型是一个非常关键的信息。    
比如说 if语句、或者 for循环、它里边都有可能产生 return 或者 break continue 这样的东西。因为我们所谓的语句是有一定的结构的。它的子语句有时候变成了return 或者 throw这样穿透力比较强的，它就会影响到它的父语句，然后让它产生 Completion 的type的变化。
* 返回值 `[[value]]`，有些语句，尤其是表达式语句，它一定是有一个返回值的，正因为它有返回值，所以说它才能够发挥一定的作用，另外，像return、throw 都会带着一个值，这个值也是控制中的一个关键，它这个值可能会被抛给其他的语句，或者是赋值给一些变量去执行。所以 value 也是 Completion Record里面的一个重要信息。   
* `[[target]]` 是一个label，label其实就是我们在语句前面加上一个标识符和一个冒号，这样的话，这个语句就变成了一个带 label 的语句。break和continue语句可能会跟带label的语句发生交互。所以说break和continue往往会带一个target出来。    
扩展；如何利用 Completion Record去分析语句执行的结果  

2、简单语句和复合语句      
**简单语句**
```
ExpressionStatement         表达式语句
EmptyStatement              空语句
DebuggerStatement           debugger关键字后边接一个分号
ThrowStatement              流程控制语句| throw
ContinueStatement           流程控制语句| continue
BreakStatement              流程控制语句| break
ReturnStatement             流程控制语句| return
```

① 表达式语句：用Expression（表达式）来单独的构成一个语句。一个简单表达式后面加一个分号就是一个简单语句    
② 空语句：单独的一个分号    
③ debugger语句：debugger关键字后边接一个分号，debugger语句是一种专门给调试的时候使用的一种语句，它在实际的用户的电脑上运行的时候是不会发生任何作用的。它的建议的用法就是说触发一个 debugger 这样的断点。在项目上线前会把debugger语句移除。     
④ ThrowStatement 会抛出一个异常，如果说不是想让它真正的发生错误，我们是可以主动的在代码里面用 `throw空格+表达式` （即 throw空格接一个表达式）来抛出这样的一个异常的     
⑤ Continue 和 break 跟循环语句相匹配，continue表示结束当次循环，后面的循环继续。如果说我们在 1 ~ 100 这样的一个循环里，我们可能在第 68 次循环的最前面写了个
 if i === 68 continue 那么这次循环后边的代码都不执行了，但是第69次到第100次它都是会执行的。     
⑥ break 相当于结束整个循环，相当于循环条件被破坏了，所以说break和continue是非常常见的结果    
⑦ returnStatement 一定得在函数里面去用，它会返回一个函数的值。    
⑧ 比较新的语句，比如与 generator相关的 yield 等。    

**复合语句**    
```
BlockStatement
IfStatement             分支结构
SwitchStatement         多分支结构
IterationStatement      循环
WithStatement
LabelledStatement
TryStatement            三段结构
```
`BlockStatement` ：{ 语句列表 }  能够把我们所有需要单条语句的地方都变成可以用多一条语句。是完成语句的树状结构的重要的基础设施。     
`IfStatement`：分支结构条件语句    
`SwitchStatement`： 多分支结构，不建议在JavaScript中使用，因为它在C++或者C语言里面的性能会比连续的if要高的，但在JavaScript里面没有区别。而且特别容易写错，它每一个case后边都要写一个break。建议我们用多个if else的结构来代替 switch。    
`IterationStatement`：while循环、do-while循环、for循环、for await循环等       
`WithStatement`：可以通过with打开一个对象，然后把这个对象的所有的属性直接放进作用域里面去。在写法上是可以节约一些空间的，可以节约记忆成本，但是实际上它本身带来的不确定性非常高。在一般的现代的JavaScript编程规范里边是拒绝使用with的。     
`LabelledStatement`：在简单的语句的前面加上一个 label，也可以在复合语句的前面加上一个label。相当于给语句起了一个名字。LabelledStatement其实是可以给任何语句用的，但是实际上真正有效的地方，比如说给 if 语句起一个 label，它其实是没有任何意义的。但是 IterationStatement 配上 labelled ，然后再配上 break continue这种后边带 label的，它就会产生意义了。    
`TryStatement`：三段结构，它包含了 try、catch、Finally 三个结构。在 try里面其实不是BlockStatement，它的花括号是有 try 语句定义的。try是不可以省略花括号的，省略之后它会抛错。     

**block**      
```
BlockStatement
{
    语句1
    语句2
    语句2
}

```
block 是一个可以容纳多个语句的这样的一个 block，BlockStatement 可以有多个语句，它的返回值是 normal、它的 value和target不明。如果里边有 break continue 这些，它也可以随时变成相应的值。     

**Iteration**      
```
while(表达式) 语句                  while有可能一次都不执行
do 语句 while(表达式);              do-while至少执行性一次
for(可加声明; 语句; 语句) 语句          for;
for(可加声明 in 语句) 语句              for in
for(可加声明 of 语句) 语句              for of


声明：
var 
const/let
in
```
let 声明的域，for语句是会产生一个独立的let的声明的作用域，它跟它里边的语句是两个作用域，但是它在作用域的外层。不同的循环之间是可以改变声明的变量。比如 i 的值有 for i = 0~100，它的值是能够改变并且是跨循环保存的。    

**标签、循环、break、continue**     
多层循环嵌套的时候，break适合我们在多层嵌套的循环语句里面去使用。带label的break，它可以一下子跳出多层的循环，可以节省很多的 if 语句的判断和一些逻辑。     

**try**    
```
try{
    语句
}catch(表达式){
    语句
}finally{
    语句
}


[[type]]: return
[[value]]:--
[[target]]:label
```
catch 会产生一个作用域，在 catch 里面就会让 catch 后边圆括号里边的变量被赋值为 try 里面抛出来的错误。它同样还是可以有 label。    
**注意**：return 按理说是会造成一种打断性的结构，但是在 try-catch-finally 的这种结果里，即使你在try里面return了，finally里面的代码也一定会继续执行。

3、声明    
```
FunctionDeclaration
GeneratorDeclaration            Generator声明：关键字后面加 * 
AsyncFunctionDeclaration        异步函数声明：Function前面加async关键字
AsyncGeneratorDeclaration       异步的产生器：关键字后面加 *、async关键字
VariableStatement               变量声明，既有声明的作用，又有实际的执行计算的能力
ClassDeclaration                class声明
LexicalDeclaration              const、let 声明
```
*函数声明：FunctionDeclaration、GeneratorDeclaration、AsyncFunctionDeclaration、AsyncGeneratorDeclaration*     

```
第一种                          第二种

function                        class
function *                      const
async function                  let
async function *
var 
```
第一种声明：作用范围只认 Function Body、没有先后关系。永远会被当做出现在函数的第一行一样去处理，所以 function写在函数尾也是可以的。在函数体里面声明一个局部的 Function，但是在前面一样可以访问到。    
var 的声明作用是相当于出现在函数的头部的，但是它实际上后边的表达式，如果写 var a = 1，这个变量已经被声明为了一个函数级的局部变量，但是它后边的一个赋值并没有发生。这是它与Function声明的区别。   

第二种声明：class const let 这三个声明有一个共性，当你在它们的声明之前去使用的时候，它就会报错。   
class：比如说，在外面声明了一个 class a，在函数里面又声明了一个 class a，此时如果在里边的 class a的声明之前访问这个 a，此时会报错。    
const和let：实际上也是有一个预处理的能力，只是说它确保了你只要在它声明之前使用就会报错。        

**（1）预处理**   
预处理是指在一段代码执行之前，JavaScript引擎会对代码本身做一次预先处理这样的机制。 预处理：会提前找到所有的 var 声明的变量，并且让它生效。

例子1：
```javascript
var a = 2;
void function (){
    a = 1;
    return;
    var a;
}();
console.log(a);  //2
```
上面这段代码中， a 被声明到了 function 的作用域之内，a 并没有改到外边的这个 var a = 2的这个 a，它被里边的 var a给占据了这就是预处理机制造成的。   
注意：var 不管写在函数里面的哪一个位置，不论是if里边、写在return 之后、catch里、finally里 都没有区别。都会被预处理挑出来，把这个变量声明到函数的作用级别。

例子2：
```javascript
var a = 2;
void function(){
    a = 1;
    return;
    const a;  //把例子1中的 var 换成 const
}();
console.log(a);
```
上面代码中，把例子1中的 `var a` 换成 `const a`，这个变量 a 成为了一个局部的变量，此时它执行会报错，并且它其实并没有影响到外边的变量 a，也就是说如果给这个函数的外面加一个 try catch 的话，最后打印出来的结果 `console.log(a);`仍然是 2 。

注意：所有的声明都是有预处理机制的。它都能够把变量变成一个局部变量。 区别是 const 声明，在声明之前使用的话，会报错，而且这个错误是可以被 try 和 catch 去处理的。

**（2）作用域**      
在代码里边，这个变量从哪到哪发生作用，这就叫作用域。

```javascript
var a = 2;
void function (){
    a = 1;
    {
        var a;
    }
}();
console.log(a);
```
var 的作用域是前后都有的，它的作用域是它所在的函数体，是因为它有预处理机制才有这种能力。
<br>
<br>
```javascript
var a = 2;
void function (){
    a = 1;
    {
        const a;
    }
}();
console.log(a);
```    
const的作用域在它所在的花括号里，如果是在循环语句，有一些循环语句是可以在里面加 const 声明的，如果在这里用了 const 或者 let 声明，那么它的作用域就是整个的循环语句。它比循环语句里边的花括号的范围要大。因为它每次循环都会产生新的。    

const 这样的声明作用的范围就是自己外层的block语句。   
如果想要局部地声明一些变量，或者用 const 过多，可以使用花括号把函数分成小节。   
比如 React的Hocks、 Vue3.0的 conversation API 就使用到花括号分隔函数，用花括号一分隔，整个函数的结构非常明确，也不会产生前后的变量干扰。


早期的标准中，var 和 function的声明，它的作用范围都是整个的函数体，不管把 var 写在哪里它最终的作用范围都是这个函数体。    
 
总结： 
```
Grammar [语句]            Runtime [运行时]
简单语句                  Completion Record     [语句的完成状态]
组合语句                  Lexical Environment   [let const class]
声明
```
JavaScript中新旧两代的声明体系。在新的声明中，我们是局部作用域并且它的预处理会帮助我们把所有在它之前使用的声明的变量都抛错。尽量使用let const class声明。

简单语句：最重要的是表达式语句。是由一个表达式后面跟一个分号来组成的。    
组合语句：多用于控制简单语句的执行顺序。常见的有条件、循环、每一种语句都有一个结构的关系。注意 try catch 和finally 里面并不是用block语句来制造的多语句执行的环境，所以try后面的花括号是不能够省略的。    

通过 Completion Record （语句的完成状态）这样的抓手了解组合语句是如何实现控制能力。Completion Record 决定了语句是继续向下执行还是停止执行。不同的组合语句会用不同的方式会用不同的方式去利用 Completion Record，最终达成需要的控制效果。不管是分支还是循环、捕获异常、返回这些都是由 Completion Record（语句的完成状态）来决定的。    

4、JS 结构化    
**（1）宏任务、微任务**    
JS执行粒度（运行时）  
* 宏任务 
* 微任务（Promise）
* 函数调用（Execution Context）
* 语句/声明（Completion Record）
* 表达式（Reference）
* 直接量/变量/this……   
 
宏任务和微任务：采用 jsc 里的说法，实际上在不同的JavaScript 引擎里对它们的命名有一些区别。宏任务就是传给 JavaScript 引擎的任务，微任务就是在 JavaScript 引擎内部的任务，宏任务是讨论JavaScript语言最大粒度的这样的一个范围，微任务是由 Promise来产生的。微任务里面可能会分成几个不同的函数调用。    
再下一层是语句和声明，再下一层是表达式，再下一层是直接量。   

宏任务、微任务：    
对JavaScript引擎来说，它其实是一个静态的库这样的形式，我们在使用JavaScript引擎的时候，我们会把一段代码传给它，    
```javascript
var x = 1;
var p = new Promise(resolve => resolve());
p.then(() => x = 3);
x = 2;
```
上段代码不是一个完全顺次执行的代码，它有一个Promise和then的逻辑，因为then已经被resolve掉了所以说它会立即继续执行，所以说在JavaScript标准里定义then后边的代码应该是异步执行的。     
我们给JavaScript引擎一段代码，它产生了两个异步任务，这两个异步任务，第一个里面就是 x = 1，p = new Promise，p.then()和 x = 2的这段代码，第二段就是 x = 3的这段代码，这两个异步任务我们把它称作一个 MicroTask，在JavaScript标准里我们把它叫做一个 job，最后运行的结果是3。因为有两个微任务，所以说其实最后输出的结果是其中的一个微任务的结论。   
把代码塞给引擎，并且进行执行的整个过程我们把它称作一个 MicroTask（宏任务）。     

事件循环（event loop）：如何使用JavaScript引擎的过程。    
事件循环有三个部分：①获取一段代码 ②把代码执行掉 ③等待、继续执行代码。   
一般来说，我们会在OC里面把它实现成等待一个锁，然后有不同的条件去触发锁，然后来继续进行执行，所以时间循环它将是一个独立的线程里面去执行这个事情。    

**（2）函数调用**    
宏任务、微任务会决定代码的一些执行的次序。但是在同一个微任务里面，函数调用可能会让代码来回跳转执行。   

例子1：
```javascript
import {foo} from "foo.js"
var i = 0;
console.log(i);
foo();
console.log(i);
i++;
```
```javascript
function foo(){
    console.log(i);
}
export foo;
```
foo函数它里边的代码，它访问的i是foo环境里面定义的i，如果说没有定义，这句就会出错。
<br>
<br>
例子2：
```javascript
import {foo} from "foo.js";
var i = 0;
console.log(i);   //可以访问i变量
foo();
console.log(i);   //可以访问i变量 
i++
```
```javascript
import {foo2} from "foo.js";
var x = 1;
function foo(){
    console.log(x);  //可以访问x变量
    foo2();
    console.log(x);  //可以访问x变量
}
export foo;
```

```javascript
var y = 2;
function foo2(){
    console.log(y);  //可以访问y变量
}
export foo2;
```
上面这段代码，两次函数调用，让foo这个函数去访问一个叫做x的变量，这个x的变量在foo所处的环境里面是有定义的，再定义一个foo2，由foo去调用foo2，然后foo2里又访问了y变量。形成了栈式的调用，函数调用本身也会形成一个stack（栈），它能访问的变量其实也是可以用一个stack去描述的。   

**Execution Context  执行上下文栈**    
当我们执行到当前语句的时候，栈有一个栈顶元素，栈顶元素就是当前我们能访问到的所有的变量，这些就是 Running Execution Context。    

Execution Context    
```
code evaluation state   用于async和generator函数                            
Function                由Function来初始化的Execution Context中才会有        
Script or Module        要么有Script，要么有Module                           
Generator               只有Generator函数会需要，是Generator函数每次执行所生成的，隐藏在背后的Generator，只有Generator函数创建的执行上下文才会有Generator字段
```
```
Realm                   保存所有使用的内置对象
LexicalEnvironment      执行代码中所需要访问的环境，保存变量的
VariableEnvironment     决定了我们用var去声明变量，它会声明到哪的这样的一个环境
```   
<br>

* ECMAScript Code Execution Context
    * code evaluation state
    * Function
    * Script or Module
    * Realm
    * LexicalEnvironment
    * VariableEnvironment

* Generator Execution Contexts
    * code evaluation state
    * Function
    * Script or Module
    * LexicalEnvironment  
    * VariableEnvironment
    * Generator
 

**LexicalEnvironment**    
在更老的版本里它表示里边只存变量，在新的标准里2018以后的ES标准里，所有我们执行的时候存的东西几乎都保存在 LexicalEnvironment 里，比如说 this值，new.target 所创造的Object也是保存在 LexicalEnvironment 里，super、声明时候所使用的变量都会存在于 LexicalEnvironment 里面。 

**VariableEnvironment**    
VariableEnvironment是个历史遗留的包袱，仅仅用于处理var声明。     

```javascript
{
    let y = 2;          //会把y声明到一个 block 范围的作用域里面
    eval('var x = 1;')  //会把x=1声明到一个更大的范围，Function body或Script Module里面
}
with({a:1}){
    eval('var x;');
}
console.log(x);
```
var 的规则，是会在函数的body被预处理的时候就把 var 声明给处理掉了，但是 var 声明如果说出现在 eval里面，我们就没办法通过预处理去识别它，专门给 eval 加 var 去进行处，所以说多数时候 VariableEnvironment 和 LexicalEnvironment 是重合的。    

特殊情况：With  
用with来声明的作用域，它里面的变量像 var x 是会穿过with声明到更外层的Function Environment里面的。会造成一个奇怪的现象，比如 var x = 1;那么它里面声明的x，声明到了函数范围里面，但x=1的赋值，如果说with的object里面有x属性，那它x = 1这个语句照常执行到with的作用域里面，VariableEnvironment 是为了var声明所保留的一个历史遗留的东西。     

Environment Record，Environment 并不是一个单纯的结构，它其实会形成一个链式结构，这个链式结构里面的每一个节点我们称为一个 Environment Record。Environment Record又有一个继承关系,Environment Record的基类叫 Environment Record，下面有三个子类： 

* Environment Records    
    * Declarative Environment Records   
        * Function Environment Records
        * module Environment Records
    * Global Environment Records
    * Object Environment Records  给with用的      

<br>

**Function - Closure** 闭包
```javascript
var y = 2;
function foo2(){
    console.log(y);
}
export foo2;
```
在JavaScript里面每一个函数都会生成一个闭包，根据闭包的经典定义，闭包是分成了两个部分，其中包含代码部分和环境部分。环境部分是由一个object和一个变量的序列来组成的，在JavaScript里面每一个函数都会带一个它定义时所在的Environment Records，它会把这个Environment Records保存到自己的函数对象身上，变成一个属性code，每个函数都有自己的code，在下面的例子里 function foo2定义的时候，它的外边有一个 y = 2，所以说不管这个foo2最后被通过参数或者是export、import这样的东西传到哪里去，它都会带上 y = 2的 Environment Records，这个就是闭包，也是 Environment Records最后能形成链的这样的一个关键的设施。   
<br>


复杂的情况：
```javascript
var y = 2;
function foo2(){
    var z = 3;
    return ()=>{
        console.log(y,z);
    }
}
var foo3 = foo2();
export foo3;
```
foo3它在执行的时候，它在内部，因为每次foo2的执行，它都会在内部形成这样的闭包，所以说它会产生一个 z = 3；foo2它所处的环境 y=2，那么就会被作为 z=3 所在的环境的上级被保存下来，这个就是 Environment Records形成的一个链式的结构，在更早的版本中它还有一个独立的名字叫做 Scope Chain，在新版本里面已经没有了。2018以后的ES标准里已经不这么说了。我们要注意，因为有箭头函数的引入，所以说不但 z = 3被保存了下来，z=3执行的时候所用的this也被保存了下来。this是global。所以说这条 Environment Records里面有 z=3和 this=global两条记录。加上它更外层的 y=2 一共有三条记录。所以说在我们的 return 后面的箭头函数里面，我们就可以同时访问 y z 和this。这就是闭包和作用域链的这样的一个机制。    

**Realm**    
在JS中，函数表达式和对象直接量均会创建对象。    

使用.做隐式转换也会创建对象。    

这些对象也是有原型的，如果我们没有 Realm，就不知道它们的原型是什么。    

执行表达式的过程中，除了变量 this new.target 这些东西，我们还需要一些其他的信息，比如说对象直接量、花括号的对象直接量、方括号的数组直接量、这些东西都会产生 object，但是产生的object需要有原型。
<br>

```javascript
var x = {};     //创建了一个Object对象
.toString();    //装箱产生Number对象
```

如果尝试使用 iframe的话，在不同的iframe里面去创建的对象，它的原型是不一样的，那么这个原型就需要用一个东西去记录，这个就是Realm。在JavaScript里它所有的内置对象会被放进去一个Realm里面去。在不同的Realm实例之间，它们是完全相互独立的，所以说也就意味着我们用instanceof有可能会失效。比如我们使用 点 做隐式类型转换的时候，我们也会创建出来这种对象，它可能产生什么Number对象，它们也同样需要用到Realm，有了Realm之后，我们就可以去执行这些对应的表达式、去描述它们的行为。而Realm会根据一些外部的条件去创建不同的Realm。不同的Realm实例之间也可以互相传递对象，但是传递过来之后，它的Prototype是不一致的。  

**作业：直观感受一下Realm：**     
找出 JavaScript引擎里面Realm里面的所有的对象，然后使用一个JS的数据可视化的框架（推荐使用蚂蚁前端的G6），G6是比较适合对象的可视化的，把Realm做一个可视化，然后来看看在一个JS的Realm里面究竟有多少对象，我们只需要去可视化JS的Realm。不需要把浏览器里面的这些对象也可视化出来。
























