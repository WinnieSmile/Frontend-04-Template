/*
 * @Author: your name
 * @Date: 2021-02-16 20:50:07
 * @LastEditTime: 2021-02-16 21:19:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_08\1.排版\05绘制单个元素\render.js
 */
const images = require('images');

function render(viewport, element){
    // 渲染单个元素
    if(element.style){
        var img = images(element.style.width, element.style.height);   //宽300 高300

        if(element.style["background-color"]){
            let color = element.style["background-color"] || "rgb(0,0,0)";
            color.match(/rgb\((\d+),(\d+),(\d+)\)/);
            img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3))
            viewport.draw(img, element.style.left||0, element.style.top||0);  //左上角画出来
        }
    }

    // 渲染DOM树 （递归）
    // 检查元素是否有children，然后根据它的children对它的每一个子元素进行渲染就可以了
    if(element.children){
        for(var child of element.children){
            render(viewport, child);
        }
    }
}