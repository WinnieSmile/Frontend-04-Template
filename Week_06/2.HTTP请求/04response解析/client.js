/*
 * @Author: your name
 * @Date: 2021-01-06 23:28:58
 * @LastEditTime: 2021-01-09 22:52:00
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
                connection.write(this.toString());  
            }else{
                console.log('准备创建一个新的TCP连接')
                connection = net.createConnection({
                    host: this.host,   
                    port: this.port
                }, () => {
                    console.log('创建成功写入内容')
                    connection.write(this.toString());  
                })
            }
            // 监听connection的data
            connection.on('data', (data) => {
                console.log('写入的内容是：',data.toString());
                parser.receive(data.toString());  
                if(parser.isFinished){
                    resolve(parser.response);                  
                }
                connection.end();
            });
            // 如果遇到错误的话，就会reject整个Promise
            connection.on('error', (err) => {
                reject(err);
                connection.end();  
            })
        });
    }
       
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
    }
   
}

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