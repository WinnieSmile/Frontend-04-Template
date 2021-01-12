/*
 * @Author: your name
 * @Date: 2021-01-06 23:28:58
 * @LastEditTime: 2021-01-07 23:40:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_06\2.HTTP请求\03发送请求\client.js
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
    
    // 发送请求
    send(connection){
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser();  
            if(connection){
                connection.write(this.toString());  //检查connection，如果存在connection的话，把自己的toString write上去，把我们收集到的信息按照前面讲的request的格式写进去，给它发送出去。
            }else{
                // 如果参数没有传的话，通过 createConnection 创建一个新的TCP连接，
                console.log('准备创建一个新的TCP连接')
                connection = net.createConnection({
                    host: this.host,    //host和port都是根据在构造函数里面收到的内容
                    port: this.port
                }, () => {
                    console.log('创建成功写入内容')
                    connection.write(this.toString());  //如果创建成功了，这是createConnection的回调，把自己的内容写进去
                })
            }
            // 监听connection的data，
            connection.on('data', (data) => {
                console.log('写入的内容是：',data.toString());
                parser.receive(data.toString());  //把data.toString()传给parser
                if(parser.isFinished){
                    resolve(parser.response);  //如果parser已经结束的话，会执行 resolve，把整个Promise结束掉。                   
                }
                // console.log(parser.headers);
                connection.end();
            });
            // 如果遇到错误的话，就会reject整个Promise
            connection.on('error', (err) => {
                reject(err);
                connection.end();  // 把connection关掉，防止明明已经出错，还占着连接的这种情况
            })
        });
    }
    

    /** toString()函数的意义
     * 第一行 ${this.method} ${this.path} HTTP/1.1 跟request的模型是一样的;
     * 每个header是一行，给\r\n这样的分隔符来做join，与前面处理header的方法差不多，会调一次 Object.keys，然后把header的所有的key给取出来，然后做一次map，map到一个字符串，`${key}: ${this.headers[key]}` 是一个字符串模板，是由冒号分隔的，左边是key，右边是value，这样第二部分就发送出去了。
     * 两个空白行
     * 最后把bodyText发送出去。
    */
   
    /** toString()函数的意义
     * 构造HTTP请求文本
     * header每一行都是用\r\n来分隔的
     * body和header之间有一个空行, 故为\r\r
     * 多行字符串一定要注意格式，不能有任何多余的空白，不然就会请求失败
     * @return {string}
     */
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
    }
   
}


class ResponseParser{
    constructor(){

    }

    receive(string){
        for(let i = 0; i<string.length; i++){
            this.receiveChar(string.charAt(i));
        }
    }

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