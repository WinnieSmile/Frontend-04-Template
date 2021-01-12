/*
 * @Author: your name
 * @Date: 2021-01-06 20:42:08
 * @LastEditTime: 2021-01-06 20:56:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_06\2.HTTP请求\02编写send函数\client.js
 */
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