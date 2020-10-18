<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2020-10-18 19:46:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_06\README.md
-->
# 浏览器工作原理
## 浏览器工作原理总论    
玩具浏览器：Toy-Browser   
浏览器是由以下 5 个步骤完成整体渲染。  
当我们在打开浏览器想要去浏览一个网页的时候，   
手敲URL，最后用眼睛看到的是一张图片。  
实际上，计算机中最终显示在屏幕上的它一定是一个图片的形式，用计算机的术语讲就是 Bitmap，只有这个东西最后传给我们显卡驱动设备，它才能转换成我们人眼可识别是光信号，所以浏览器所有的目标就是从一个 URL 最后得到一张 Bitmap，这个过程是一个浏览器的基础的渲染过程。  
Toy-Browser   
现代浏览器还包括一些功能性东西。比如说收藏、历史。Toy-Browser 是为了帮助我们理解浏览器的工作原理。    
整个浏览器的一张完整的架构图： 
`URL` → HTTP → `HTML` → parse → `DOM` → css computing → `DOM with CSS` → layout → `DOM with position` → render → `Bitmap`    
URL部分，首先是会经过一个HTTP请求和解析HTTP回应的这样的一个过程，把URL里面包含的HTML给取出来，然后对文本的HTML进行 parse，这个就是一个一般的文本分析或者说是编译的一个初级的技术，把HTML变成我们所熟悉的Dom树，有了Dom树以后，它是一棵光秃秃的Dom树，上面除了HTML本身包含的信息什么都没有，所以下一个步骤就需要进行 CSS computing，对这个Dom树上对应着哪些 CSS 规则，哪些 CSS规则会发生叠加，会发生覆盖，把最终的结果给它计算出来，这就是  Css computing ，计算完了之后，就会得到一棵带 CSS 属性的 Dom树（带样式的 Dom）,CSS全称叫做 级联样式表，级联样式表是不可能待在 Dom树上的。有了CSS属性，就可以进行 layout（布局、排版），最终把这棵 Dom树上面的所有元素产生的盒的位置计算出来（获得位置不是Dom本身，而是CSS最后生成的核）。有了Dom position 之后，就可以进行渲染render。通过render就可以把Dom树该有背景图的有背景图，该有背景色的有背景色，最后把它画到一张图片上。然后就可以通过操作系统和硬件驱动提供的 API 接口，最终展示出来。   
## 状态机   
有限状态机处理字符串     
（处理字符串是整个 browser 里面贯穿始终的这样的技巧。）   
* 每一个状态都是一个机器 
    * 在每一个机器里，我们可以做计算、存储、输出……
    * 所有的这些机器接受的输入是一致的
    * 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）
* 每一个机器知道下一个状态  
    * 每个机器都有确定的下一个状态（Moore）
    * 每个机器根据输入决定下一个状态（Mealy）

解释：用有限状态机处理编程问题，就是因为有限状态机里的每个机器都是相互解耦的，正因为这种每个状态是一个独立的机器的这样的思想，让我们的有限状态机变成了一个非常强有力的抽象机制，在有限状态机的每一个机器里，我们都可以做计算、存储、输出。这就意味着我们编写状态机的代码的时候，我们可以完全忽略其他状态机里面的逻辑，只关心本状态需要处理什么问题。比如说我们的状态机有一个广泛的应用就是在游戏里，经常用于敌人的 AI，当主角不跑进敌人的注意范围的时候，敌人是不启动的这个时候我们就完全可以用状态机来区分攻击状态和等待状态，在等待状态敌人只需要关心主角是走进我的攻击范围这样一件事就可以了；而在攻击状态，则需要关心更多的，比如说主角是否已经跑得足够远，主角是否仍然有技能在打他等等这样的一些逻辑。这样在静止状态的敌人他的状态非常容易编写，它运行起来消耗资源也非常少，这正是状态机能够为我们简化的逻辑。  
状态机里面有一个特点：既然每个机器都代表一个状态，所以说这些机器它所接受的输入是完全一致的。我们不能说这个状态它能接受一个字符串，哪个状态能接受一个整数，这样是不行的。要么就都接受字符串，要么就都接受整数，也可以选择让两个状态都变成既能接受整数又能接受字符串。  
状态机还有一个特点：状态机的每个机器本身是不能再有状态的，如果用函数来表示的话，状态机里的所有的这些函数是纯函数，它不能有副作用；如果是针对其他的，比如说我们去输出、改变变量，这个不属于副作用，这里指的副作用是指这个机器它不应该再受外部的输入控制，输出是可以的。所以状态机里面，如果用函数来表示状态机的每一个机器的时候，可以往外写，但是不能从外边再读变量进来了，一旦读了，再影响了这个状态机本身的状态切换逻辑，它就会出现很大的问题。    
状态机的另一个特点，就是每一个机器它都必须知道自己的下一个状态是什么。在经典的有限状态机的理论里有两种状态机，一种是 Moore 状态机，Moore状态机是一种简单的状态机，每一个机器它都有确定的下一个状态，也就是说我从状态 a 不管接受什么样的输出，它一定可以进到状态 b，状态 b 不管接受什么样的输入，它一定会进入下一个状态 c ，以此类推。它也是可以有循环的，比如说状态 c 可以回过来回到状态 b 或者状态 a 。不论如何，这个状态回到哪，是由程序员在编写状态机的代码时就已经决定好了的，而不是受它的输入影响可以做分支的。这种状态机叫做 Moore 型状态机。   
如果每个机器他是根据输入决定下一个状态，这种状态机就叫做 Mealy型的状态机。Mealy型的状态机是大多数时候比较实用的一种状态机。他接受不同的输入，就可以进入到不同的下一个状态中，这种强大带来了一定的代码的复杂性，但是同时也带来了非常强的表达能力。  

状态机具体会在 JS 中会怎样实现？  
js中如何实现 Mealy型的有限状态机  
状态函数：接受input返回下一个状态。  
在js中，状态机一个理想的实现方式就是一系列返回状态函数的这样的一批状态函数，在调用的时候，我们往往会用一个循环来获取输入，通过state = state(input)这样的一种调用方式来让状态机接受输入并且完成状态切换。这样state变量就是永远表示当前状态，不管你用什么方法获取了一个input之后，它就会发生一个状态迁移，并且完成每个状态中所需要完成的计算。Mealy型状态机只有 return 几乎一定是根据 input在一系列的 if else或者 switch case里面。   
如果是Moore型状态机，return跟input无关，它就是返回一个固定的状态。

```javascript  
// 每一个函数是一个状态
function state(input){  // 函数参数就是输入
    // 在函数中，可以自由地编写代码，处理每个状态的逻辑
    return next;   //返回值作为下一个状态，意味着下一个返回值一定是一个函数，这个函数还必须得是一个状态函数  
}

// ------  以下是调用   ------
while(input){
    // 获取输入
    state = state(input);   // 把状态机的返回值作为下一个状态
}

```

### 使用有限状态机处理字符串  
代码实例：
**在一个字符串中，找到字符 "a"**
```javascript
    function match(string){
        for(let c of string){
            if(c == "a"){
                return true
            }
        }
        return false;
    }
    match("I am groot");  //true
```
这个算法是一个 O(n)的算法，就是假设字符串的长度是 n，那么我们的算法它时间会跟 n 成正比的。  
另外写法：用for循环、用chartAt去找字符 a   

**在一个字符串中，找到字符 "ab"**  
要求：不能使用正则表达式。（正则表达式大部分是可以用有限状态机去实现的，这里是在用一个比正则表达式更底层的东西。不用更高级的正则表达式）展示有限状态机是怎样去处理字符串的。  
```javascript
    function match(string){
        let foundA = false;  //定义是找到某个字符串则置为true
        for(let c of string){
            if(c == "a"){
                foundA = true;
            }else if(foundA && c == "b"){
                return true;
            }else {
                foundA = false;
            }
        }
        return false;
    }
    console.log('是否找到ab', match("I acbm groot"))  //false
    console.log('是否找到ab', match("I abm groot"))   //true
```
**在一个字符串中，找到字符"abcdef"**  
非状态机版本的代码：  
```javascript
    function match(string){
        let foundA = false;
        let foundB = false;
        let foundC = false;
        let foundD = false;
        let foundE = false;
        for(let c of string){
            if(c == "a"){
                foundA = true;  //第一个字符串的时候foundA置为true
            }else if(foundA && c == "b"){
                foundB = true;  //找到b的时候，将foundB置为ture
            }else if(foundB && c == "c"){
                foundC = true;
            }else if(foundC && c == "d"){
                foundD = true;
            }else if(foundD && c == "e"){
                foundE = true;
            }else if(foundE && c == "f"){
                return true;
            }else {
                // 没找到的情况下置为false
                foundA = false;  
                foundB = false;
                foundC = false;
                foundD = false;
                foundE = false;
            }
        }
        return false;
    }
    console.log('是否找到字符串abcdef', match("I mabcdefgroot"));   //true

```
状态机版本的代码：  
实现思路：找到字符a之前跟找到字符a之后，在for循环里面的逻辑是完全不一样的，所以我们可以考虑，每找到一个我们要的目标字符，我们就会去切换一个状态，状态机是非常适合处理这个逻辑的。  
在js中使用状态机的非常好的一个方式是使用函数。
```javascript
    function match(string){
        let state = start;  //定义一个变量state来表示状态机的当前状态。初始值start，start是一个函数
        for(let c of string){
            state = state(c); //在循环里面不断地让状态机去接受一个字符c，并且让它进行状态切换。 state(c)里边返回另一个函数就是它的下一个状态。state(c)里面就可以让状态机去进行一些计算完成逻辑。
        }
        return state === end;
    }

    function start(c){
        if(c === "a"){
            return foundA;  
        }else {
            return start;
        }
    }

    function end(c){
        return end;
    }

    function foundA(c){
        if(c === "b"){
            return foundB;
        }else {
            return start(c); //当这个状态退出的时候，仍然想把这个字符交给下一个状态去处理的话，在这里就加上一个c，也就是把return start 变为 return start(c) 。 这个行为在状态机里可以叫做 reConsume 相当于重新使用的逻辑。
        }
    }

    function foundB(c){
        if(c === "c"){
            return foundC;
        }else{
            return start(c);  
        }
    }

    function foundC(c){
        if(c === "d"){
            return foundD;
        }else {
            return start(c);
        }
    }

    function foundD(c){
        if(c === "e"){
            return foundE;
        }else {
            return start(c);
        }
    }

    function foundE(c){
        if(c === "f"){
            return end;
        }else{
            return start(c);
        }
    }
    console.log('是否找到字符串abcdef', match("I mabcdefgroot"))  //true
    console.log('是否找到字符串abcdef', match("I mabcdgroot"))    //false

```
解释：
start函数： 
找到c为a的话就切换到下一个状态，就是foundA，否则状态不变就返回自身。当我们找到foundA以后，在foundA的状态里面就集中精力去找b，一旦找到b，我们就切换到状态foundB，这个时候foundA和foundB就已经不是布尔型变量了。它是一个状态函数。以此类推foundA foundB，foundA状态找b切换到foundB，foundB状态下找c去切换到foundC，以此类推，一直到foundE的时候我们会返回一个end状态。end状态就是一个结束状态。结束状态就标志着我们已经找到了我们想找的字符。小技巧：让end状态永远返回end，这个状态叫做一个 trap,就是一个陷阱，一旦进入了end的状态它就不会再进入到别的状态了。 当找到了字符串abcd之后，不管后面进来了多少个字符，其实它都是一个已经找到的状态。，这样我们就把他的状态控制在end里，这样返回值就可以用state等于end来判断它是不是已经找到了我们所有的状态。  
**我们如何用状态机处理诸如 "abcabx"这样的字符串？** 
