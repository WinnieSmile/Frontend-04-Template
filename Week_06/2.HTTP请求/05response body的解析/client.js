/*
 * @Author: your name
 * @Date: 2021-01-06 23:28:58
 * @LastEditTime: 2021-01-12 22:57:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_06\2.HTTP请求\03发送请求\client.js
 */
const net = require("net");
const { threadId } = require("worker_threads");

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
        this.current = this.WAITING_STATUS_LINE;  
        this.statusLine = "";
        this.headers = {};
        this.headerName = "";
        this.headerValue = "";
        this.bodyParser = null;  // 添加一个bodyParser的变量
    }

    get isFinished(){
        return this.bodyParser && this.bodyParser.isFinished;
    }
    get response(){
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }

    /**
     * 对response body的解析：总体思路：
     *      1.当找到WAITING_BODY 状态的时候，我们就把 character 塞给 bodyParser 去处理，接下来就需要去创建 bodyParser 和定义一个 bodyParser
     *      2.因为body的状态是一个非常奇特的一个设计，它跟head的相关，所以我们没有办法在一开始创建 ResponseParser的时候就直接创建好 bodyParser 
     * @param {bodyParser} string 
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
            } else if(char === '\r'){  
                this.current = this.WAITING_HEADER_BLOCK_END; 
                /**
                 * 在header结束的状态，也就是 WAITING_HEADER_NAME遇到 \r ，就是找到 block end的状态的时候，
                 * 这个时候所有的 header都已经收到了，
                 * 这个时候我们要到 header里面去找Transfer-Encoding，
                 * Transfer-Encoding 它可以有各种不同的值，node默认的值就是 chunked，
                 * 所以此处toy browser的案例就用TrunkedBodyParser
                 */
                if(this.headers['Transfer-Encoding'] === 'chunked'){
                    this.bodyParser = new TrunkedBodyParser();
                }
            } else{
                this.headerName += char;
            }               
        } else if(this.current === this.WAITING_HEADER_SPACE){ 
            if(char === ' '){
                this.current = this.WAITING_HEADER_VALUE;
            }
        } else if(this.current === this.WAITING_HEADER_VALUE){  
            if(char === '\r'){  
                this.current = this.WAITING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue; 
                this.headerName = "";
                this.headerValue = "";
            }else {
                this.headerValue += char;
            }
        } else if(this.current === this.WAITING_HEADER_LINE_END){ 
            if(char === '\n'){
                this.current = this.WAITING_HEADER_NAME; 
            }
        }else if(this.current === this.WAITING_HEADER_BLOCK_END){  
            if(char === '\n'){
                this.current = this.WAITING_BODY;
            }
        }else if(this.current === this.WAITING_BODY){
            // console.log('char',char) 
            this.bodyParser.receiveChar(char);
        }
    }
}

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

    console.log('响应最终结果', response);

}();