const css = require('css');     //使用 npm install css   【安装css包】

const EOF = Symbol("EOF");

let currentToken = null;
let currentAttribute = null;

let stack = [{ type:"document", children:[] }];   
let currentTextNode = null;   


let rules = [];
function addCSSRules(text){
    var ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}

/**
 * 简单选择器：   
 *      id选择器：      #a   
 *      class选择器：   .a   
 *      tagName选择器： div
 */
function match(element, selector){    
    if(!selector || !element.attributes){
        return false;
    }
    if(selector.charAt(0) === "#"){
        var attr = element.attributes.filter(attr => attr.name === "id")[0]
        if(attr && attr.value === selector.replace("#", '')){
            return true;
        }
    }else if(selector.charAt(0) === "."){
        var attr = element.attributes.filter(attr => attr.name === "class")[0]
        if(attr && attr.value === selector.replace(".", '')){
            return true;
        }
    }else {
        if(element.tagName === selector){
            return true;
        }        
    }
    return false;
}

function computeCSS(element){
    // console.log('rules',rules);
    // console.log('compute CSS for Element', element);   
    var elements = stack.slice().reverse();  
    console.log('elements',elements)
    if(!element.computedStyle){
        element.computedStyle = {};   
    } 
    for(let rule of rules){       
        var selectorParts = rule.selectors[0].split(" ").reverse();      
        
        // ？？？？？？这一步有问题，img没有attributes，匹配一直无法匹配到
        if(!match(element, selectorParts[0]))  
            continue;       
        let matched = false;

        var j = 1;        
        for(var i = 0; i < elements.length; i++){  
            if(match(elements[i], selectorParts[j])){   
                j++;
            }
        }       
        if(j >= selectorParts.length){  
            matched = true;
        }

        // ？？？？？匹配到之后的操作
        if(matched){  
            var computedStyle = element.computedStyle;  //把创建好的computedStyle取出来
            // 把ast的rule.declarations里的每一条取出来
            for(var declaration of rule.declarations){
                // 循环访问declarations里边的属性。如果computedStyle没有这个属性的话，就给它创建一个对象，用对象来保存属性的值。
                // 不把property的value直接写上去，主要是为了方便存储一些value之外的值。
                if(!computedStyle[declaration.property]){
                    computedStyle[declaration.property] = {}
                }
                // 把declaration里的value存到computedStyle的属性的value上去
                computedStyle[declaration.property].value = declaration.value
            }
            console.log('生成computed属性',element.computedStyle);
        }
    }
}


function emit(token){
    let top = stack[stack.length - 1];   
    // console.log(token.type,token.content)

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
        // console.log('element', element)

        computeCSS(element);    

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
            // +++++++++++++++++++   遇到 style 标签时，执行添加CSS规则的操作  +++++++++++++++  //
            if(top.tagName === "style"){
                addCSSRules(top.children[0].content);  
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
    // console.log('EOF',stack[0]);
    return stack[0];
}