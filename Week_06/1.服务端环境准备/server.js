/*
 * @Author: your name
 * @Date: 2020-10-19 21:23:05
 * @LastEditTime: 2020-10-19 21:35:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_06\01服务端环境准备\server.js
 */
const http = require('http');

http.createServer((request, response) => {
    let body = [];
    request.on('error', (err)=>{
        console.err(err);
    }).on('data', (chunk)=>{
        body.push(chunk.toString());
    }).on('end', ()=>{
        body = Buffer.concat(body).toString();
        console.log('body：', body);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(' Hello World\n ');
    })
}).listen(8088);

console.log('server staeted');