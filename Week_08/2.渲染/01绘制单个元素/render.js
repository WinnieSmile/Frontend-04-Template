/*
 * @Author: your name
 * @Date: 2021-02-16 20:50:07
 * @LastEditTime: 2021-02-16 21:08:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_08\1.排版\05绘制单个元素\render.js
 */
const images = require('images');

function render(viewport, element){
    if(element.style){
        var img = images(element.style.width, element.style.height);   //宽300 高300

        if(element.style["background-color"]){
            let color = element.style["background-color"] || "rgb(0,0,0)";
            color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3))
            viewport.draw(img, element.style.left||0, element.style.top||0);  //左上角画出来
        }
    }
}