const css = require('css');     //使用 npm install css   【安装css包】

const EOF = Symbol("EOF");

let currentToken = null;
let currentAttribute = null;

let stack = [{ type:"document", children:[] }];   
let currentTextNode = null;   


// 加入一个新的函数，addCSSRules，这里我们把CSS规则暂存到一个数组里
let rules = [];
function addCSSRules(text){
    var ast = css.parse(text);
    console.log(JSON.stringify(ast, null, "   "));
    rules.push(...ast.stylesheet.rules);
}


function emit(token){
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
            /**
             * 如果说标签时style的话，我们就把它的子元素文本节点拿出来，然后把它的内容作为我们的CSS的内容给它添加到规则上去，HTML解析遇到style标签的结束标签的时候，
             * 我们就可以拿到style标签它的文本子节点了。
             */
            // +++++++++++++++++++   遇到 style 标签时，执行添加CSS规则的操作  +++++++++++++++  //
            if(top.tagName === "style"){
                addCSSRules(top.children[0].content);  //调用一个addCSSRules。取出当前标签top.children[0]，top会是一个style标签，children[0]是文本节点，文本节点的content就是CSS的内容。[原本是应该考虑link标签的情况，但是考虑到link标签涉及到多个html请求这样的情况，所以这里就不去处理link标签了，实际的浏览器比toy browser复杂地多，它的style标签里内容还支持import之类的。]
            }  
            stack.pop();
        }
        currentTextNode = null;
    }else if(token.type == "text"){
        // 节点类型为文本的处理逻辑
        if(currentTextNode == null){
            currentTextNode = {  
                type:"text",
                content:""
            }
            top.children.push(currentTextNode);  
        }
        currentTextNode.content += token.content;  
    }
}


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