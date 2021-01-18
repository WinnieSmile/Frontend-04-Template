
let currentToken = null;

function emit(token){
    // if(token.type!="text")
    console.log(token);
}

const EOF = Symbol("EOF");  

function data(c){
    if(c == "<"){  //检测到左尖括号的时候，是不知道这个时候它的字符到底是什么样的tag，所以说这一步暂时什么都不做，把它进入到 tagOpen状态。
        return tagOpen;  
    }else if( c == EOF){    //data状态，如果等于EOF的话，会提交一个EOF token
        emit({
            type:"EOF"
        })
        return ;
    }else {     //如果是文本节点，那么我们会emit一个 text token
        emit({
            type:"text",
            content:c  //content就是文本节点里面的一个字符。
        });
        return data;
    }
}

function tagOpen(c){    //tagOpen状态
    if(c == "/"){
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)){   //如果发现它是一个start tag，就是没有遇到斜杠，就是一个大于号开头，然后后面有一个字母，<a  <div  等都可以确认它是一个开始标签或者是一个自封闭标签。
        currentToken = {      //此时会给currentToken赋一个初值
            type:"startTag",  //type，不管是自封闭的还是不是自封闭的，都会把它称为 startTag，如果是自封闭的，用一个额外的变量 isSelfClosing来标识，
            tagName:""
        }
        return tagName(c);
    }else {
        return ;
    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        // 创建一个 endTag 标签 token，
        currentToken = {
            type:"endTag",
            tagName:""
        }
        return tagName(c);
    }else if(c == ">"){

    }else if(c == EOF){

    }else {
        
    }
}

/**
 * 在tagName状态下，会收到一个标签名组成的字符，如果这个字符属于字母的话，我们会把它追加到当前的token的tagName上面。
 * 
 */
function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;  
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c   // .toLowerCase();
        return tagName;       
    }else if(c == ">"){
        emit(currentToken);
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

/**
 * selfClosingStartTag 加了一个处理逻辑，就是这个变量置为了true。
 */
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