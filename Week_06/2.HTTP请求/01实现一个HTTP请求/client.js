/*
 * @Author: your name
 * @Date: 2020-10-19 22:51:02
 * @LastEditTime: 2020-10-19 23:25:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_06\2.HTTP请求\01实现一个HTTP请求\index.js
 */

const net = require("net");

// Request的类 
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