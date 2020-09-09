/*
 * @Author: your name
 * @Date: 2020-09-01 23:49:47
 * @LastEditTime: 2020-09-02 23:57:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \前端训练营\作业提交\Frontend-04-Template\Week_01\async\while_true.js
 */

 

/*  while(true){} 里面没有break，这种写法在同步代码中不会出现，在异步代码中很常见。
    业务需求：做一个表盘、操作系统的事件循环。 while(true)使用场景
*/
async function* counter(){
    let i = 0;
    while(true){   
        await sleep(1000);
        yield i++;
    }
}
// 异步函数声明
(async function(){
    for await(let v of counter()){
        console.log(v);
    }
})()