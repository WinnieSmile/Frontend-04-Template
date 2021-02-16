/*
 * @Author: your name
 * @Date: 2020-10-19 23:26:22
 * @LastEditTime: 2021-02-16 21:04:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_06\2.HTTP请求\01实现一个HTTP请求\server.js
 */

const http = require('http');

http.createServer((request, response) => {
    let body = [];
    request.on('error', (err)=>{
        console.error(err);
    }).on('data', (chunk)=>{
        body.push(chunk.toString());
    }).on('end', ()=>{
        // body = Buffer.concat(body).toString();  //视频中有这段代码，但是实际执行会报错，需注释掉。
        console.log('body：', body);
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end(`<html maaa="a" >  
<head>
    <style>
#container{
    width:500px;
    height:300px;
    display:flex;    
}
#container #myid{
    width:200px;
}
#container .c1{
    flex:1;   
}
    </style>
</head>
<body>
    <div id="container">
        <div id="myid"/>
        <div class="c1"/>
    </div>
</body>
</html>`);
    })
}).listen(8062);

console.log('server started 61');

