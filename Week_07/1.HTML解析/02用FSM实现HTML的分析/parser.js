/*
 * @Author: your name
 * @Date: 2021-01-13 22:14:57
 * @LastEditTime: 2021-01-17 21:49:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_07\1.HTML解析\02用FSM实现HTML的分析\parser.js
 */
const EOF = Symbol("EOF");   //EOF: End Of File

function data(c){

}

module.exports.parseHTML = function parseHTML(html){
    let state = data;     //初始状态
    for(let c of html){
        state = state(c); //对html里面每个字符循环，然后去调用这个状态机里面的state这样的操作。
    }
    state = state(EOF);   //文件终结
    /**
     * HTML最后室友一个文件终结的，而在这个文件终结的位置，比如说一些文本节点，它可能仍然是面临着一个没有结束的这种状态。
     * 所以最后必须要额外给它一个字符，而这个字符不能是任何一个有效的字符。
     * 技巧：创建EOF，const EOF = Symbol("EOF"); 这个Symbol本身是没有任何Symbol意义的，只是利用了Symbol的唯一性。
     * 然后来创建一个新的这样的符号EOF；然后把它作为状态记得最后一个输入给到状态机。
     * 这样最后状态机就会强迫一些节点，最后完成截止的标志。
     */
}