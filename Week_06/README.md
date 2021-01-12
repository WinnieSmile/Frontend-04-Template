<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2021-01-12 23:04:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_06\README.md
-->   
优秀总结及笔记：https://github.com/mxin-d/Frontend-04-Template/tree/master/Week_06    
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

## （一）状态机        
> 网上找了好多文章，都是摘录阮一峰大佬的这篇 js 与有限状态机 http://www.ruanyifeng.com/blog/2013/09/finite-state_machine_for_javascript.html     

> KMP+动归+有限状态机 https://zhuanlan.zhihu.com/p/83334559     

三个特征：
* 状态总数（state）是有限的。
* 任一时刻，只处在一种状态之中。
* 某种条件下，会从一种状态转变（transition）到另一种状态。    
<br>

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
**例1：在一个字符串中，找到字符 "a"**
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

**例2：在一个字符串中，找到字符 "ab"**  
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
**例3：在一个字符串中，找到字符"abcdef"**  
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
**例4：我们如何用状态机处理诸如 "abcabx"这样的字符串？（状态机处理重复字符串）**    
*（如果字符有对应的重复多个、或者是同一个字符要重复多个、或者是不同的字符都可以比如说a和b都可以。可以通过状态里面的 if else 来实现）*   
解析：因为abcabx中间存在着一个重复的问题，当我们遇到第一个abc走完，遇到第二个a、第二个b的时候，如果它不是x而是c的话，我们必须要把它当做下一个字符的abc开头来处理，如果是aby那么就又可以回到从头开始处理的逻辑，如果是aba，我们又要回到刚找到a的状态，所以这个地方就又需要用到 reConsume的技巧。整个状态机的逻辑，start函数逻辑没有变，foundA、foundB这个逻辑也都没有变，foundC之后我们会写一个foundA2的函数。 
```javascript
    function match(string){
        let state = start;  
        for(let c of string){
            state = state(c); 
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
            return start(c);   //使用reConsume的技巧return了一个start(c)
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
        if(c === "a"){
            return foundA2;  //foundA2函数，这是找到第二个a的状态
        }else {
            return start(c);
        }
    }

    function foundA2(c){
        if(c === "b"){
            return foundB2;  //foundA2 它的后边如果接的是一个b，它就会进入foundB2
        }else {
            return start(c);
        }
    }

    // foundB2：如果c它是x的话，直接进入end状态了，如果不是x，它还有可能是c如果也不是c，它还有可能是a所以我们要让它回到前面foundB的状态，由foundB状态再去处理一下，如果foundB状态处理完了之后，发现它也不是c，那么我们再让它回到 start状态，把c传给start，也就是说这个时候一次状态最多会经过三个状态函数的处理。
    function foundB2(c){
        if(c === "x"){
            return end;  
        }else {
            return foundB(c);
        }
    }

    
    console.log('是否找到字符串abcabcabx', match("abcabcabx"))  //true

```
额外内容：  
* 我们如何使用状态机处理诸如 "abcabx"这样的字符串？  
* 作业：使用状态机完成 "abababx" 的处理。   
* 可选作业：我们如何用状态机处理完全未知的 pattern ?  
如果pattern字符串是完全未知的，如何自动化的生成状态机里面的状态呢？
    * 参考资料：字符串KMP算法  
    （不要用循环的KMP算法，而是要用状态机的KMP算法去实现。）
    https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm

## （二）HTTP请求  
**一、HTTP的协议解析**     
**ISO-OSI七层网络模型**  
应用层  
表示层  
会话层  
传输层  
网络层  
数据链路层  
物理层   
**解析：**
物理层和数据链路层就是我们俗称的 4G 5G 或者是WiFi，这两层主要完成的目标时对数据的一个准确的传输，它传输都是点对点的传输，也就是必须要这两个东西有一个直接的连接它才能够进行传输。  
再往上就是非常著名的网络层，在网络层最流行的协议就是 Internet（因特网），平时我们说的上网包含两层意思：一层是在我们网页所在的应用层的协议，这个网叫外网，在它底层负责数据传输的东西叫做 Internet，平时说上网不会特别区分它们。Web的全称是World Wide Web，它的正式的中文翻译叫万维网。而底层的Internet其实叫做因特网。还有一个网络的类型是公司内网叫Intranet。网络层可以认为它指的就是 Internet层。Internet协议就是我们俗称的IP协议（Internet Protocol），在Internet之上就涉及到各种传输协议，其中最著名的就是 TCP和UDP，因为网页是需要可靠传输，所以我们只关心TCP，再往上就是会话层、表示层、应用层，基本在大部分的应用里边都是混着不分的。对于HTTP来说也差不多，HTTP一层它就包含了会话表示和应用所有的基础设施。对应到node的代码里就是：TCP层对应的是一个包，require("net"); 而HTTP层对应的一个包就是 require("http")。   
要想实现一个HTTP协议，肯定是不能去引这个http包，做 toy browser就是为了了解浏览器的工作原理。如果用了http这个包，就没法了解浏览器原理，因为它直接就帮我们把 HTTP请求的事都做完了。所以要从底层去做，就是去 require("net")这一层，然后去完成 HTTP请求和HTTP回应解析。
**TCP与IP的一些基础知识** 
**TCP**
* 流  
* 包  
* 端口
* IP地址  
* require('net');  
* libnet / libpcap  
在TCP层传输数据的概念是流（例如水流、物流），流它是一个没有明显分割单位的一种东西。TCP协议的传输概念也是这样，它没有一个明显的分割单位，它只保证前后的顺序是正确的，而TCP对应的一个非常重要的概念叫做端口，因为TCP协议是被计算机里面的软件所使用的，而每一个软件都会去从网卡去拿数据，具体哪一个数据是分配给哪一个软件呢，这个就需要用到端口这个概念，一个计算机的网卡是根据端口把接到的数据包分给各个应用的。然后对应到 node里面，它所依赖的库就是 require('net')包。而TCP它的传输的概念就是一个一个的数据包的概念，每一个数据包它也是可大可小，这取决于整个网络中间设备的传输的能力。而IP它是根据地址去找到这个包应该从哪到哪。在整个Internet上的连接非常负责，中间就会有一些大型的路由节点，像我们平时家里上网，它一般会先连到小区的节点，然后再上行到电信的骨干网络上去，然后再逐级比如说我们要到国际上的某个地址，我们就会去到国际的主干线上去，国内的地址它可能直接就给他们转过去了。Internet是一个非常负责的东西，而IP地址就是唯一的标识了，连入Internet的每一个设备。    
IP包一定是以IP地址来寻找自己要传输到哪里的。对应IP协议的一些底层库，在node里是没有的，但是node底层它肯定要调到 C++ 的这两个库，一个叫做 libnet，一个叫做 labpcap，libnet负责构造IP包并且发送，而labpcap负责从网卡抓所有的流经你的网卡的IP包。如果我们用交换机而不是路由器去组网，会发现一些有意思的现象；如果用底层labpcap的包，就能抓到很多本来不属于发给你的IP地址。实际上在我们正常的逻辑里，网卡就会把这些包都给丢去，但是如果你用的是IP层的一个基础库，你就都能够把它抓出来，这个也是我们很多特殊的IP协议的处理所需要用到的技术。  
**HTTP**
* Request
* Response   
HTTP是由Request和Response这样的过程组成的，相当于TCP这种全双工通道。（全双工就是你可以给我发，我也可以给你发，不存在什么优先关系）HTTP必须先由客户端发起一个 request，然后服务端回来一个 response，所以每一个request它一定对应着一个response，如果这个response多了，或者request多了，都说明这个协议出错，它在TCP的基础上看似做了更严格更死的规定，但是其实在实践过程中发现这种模式还挺好，所以HTTP到今天已经变成了互联网上最流行的一个协议。  

**二、服务端环境搭建**
```javascript
    const http = require('http');

    http.createServer((request, response) => {
        let body = [];
        request.on('error', (err)=>{
            console.err(err);
        }).on('data', (chunk)=>{
            body.push(chunk.toString());
        }).on('end', ()=>{
            // body = Buffer.concat(body).toString();
            console.log('body：', body);
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(' Hello World\n ');
        })
    }).listen(8088);

    console.log('server staeted');

```

通过require一个http的包，然后调用 http 的createServer，然后按照它的格式在这个里面，我们去接收它的 request 里面的内容，然后request需要接受一个 on error、on data、on end ，三个不同的这样的事件。
on error打印出来， on data 把这个数据暂存到一个body的数组中，然后把body去做一次concat，然后把这个数组里的内容拼起来，然后我们这地方加了一个console log 方便去解析。由于我们并不需要去根据request去处理什么东西，所以我们这里写死一个response的值，我们写一个head、写一个end就可以了。我们至少需要写一个 'Content-Type': 'text/html'，body部分随便写一份HTML代码（此处写的是 Hello World ）  
**三、实现一个HTTP的请求**    
**（1）步骤一：**
```javascript
const net = require("net");

class Request {
    // 把options里传进来的数据稍做处理，并且补全了 Content-Type 、 Content-Length
    constructor(options){
        this.method = options.method || "GET";  //比如说 method 默认值是GET，
        this.host = options.host;         //host没有办法给默认值，
        this.port = options.port || 80;   //port默认是80，因为HTTP协议的默认端口是80，
        this.path = options.path || "/";  //path的话默认斜杠，
        this.body = options.body || {};   //body默认就是个空对象。
        this.headers = options.headers || {};   //headers创建的是一个新对象。
        if(!this.headers["Content-Type"]){
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        // body需要解析，这里是2种最简单的编码格式，其实大概有4种比较常用的编码格式.
        if(this.headers["Content-Type"] === "application/json"){
            this.bodyText = JSON.stringify(this.body);
        }else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded"){
            // 使用 & 分隔，等号左边是key右边是value。等号的右边的值是需要经过 encodeURIComponent 的操作
            // 简单的HTTP的保存
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }

        // headers是必要的，这个headers不建议设计成从外边传的，它一定是从body的text里面取一个length出来。如果headers传的不对的话会是HTTP的一个非法请求。
        this.headers["Content-Length"] = this.bodyText.length;
    }
    
    // send 方法中会去 return 一个 new Promise，我们要存的是 method，需要给它一个默认值。
    send(){
        return new Promise((resolve, reject) => {
            // ……
        });
    }
}

void async function(){
    let request = new Request({   //创建一个http请求的时候，会传一个config object进去，
        method: "POST",           //method，HTTP协议要求
        host: "127.0.0.1",        //host属性，来自IP层
        port: "8088",             //port属性，来自TCP层
        path: "/",                //path路径，HTTP协议要求
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: "winter"
        }
    });
    
    let response = await request.send();  //然后当请求结束时请求会调用一个send方法，send方法会返回一个 promise，promise成功之后它就会得到一个response对象。

    console.log('响应',response);

}();
```
**总结：**   第一步 HTTP请求 
* 设计一个HTTP请求的类   
* content type 是一个必要的字段，要有默认值   
* HTTP请求的body是一种 kv 的格式  
* 不同的 Content-Type 影响body的格式；还会有 Content-Length

**补充：HTTP协议**
```javascript
    POST/HTTP/1.1                                   //Request line
    Host:127.0.0.1                                  //headers
    Content-Type:application/x-www-from-urlencoded  //headers

    field1=aaa&code=x%3D1                           //body
```

HTTP协议是一个叫做文本型的协议，文本型协议一般来说我们是跟二进制型的协议相对的，文本型协议就意味着说这个协议里面
所有的内容都是字符串，它的每一个字节都会被理解成字符串的一部分，比如说要传个1，不是说把这个bite给它传过去，也不会把1放到一个字节里面去传过去，而是会用一个字符1，也就是 Unicode或者 ASCII 编码里面的值，而 HTTP 协议正是这样一种文本型的协议。所以因为 HTTP 协议是在TCP协议的上层，所以说流淌在TCP协议的流里面的所有的内容都可以视为字符。  

HTTP协议的request 第一行叫做 request line， request line又包含三个部分，第一个部分叫做 method，method 最常见的是 POST和 GET，HTTP还规定了其他的method，比如说 options等。  

它第二项就是一个路径是 path ，path默认它就是一个斜杠，在访问浏览器的时候也可以看到在域名后面的斜杠后面的内容是路径。这个是作为HTTP协议的一个内容被放上去的，最后是一个 HTTP和HTTP版本，此处用的是老的版本1.1。实际上HTTP协议已经有2.0 3.0这些新版本了。  
后边的部分是headers，它包含多行的，它会每一行是以一个冒号分隔的 key 和 value 这样的一个键值对的结构。headers行数不固定，headers的结束是一个空行为标志进行结束的。  

后边的是body部分，body部分是由 Content-Type 来决定的。Content-Type规定了什么格式，那么body就用什么格式来写，总体上可以认为body也是一个kv的结构，但是视 Content-Type 不同，它里面的不同的会用不同的分隔的字符和不同的格式。然后所有HTTP里面的换行按照规定都是 \r \n ，它是两个字符组成的一个换行符。这也是一个比较容易去解析错的地方。

**（2）步骤二：send 函数的编写，了解 response 格式**    
接收到信息，我们开始进入到第二步，send函数的编写，因为它是一个 Promise的形式，所以在send的过程中，会逐步的收到response，直到最后把response构造好之后，再去让Promise得到resolve，因为这个过程它是会逐步的收到信息的，所以有必要去设计一个response parser，而不是直接设计一个response类，这样，parser可以通过逐步地去接收response信息，然后来构造response的对象的各个不同部分。
```javascript
const net = require("net");

// Request的类 
class Request {
    
    constructor(options){
        this.method = options.method || "GET";  
        this.host = options.host;         
        this.port = options.port || 80;   
        this.path = options.path || "/";  
        this.body = options.body || {};   
        this.headers = options.headers || {};   
        if(!this.headers["Content-Type"]){
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        if(this.headers["Content-Type"] === "application/json"){
            this.bodyText = JSON.stringify(this.body);
        }else if(this.headers["Content-Type"] === "application/x-www-form-urlencoded"){
            
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }

        this.headers["Content-Length"] = this.bodyText.length;
    }
    
    // 编写send函数
    send(){
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser;  //重点：创建 ResponseParser 这样的类
            resolve("");
        });
    }
   
}

// ResponseParser 是逐步地去接收response的文本，并且进行分析。
class ResponseParser{
    constructor(){

    }
    // 设计receive这样的接口，会接收一个字符串。像状态机那样对字符串逐个地进行处理。
    receive(string){
        for(let i = 0; i<string.length; i++){
            this.receiveChar(string.charAt(i));
        }
    }
    // receiveChar里边是状态机的代码
    receiveChar(char){

    }
}

void async function(){
    let request = new Request({   
        method: "POST",           
        host: "127.0.0.1",       
        port: "8088",             
        path: "/",                
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: "winter"
        }
    });
    
    let response = await request.send();  

    console.log('响应',response);

}();
```
总结：第二步 send函数总结   
* 在Request的构造器中收集必要的信息  
* 设计一个send函数，把请求真实发送到服务器   
* send函数应该是异步的，所以返回 Promise 

**补充：了解response格式**    
response格式如下
<table border>
    <tr>
        <th>response格式结构</th>
        <th>表示含义</th>
    </tr>
    <tr>
        <td>HTTP/1.1 200 OK</td>
        <td>表示 status line 部分</td>
    </tr>
    <tr>
        <td>
            Content-Type:text/html<br> 
             Date:Mon, 23 Dec 2019 06:46:19 GMT<br>
            Connection:keep-alive<br>
            Transfer-Encoding:chunked<br>
        </td>
        <td>表示 headers 部分</td>
    </tr>
    <tr>
        <td></td>  
        <td>表示 空行分隔</td>     
    </tr>
    <tr>
        <td>
            26<br>
            &lthtml>&ltbody>Hello World&lt/body>&lt/html><br>
            0
        </td> 
        <td>表示 body 部分</td>      
    </tr>
</table>
解释：   

**HTTP/1.1 200 OK**：返回status line，包含三个部分，与request line正好相反。开头是HTTP的版本号，第二部分是一个数字（HTTP的状态码），第三部分是HTTP的状态文本。第一部分相当于一个固定的字符串，没有什么用处，但是HTTP状态码是一个非常重要的知识点。   
500 服务器内部错误；404 找不到网页；301 302 304 200     
**header部分**：HTML的Request和Response都是包含 header 的，它的格式与request是完全一样的。    
**空行分隔**   
**body部分**：由content type决定，有一种比较典型的格式是 chunked body，chunked body 先由一个十六进制的数字单独占一行，后面跟着内容部分，再后面又有一个十六进制的数字，直到最后一个十六进制的0跟十进制的0是同一个0，那么它最后会得到空的 chunk，这个0之后就是整个的body的结尾。因为body里面是允许任何字符的，所以说它会用这种方式来切分body的内容，任何的特殊字符都不能够分隔response的body。      
   
**（3）步骤三：发送请求**        
目标是补全send里面的代码。      
主要代码
```javascript
// 发送请求
send(connection){
    return new Promise((resolve, reject) => {
        const parser = new ResponseParser;  
        if(connection){
            connection.write(this.toString());
        }else{
            connection = net.createConnection({
                host: this.host,
                port: this.port
            }, () => {
                connection.write(this.toString());
            })
        }
        connection.on('data', (data) => {
            console.log(data.toString());
            parser.receive(data.toString());
            if(parser.isFinished){
                resolve(parser.response);
                connection.end();
            }
        });
        connection.on('error', (err) => {
            reject(err);
            connection.end();
        })
        // resolve("");
    });
}

toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
    }
```
总结：第三步 发送请求   
* 设计支持已有的 connection 或者自己新建 connection   
* 收到数据传给 parser   
* 根据 parser 的状态 resolve Promise

**（4）步骤四：response 解析：设计状态机**     
主要代码
```javascript
/**
 * 状态机有很多不同种写法：此处采用常量，用if做区分的方法。从性能的角度和从代码的管理的角度，不如前面用的函数的方法。
 * statusLine 会以 \r\n 结束，\r\n会是两个状态，WAITING_STATUS_LINE的状态，当它接收到一个\r的时候，并不会切到WAITING_HEADER的状态，它会再等一个line end的符号，所以它会产生两个状态。
 * header 会有一个header name 的输入状态，header name的冒号后面等待空格的状态，和一个header value的状态以及同样道理的header line end的状态，所以说每一个header会有四个状态，
 * 最后会有 block end的状态。因为header之后我们要再等一个空行。
 * 再往后就是body的状态，因为body的状态不固定，所以我们没办法在同一个 response parser里面把这个代码解决掉
 */

// 设计状态机
class ResponseParser{
    constructor(){
        this.WAITING_STATUS_LINE = 0;   
        this.WAITING_STATUS_LINE_END = 1;
        this.WAITING_STATUS_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WAITING_HEADER_VALUE = 4;
        this.WAITING_HEADER_LINE_END = 5;
        this.WAITING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;

        // 存储解析过程中产生的结果
        this.current = this.WAITING_STATUS_LINE;  //一开始会把它置为初始状态
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;
    }

    /**
     * receive的过程会把一个一个字符传给receiveChar
     */
    receive(string){
        for(let i = 0; i<string.length; i++){
            this.receiveChar(string.charAt(i));
        }
    }
    receiveChar(char){
        if(this.current === this.WAITING_STATUS_LINE){
            if(char === '\r'){
                this.current = this.WAITING_STATUS_LINE_END;
            } else {
                this.statusLine += char;
            }
        } else if(this.current === this.WAITING_STATUS_LINE_END){
            if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if(this.current === this.WAITING_HEADER_NAME){
            if(char === ':'){
                this.current = this.WAITING_HEADER_SPACE;
            } else if(char === '\r'){  //说明这一行是个空行
                this.current = this.WAITING_HEADER_BLOCK_END;  //进入到header_block状态
            } else{
                this.headerName += char;
            }               
        } else if(this.current === this.WAITING_HEADER_SPACE){ //header_space是个临时状态，因为冒号后边必须由空格来分割header的kv（key:value）  
            if(char === ' '){
                this.current = this.WAITING_HEADER_VALUE;
            }
        } else if(this.current === this.WAITING_HEADER_VALUE){  //如果等到了空格就会进入到 header value
            if(char === '\r'){  // 死等\r
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue; //如果value确定，等到\r的话，我们会把暂存的headerName和headerValue写到headers上面，上面是一个kv的写法。
                this.headerName = "";
                this.headerValue = "";
            }else {
                this.headerValue += char;
            }
        } else if(this.current === this.WAITING_HEADER_LINE_END){  //header_line_end 死等一个回车
            if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME; 
            }
        }else if(this.current === this.WAITING_HEADER_BLOCK_END){  //header_block也是死等回车
            if(char === '\n'){
                this.current = this.WAITING_BODY;
            }
        }else if(this.current === this.WAITING_BODY){
            console.log('char',char)  //waiting_body下边的代码还没有写完
        }
    }
}
```
总结：第四步 ResponseParser 总结 
* ResponseParser 必须分段构造，所以我们需要用一个ResponseParser来 “装配”
* ResponseParser 分段处理 ResponseText，我们用状态机来分析文本的结构   

**（5）步骤五：如何去处理ResponseParser的body**     
主要代码：
```javascript
/**
 * trunkedBody的结构是：一个长度后面跟着一个Trunk的内容，这个称为一个trunked。
 * 遇到一个长度为0的trunk，那么整个body就结束了，所以会规定一个waiting_length和一个waiting_length_line_end两个状态，然后来处理长度这样的号。
 */
class TrunkedBodyParser {
    constructor(){
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;  //reading_trunk的状态，要想退出reading_trunk的状态，我们是必须要去等待这个长度，必须要去计算Trunk里面的长度的，所以严格来说，这个东西已经不是一个严格的米粒状态机了。但是这样仍然是一个可以跑起来的这样的状态机。
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.length = 0;
        this.content = [];
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;
    }
    receiveChar(char){
        if(this.current === this.WAITING_LENGTH){
            /**
             * 找到/r的时候，说明已经读到一个length，这个时候如果length等于0，说明我们遇到一个长度为0的Trunk；
             * 此时会给 this.isFinished 的状态置为true，来告诉上级的parser，说明此时已经结束了；
             * 否则我们就会给它切换到 waiting_length_line_end 的状态。
             * 
             * 如果说在读length的过程中，因为length是个十六进制，所以要给原来的值乘以16，最后一位空出来，然后再把最后读进来的一位给它加上去。
             * 用 parseInt(char,16) 就可以了。
             */
            if(char === '\r'){  
                if(this.length === 0){
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;              
            }else {
                this.length *= 16;
                this.length += parseInt(char, 16);
            }
        }else if(this.current === this.WAITING_LENGTH_LINE_END){
            // console.log("WAITING_LENGTH_LINE_END");           
            if(char === '\n'){
                this.current = this.READING_TRUNK;
            }
        }else if(this.current === this.READING_TRUNK){
            this.content.push(char);  //Trunk里边的字符存起来，
            this.length --;  //然后我们就会给length减掉；
            if(this.length === 0){
                //如果length变成0的话，就会直接给它一个切换。
                this.current = this.WAITING_NEW_LINE;
            }
        }else if(this.current === this.WAITING_NEW_LINE){
            if(char === '\r'){
                this.current = this.WAITING_NEW_LINE_END;
            }
        }else if(this.current === this.WAITING_NEW_LINE_END){
            if(char === '\n'){
                this.current = this.WAITING_LENGTH;
            }
        }
    }
}
```
总结：第五步 BodyParser 总结 
* Response 的body可能根据 Content-Type有不同的结构，因此我们会采用子Parser的结构来解决问题。
* 以TrunkedBodyParser为例，我们同样用状态机来处理body的格式。






