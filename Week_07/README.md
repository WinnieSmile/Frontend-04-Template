<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2021-01-18 22:08:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_07\README.md
-->
# HTML解析    
HTML parse模块的文件拆分   
从一个URL变成一个HTTP请求，然后拿到了它的 response，并且对它进行了一些初步的解析，可以得到 response里面的body。
## 第一步：文件的拆分   
要想实现一个parser，首相想象一下它是怎么用的，所以会先在client.js里写它的调用的部分。
主要代码： 
client.js 文件  
```javascript
const parser = require("net");  //把parser单独放到一个文件里，即require一个parser.js文件


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
    
    let response = await request.send();  //从一个request得到一个response。

    /**
     * 把API设计成：完整的得到response之后，然后再对parser进行处理，把这个body交给parser去处理。
     * 实际上如果写真正的浏览器的话，需要逐段的返回response body的，然后逐段的去给 parser。
     * 这里采用的办法是：把body全收回来，然后再交给HTML parser的这样的操作。实际上是应该做成异步分段处理的。
     */
    let dom = parser.parseHTML(response.body); //把HTML得到了以后，把它通过parser的parserHTML方法把它变成一个DOM树。

}();
```
parser.js 文件
```javascript
module.exports.parserHTML = function parseHTML(html){
    console.log(html);
}
```
总结：第一步总结
* 为了方便文件管理，我们把parser单独拆到文件中   
* parser接受HTML文本作为参数，返回一棵DOM树   
 
## 第二步 用FSM实现HTML的分析    
解析HTML这种文本类的操作，一定会用到状态机，HTML文本的解析也不例外，所以第二步首先我们要创建一个状态机，但是在创建状态机之前我们首先要知道HTML的语法。   

**HTML标准：html.spec.whatwg.org/multipage/**     

在标准中找到 **Tokenization** （13.2.5章节，有可能版本不对） 讲HTML词法的这一章。它整个的描述方式完全就是一台状态机。    
在HTML标准里面一共有80个状态，但是大部分的状态不需要用到。    

第二步总结：     
* 我们用FSM来实现HTML的分析   
* 在HTML标准中，已经规定了HTML的状态   
* Toy-Browser至挑选其中一部分状态，完成一个最简版本   

## 第三步 解析标签    
把状态机里边的状态写出来，尝试把HTML里面的所有的tag做一个解析，HTML里面的tag有三种：    
* 开始标签
* 结束标签
* 自封闭标签

总结：
* 主要的标签有：开始标签、结束标签、自封闭标签
* 在这一步我们暂时忽略属性
    

## 第四步骤
状态机最大的作用是在每一个状态里可以做一些计算，如何通过状态机里面的每一个状态在里面适当的位置插入我们自己的计算逻辑，然后来求出我们想要的token。     
总结：    
* 在状态机中，除了状态迁移，我们还会要加入业务逻辑（在parser的代码里边，业务逻辑就是创建token，然后把字符加到token上，最后emit token）
* 在标签的结束状态就会提交标签token，注意：不是在结束标签才提交整个的token，开始标签和结束标签在词法的角度来讲是两个不同的token，中间是一堆文本节点，还没有构建树结构。