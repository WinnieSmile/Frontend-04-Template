const net = require("net");
const parser = require("./parser.js");  //把parser单独放到一个文件里，即require一个parser.js文件

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

class TrunkedBodyParser {
    constructor(){
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;  
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.length = 0;
        this.content = [];
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;
    }
    receiveChar(char){
        if(this.current === this.WAITING_LENGTH){
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
            if(char === '\n'){
                this.current = this.READING_TRUNK;
            }
        }else if(this.current === this.READING_TRUNK){
            this.content.push(char);  
            this.length --; 
            if(this.length === 0){
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

/**
 * 把API设计成：完整的得到response之后，然后再对parser进行处理，把这个body交给parser去处理。
 * 实际上如果写真正的浏览器的话，需要逐段的返回response body的，然后逐段的去给 parser。
 * 这里采用的办法是：把body全收回来，然后再交给HTML parser的这样的操作。实际上是应该做成异步分段处理的。
 */

void async function(){
    let request = new Request({   
        method: "POST",           
        host: "127.0.0.1",       
        port: "8062",             
        path: "/",                
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: "winter"
        }
    });
    
    let response = await request.send();  //从一个request得到一个response。
    // console.log('响应最终结果62', response);
    let dom = parser.parseHTML(response.body); //把HTML得到了以后，把它通过parser的parserHTML方法把它变成一个DOM树。
    // console.log('打印的dom',dom);

}();