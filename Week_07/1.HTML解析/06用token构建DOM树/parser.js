let currentToken = null;
let currentAttribute = null;

let stack = [{ type:"document", children:[] }];   

function emit(token){
    // if(token.type!="text")
    // console.log(token);
    if(token.type === "text"){  //如果是文本节点，就忽略掉
        return;
    }
    let top = stack[stack.length - 1];   // 每次emit token之后先把栈顶取出来，用一个数组来表示stack，那么它的栈顶就是最后一个元素

    /**
     *  如果是startToken，那么我们就会对它进行一个入栈操作，不会把这个token直接入栈，我们会入栈一个element。
     *  tag和element的区别：写在HTML文本里面的带尖括号的是tag，它背后所表示的东西，那个抽象的概念就是element。所以我们DOM树里面它只会有note和element，它不会有tag。不论是startTag还是endTag，它最终都对应着同一个element。
     *  把token里面的element直接赋值给element，让它变成element的tagName；然后把所有的属性除了type和tagName之外的属性都给它push进element的一个属性的池子里面
     *  attributes:[]    放了一个空的数组
     */
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

        top.children.push(element);    //入栈之前把它的top的children里面加上这个element元素，然后我们把元素parent设成top。这是对偶的操作
        element.parent = top;

        if(!token.isSelfClosing){   //如果是自封闭的就没有必要去push stack，如果它不是自封闭的，它是个startTag的话，我们就给它push进去。
            stack.push(element);
        }
        currentTextNode = null;

    }else if(token.type == "endTag"){
        //检查一下tagName是否相等
        if(top.tagName != token.tagName){  //如果不相等，理论上讲HTML是有一定的容错性的，比如说外面是一个p标签，里面是一个span标签，它默认就会把span标签先给封闭掉，然后再把p标签放进去。 
            throw new Error("Tag start end doesn't match");
        }else {
            //如果是相等的，那么就说明它配对是成功的，直接stack.pop();就好了
            stack.pop();
        }
        currentTextNode = null;
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
    }else if(c == "="){   //属性里面不可能在属性开头有个等号，它是一种错误
        // return beforeAttributeName;
    }else{
        // 否则它会遇到一个字符，可以理解为是个英文字母，但实际上 Unicode里很多字符都是可以的，这个时候就会创建一个新的属性，进入到 attributeName的状态，attributeName状态就会把当前的 c 给它 reconsume
        currentAttribute = {
            name:"",
            value:""
        }
        // console.log('currentAttribute', currentAttribute)
        return attributeName(c);   
    }
}

// <div class="abc" /></div>
function attributeName(c){
    // console.log(currentAttribute)
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF){   //attribute会继续处理这个c，这个c它会有斜杠/、大于号>、EOF三种特殊的字符的状态，空格也是一样。它都会进入到一个叫做 afterAttributeName的这样的一个状态。
        return afterAttributeName(c);   //afterAttributeName是相当于一个完整的属性结束了，比如说写 class="abc"，后面
    }else if(c == "="){
        return beforeAttributeValue;   //如果是等于，说明attributeName是对应着一个value的，那么它就会进入到一个beforeAttributeValue的状态。
    }else if(c == "\u0000"){

    }else if(c == "\"" || c == "'" || c == "<"){

    }else{
        currentAttribute.name += c;
        return attributeName;
    }
}

/**
 *  AttributeValue就又分成了double-quoted、single-quoted和unquoted四种情况。
 */
function beforeAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/" || c == ">" || c == EOF){
        return beforeAttributeValue;
    }else if(c == "\""){
        return doubleQuotedAttributeValue;  //如果说 attributeValue来的是一个双引号，那么就是 double-quoted
    }else if(c == "\'"){
        return singleQuotedAttributeValue;  //如果是单引号，那么就是 single-quoted，如果是啥都没有，也不是什么特殊的符号，那它就是unquoted。
    }else if(c == ">"){
        // return data;       
    }else {
        return UnquotedAttributeValue(c);
    }
}

/**
 *   double-quoted 状态只找双引号结束，那么 single-quoted 就只找单引号结束。
 */
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

// <div id="a" x=
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

/**
 *  Unquoted只找空白符结束，所有的属性它都会在结束的时候，把它的 attributeValue 给它写到当前的 currentToken。
 */
function UnquotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    }else if(c == "/"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;  //currentToken 就是标签，写到当前的token上，整体设计就是这样。
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
}