/*
 * @Author: your name
 * @Date: 2021-01-13 22:31:28
 * @LastEditTime: 2021-01-17 21:50:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_07\1.HTML解析\03解析标签\parser.js
 */
const EOF = Symbol("EOF");  

console.log("???/")

function data(c){
    if(c == "<"){
        return tagOpen;  
    }else if( c == EOF){
        return ;
    }else {
        return data;
    }
}

function tagOpen(c){
    if(c == "/"){
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)){
        return tagName(c);
    }else {
        return ;
    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        return tagName(c);
    }else if(c == ">"){

    }else if(c == EOF){

    }else {
        
    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;  
    }else if(c.match(/^[a-zA-Z]$/)){
        return tagName;       
    }else if(c == ">"){
        return data;
    }else{
        return tagName;
    }
}

function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == ">"){
        return data;
    }else if(c == "="){
        return beforeAttributeName;
    }else{
        return beforeAttributeName;
    }
}

function selfClosingStartTag(c){
    if(c == ">"){
        currentToken.isSelfClosing = true;
        return data;
    }else if(c == "EOF"){

    }else {
        
    }
}

module.exports.parseHTML = function parseHTML(html){
    let state = data;     
    for(let c of html){
        state = state(c); 
    }
    state = state(EOF);   
}