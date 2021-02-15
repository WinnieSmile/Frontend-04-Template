let currentToken = null;
let currentAttribute = null;

let stack = [{ type:"document", children:[] }];   
let currentTextNode = null;   //当前没有文本节点的话，我们就会创建一个新的文本节点，我们会把它变成一个全局变量，表示我们当前正处于的文本节点

function emit(token){
    // if(token.type === "text"){  
    //     return;
    // }
    let top = stack[stack.length - 1];   
    console.log(token.type,token.content)

    if(token.type == "startTag"){   
        let element = {
            type:"element",  
            children:[],
            attributes:[]
        }

        element.tagName = token.tagName;  

        for(let p in token){
            if(p != "type" && p != "tagName"){
                element.attributes.push({
                    name:p,
                    value:token[p]
                });
            }
        }

        top.children.push(element);    
        element.parent = top;

        if(!token.isSelfClosing){   
            stack.push(element);
        }
        currentTextNode = null;

    }else if(token.type == "endTag"){  
        if(top.tagName != token.tagName){   
            throw new Error("Tag start end doesn't match!");
        }else {
            stack.pop();
        }
        currentTextNode = null;
    }else if(token.type == "text"){
        // 节点类型为文本的处理逻辑
        if(currentTextNode == null){
            currentTextNode = {  //如果是当前刚刚结束一个标签，那么在开始标签和结束标签的token之后，我们都会把文本节点清空
                type:"text",
                content:""
            }
            top.children.push(currentTextNode);  //给它作为目前的节点的这样的一个children，也是作为它的一个子节点。
        }
        currentTextNode.content += token.content;  //遇到任何一个字符型的这样的token的话，所做的逻辑是：给当前的文本节点追加一个content。
    }
}

const EOF = Symbol("EOF");  

function data(c){
    if(c == "<"){  
        return tagOpen;  
    }else if( c == EOF){   
        emit({
            type:"EOF" 
        })
        return ;
    }else {     
        emit({
            type:"text",
            content:c 
        });
        return data;
    }
}

function tagOpen(c){    
    if(c == "/"){
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)){   
        currentToken = {      
            type:"startTag",  
            tagName:""
        }
        return tagName(c);
    }else {
        return ;
    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
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

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;  
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c   
        return tagName;       
    }else if(c == ">"){
        emit(currentToken);
        return data;
    }else{
        currentToken.tagName += c;
        return tagName;
    }
}

// <html aaa
// 处理属性的状态
function beforeAttributeName(c){  
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if( c == "/" || c == ">" || c == EOF){       
        return afterAttributeName(c);
    }else if(c == "="){   
        
    }else{
        
        currentAttribute = {
            name:"",
            value:""
        }
        
        return attributeName(c);   
    }
}

// <div class="abc" /></div>
function attributeName(c){
    
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF){   
        return afterAttributeName(c);   
    }else if(c == "="){
        return beforeAttributeValue;   
    }else if(c == "\u0000"){

    }else if(c == "\"" || c == "'" || c == "<"){

    }else{
        currentAttribute.name += c;
        return attributeName;
    }
}


function beforeAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/" || c == ">" || c == EOF){
        return beforeAttributeValue;
    }else if(c == "\""){
        return doubleQuotedAttributeValue;  
    }else if(c == "\'"){
        return singleQuotedAttributeValue;  
    }else if(c == ">"){
           
    }else {
        return UnquotedAttributeValue(c);
    }
}


function doubleQuotedAttributeValue(c){
    if(c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue;
    }else if(c == "\u0000"){

    }else if(c == EOF){

    }else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    } 
}

function singleQuotedAttributeValue(c){
    if(c == "\'"){
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue;
    }else if(c == "\u0000"){

    }else if(c == EOF){
        
    }else{
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
}


function afterQuotedAttributeValue (c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == EOF){

    }else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
}


function UnquotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    }else if(c == "/"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;  
        emit(currentToken);
        return data;
    }else if(c == "\u0000"){

    }else if(c == "\"" || c == "'" || c == "<" || c == "=" || c == "`"){

    }else if(c == EOF){

    }else{
        currentAttribute.value += c;
        return UnquotedAttributeValue
    }
}


function selfClosingStartTag(c){
    if(c == ">"){
        currentToken.isSelfClosing = true;
        // emit(currentToken);
        return data;
    }else if(c == "EOF"){

    }else {
        
    }
}


function afterAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return afterAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;
    }else if(c == "="){
        return beforeAttributeValue;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == EOF){

    }else{
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name:"",
            value:""
        };
        return attributeName(c);
    }
}

module.exports.parseHTML = function parseHTML(html){
    let state = data;     
    for(let c of html){
        state = state(c); 
    }
    state = state(EOF);   
    console.log('EOF',stack[0]);
    return stack[0];
}