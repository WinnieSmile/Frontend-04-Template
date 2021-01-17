/*
 * @Author: your name
 * @Date: 2020-10-19 23:26:22
 * @LastEditTime: 2021-01-17 22:12:00
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
body div #myid{
    width:100px;
    background-color: #ff5000;
}    
body div img{
    width:30px;
    background-color: #ff1111;
}
    </style>
</head>
<body>
    <div>
        <img id="myid"/>
        <img />
    </div>
</body>
</html>`);
    })
}).listen(8011);

console.log('server started 11');

