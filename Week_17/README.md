# 工具链（二）
mocha、nyc、code coverage的用法   
# 单元测试工具    
## Mocha（一）    
如果组件或库是被高度复用的话，尽量使用哦单元测试    
现在最流行的有两个单元测试工具：`Mocha`、`Jest`  
最重要的不是测试框架，而是跟coverage相关的工具   

```
删除当前目录下的所有东西： rm -r *
```

Mocha官网：https://mochajs.org/     

* 新建文件夹 test-demo 
* npm init
* 全部回车
* 全局安装Mocha：`npm install --global mocha` 
* 项目中局部安装Mocha：`npm install --save-dev mocha` 
* 新建add.js文件：test-demo/add.js 
```javascript
function add(a, b){
    return a + b;
}

module.exports = add;
```
* 创建 test.js 文件： test-demo/test/test.js
```javascript
var assert = require('assert');

var add = require('../add.js');

describe('add function testing', function() {
    it('1+2 should be 3', function() {
        assert.equal(add(1, 2), 3);
    });
    
    it('-5+2 should be -3', function(){
        assert.equal(add(-5, 2), -3);
    });
});

```    
Mocha是针对 Node.js的这样的一个测试框架，它的调用方式默认在使用 webpack之前都是不支持 import export 的，所以这里用的是 require。    

describe 是给测试分目录分组。     

* 在git bash中：test-demo目录下执行命令：`mocha`   
执行结果如下：
```
$ mocha

  add function testing
    √ 1+2 should be 3
    √ -5+2 should be -3

  2 passing (6ms)

```   

**【有个问题】：**   
test-demo/add.js 只能用 `module.exports = add;`
```javascript
function add(a, b){
    return a + b;
}

module.exports = add;
```
而直接用 export 会出错 
```javascript
export function add(a, b){
    return a + b;
}
```
因为 export 在 Node.js 里默认是不可以用的，除非把 package.json 给改成 type moudle或者使用 babel来做，一般来说改成 module 的话问题很多，所以说很少在 package.json里面去改 module。    
（下面解决这个问题）
## Mocha（一）      

**（如何让测试适用标准）解决 add 必须写成 Node 模块的问题**    
主要问题出现在 export 上     
* 思路一：webpack把dist里面的去做单元测试，但是理论上测试也依赖build，这样不太好，而且还需要做一些 code coverage 等，test如果依赖dist里面的话，就又添了不少麻烦。    
* 思路二（推荐）：使用 babel-register      

https://www.babeljs.cn/docs/babel-register    

test-demo/add.js
```javascript
export function add(a, b){
    return a + b;
}
``` 
解决方法：
* 安装 `@babel/core  和 @babel/register`
```
npm install @babel/core @babel/register --save-dev
```   
* 执行 `mocha` 命令会报错    
* 用一个mocha的参数：`mocha --require @babel/register`  这样调的是全局的，会出错，正确做法是调用local里的mocha 
`./node_modules/.bin/mocha --require @babel/register`  此时require到了register。   
此时还是有问题，因为我们用的是一个裸写的babel，它没有规定我们把它转换成什么版本，所以我们需要写一个 babel的config文件  
* 新建 `.babelrc` 文件
```json
{
    "presets": ["@babel/preset-env"]
}
```
* 安装  @babel/preset-env
`npm install @babel/preset-env --save-dev`
* test-demo/test/test.js
```javascript
var assert = require('assert');

// var add = require('../add.js');
import {add} from '../add.js';

describe('add function testing', function() {
    it('1+2 should be 3', function() {
        assert.equal(add(1, 2), 3);
    });
    
    it('-5+2 should be -3', function(){
        assert.equal(add(-5, 2), -3);
    });
});
```  
* 执行 `./node_modules/.bin/mocha --require @babel/register` 
运行结果：   
```
$ ./node_modules/.bin/mocha --require @babel/register


  add function testing
    √ 1+2 should be 3
    √ -5+2 should be -3


  2 passing (4ms)

```
* 命令 `./node_modules/.bin/mocha --require @babel/register` 太长，可以把它放到 package.json里   
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
},
```
改为
```json
"scripts": {
    "test": "./node_modules/.bin/mocha --require @babel/register"
},
```
但是因为 node_module 脚本里会默认把 node_modules/.bin 加到自己的path里(./node_modules/.bin/)，所以直接写成    
```json
"scripts": {
    "test": "mocha --require @babel/register"
},
```
* 执行命令 `npm run test` 就可以执行测试了    
结果如下：   
```
$ npm run test

> test-demo@1.0.0 test F:\极客时间\前端训练营\作业提交\Frontend-04-Template\Week_17\工具链（二）\test-demo
> mocha --require @babel/register



  add function testing
    √ 1+2 should be 3
    √ -5+2 should be -3


  2 passing (16ms)
```

## code coverage
单元测试里面最重要的概念：code coverage   
code coverage表示我们的测试到底覆盖了原文件里面的哪些代码，使用工具 `nyc` 

官网：https://www.npmjs.com/package/nyc       

**1、istanbuljs/nyc 工具集系列**

* 安装 nyc （本地安装nyc）  
```
npm install --save-dev nyc
或者 npm i -D nyc
```
* 使用方式： nyc + 命令    
* `nyc ./node_modules/.bin/mocha --require @babel/register`  也可以用 `nyc npm run test`     
但是此时显示
```
 nyc ./node_modules/.bin/mocha --require @babel/register
bash: nyc: command not found
```
   
查找资料 https://stackoverflow.com/questions/59956005/yarn-installed-nyc-successfully-but-zsh-says-command-not-found 。发现是因为没有全局安装 nyc，解决方法是：在 nyc 命令之前加上 npx ；或者全局安装 nyc `npm i -g nyc`   
成功的运行结果是：
```
$ npx nyc ./node_modules/.bin/mocha --require @babel/register


  add function testing
    √ 1+2 should be 3
    √ -5+2 should be -3


  2 passing (20ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 add.js   |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
```
此时是 100% 覆盖。

**2、下一步：**    
给 add.js里再添加一个方法：mul   
test-demo/add.js文件中：
```javascript
function add(a, b){
    return a + b;
}
function mul(a, b){
    return a * b;
}

module.exports.add = add;
module.exports.mul = mul;

// export function add(a, b){
//     return a + b;
// }
```
test-demo/test/test.js 文件中：
```javascript
var assert = require('assert');

// var add = require('../add.js');
var add = require('../add.js').add;
// import {add} from '../add.js';

describe('add function testing', function() {
    it('1+2 should be 3', function() {
        assert.equal(add(1, 2), 3);
    });
    
    it('-5+2 should be -3', function(){
        assert.equal(add(-5, 2), -3);
    });
});
```
运行 `npx nyc ./node_modules/.bin/mocha --require @babel/register`         
此时结果是 50% 覆盖    
```
$ npx nyc ./node_modules/.bin/mocha --require @babel/register


  add function testing
    √ 1+2 should be 3
    √ -5+2 should be -3


  2 passing (22ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |      75 |      100 |      50 |      75 |
 add.js   |      75 |      100 |      50 |      75 | 13
----------|---------|----------|---------|---------|-------------------
```    
给 test-demo/test/test.js
```javascript
var assert = require('assert');

// var add = require('../add.js');
var add = require('../add.js').add;
var mul = require('../add.js').mul;
// import {add} from '../add.js';

describe('add function testing', function() {
    it('1+2 should be 3', function() {
        assert.equal(add(1, 2), 3);
    });
    
    it('-5+2 should be -3', function(){
        assert.equal(add(-5, 2), -3);
    });

    it('-5*2 should be -10', function(){
        assert.equal(mul(-5, 2), -10);
    });
});
```
执行 `npx nyc ./node_modules/.bin/mocha --require @babel/register`    
运行结果：     
```
$ npx nyc ./node_modules/.bin/mocha --require @babel/register


  add function testing
    √ 1+2 should be 3
    √ -5+2 should be -3
    √ -5*2 should be -10


  3 passing (5ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 add.js   |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
```
行覆盖、函数覆盖、分支覆盖都变成了 100%，主要看行覆盖的覆盖率。    
nyc的作用：它可以在一个复杂的文件里边帮我们计算最终它测试的覆盖的比例。

**3、带上babel跑的情况下：**   
先换成 import 形式     
test-demo/test/test.js
```javascript
var assert = require('assert');

// var add = require('../add.js');
// var add = require('../add.js').add;
// var mul = require('../add.js').mul;
import {add, mul} from '../add.js';

describe('add function testing', function() {
    it('1+2 should be 3', function() {
        assert.equal(add(1, 2), 3);
    });
    
    it('-5+2 should be -3', function(){
        assert.equal(add(-5, 2), -3);
    });

    it('-5*2 should be -10', function(){
        assert.equal(mul(-5, 2), -10);
    });
});
```

test-demo/add.js
```javascript
export function add(a, b){
    return a + b;
}
export function mul(a, b){
    return a * b;
}

module.exports.add = add;
module.exports.mul = mul;

// export function add(a, b){
//     return a + b;
// }
```
要想跑起来 nyc ，需要给 babel 和 nyc 互相加一个插件    
 `babel-plugin-istanbul` 和 `nyc-config-babel`  
官网：https://www.npmjs.com/package/babel-plugin-istanbul     
官网：https://www.npmjs.com/package/@istanbuljs/nyc-config-babel    

* 配置：   
根据官网：https://www.npmjs.com/package/@istanbuljs/nyc-config-babel   
```
npm i babel-plugin-istanbul @istanbuljs/nyc-config-babel --save-dev
npm install --save-dev babel-plugin-istanbul
```

.babelrc 文件中添加 `"plugins": ["istanbul"]`
```json
{
    "presets": ["@babel/preset-env"],
    "plugins": ["istanbul"]
}
```
新建一个 .nycrc文件
```
{
    "extends": "@istanbuljs/nyc-config-babel"
}
```   
执行 `npx nyc ./node_modules/.bin/mocha` 
执行结果：（根据babel的结果来算覆盖率，根据source map做追踪）    
```
$ npx nyc ./node_modules/.bin/mocha


  add function testing
    √ 1+2 should be 3
    √ -5+2 should be -3
    √ -5*2 should be -10


  3 passing (23ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 add.js   |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
```   

把nyc的代码加到命令里边    
package.json 文件   
```json
"scripts": {
    "test": "mocha --require @babel/register",
    "coverage": "nyc mocha"
},
```   
因为是调本地的mocha，所以直接写nyc就可以了，这样就不用记nyc的命令    
直接执行 `npm run coverage`     

有两个不同的场景： 
* 写测试用例的时候是 `npm run coverage`    
* 写业务代码的时候是 `npm run test`   
即：   
```
$ npm run coverage

> test-demo@1.0.0 coverage F:\极客时间\前端训练营\作业提交\Frontend-04-Template\Week_17\工具链（二）\test-demo
> nyc mocha



  add function testing
    √ 1+2 should be 3
    √ -5+2 should be -3
    √ -5*2 should be -10


  3 passing (4ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |     100 |      100 |     100 |     100 |
 add.js   |     100 |      100 |     100 |     100 |
----------|---------|----------|---------|---------|-------------------
```

```
$ npm run test

> test-demo@1.0.0 test F:\极客时间\前端训练营\作业提交\Frontend-04-Template\Week_17\工具链（二）\test-demo
> mocha --require @babel/register



  add function testing
    √ 1+2 should be 3
    √ -5+2 should be -3
    √ -5*2 should be -10


  3 passing (9ms)
```

## 对 html-parser 进行单元测试  【实践】 
* 新建一个文件夹 html-parser
* 在 html-parser文件夹下创建 src目录
* 拷贝（ Week_08/2.渲染/02绘制DOM树/parser.js ）parser.js文件 到src目录下。
* （ html-parser/src/parser.js ）    
* 在 html-parser 文件夹下执行 `npm init` 一直回车，有了 `package.json` 文件
* 将 test-demo 的`package.json` 文件中的 `"scripts"` 和 `"devDependencies"` 复制过来   
```json
"scripts": {
    "test": "mocha --require @babel/register",
    "coverage": "nyc mocha"
},

"devDependencies": {
    "@babel/core": "^7.12.16",
    "@babel/preset-env": "^7.12.16",
    "@babel/register": "^7.12.13",
    "@istanbuljs/nyc-config-babel": "^3.0.0",
    "babel-plugin-istanbul": "^6.0.0",
    "mocha": "^8.3.0",
    "nyc": "^15.1.0"
}
```

* 从 test-demo 中将 `.babelrc` 文件和 `.nycrc` 文件拷贝进来。   
* npm install 安装依赖，此时 `node_modules` 就有了      
* 创建 test 目录、新建 `parser-test.js` 文件：（ 路径：html-parser/test/parser-test.js  ）      
* 将 test-demo 中的 test.js 文件中的内容拷贝到 parser-test.js 中，做修改，如下       
`parser-test.js` 内容如下：
```javascript
var assert = require('assert');

import {parseHTML} from '../src/parser.js';

describe('parser html:', function() {
    it('<a>abc</a>', function() {
        parseHTML('<a>abc</a>')
        assert.equal(1, 1);
    }); 
});
```   
* 执行命令：`npm run test` 结果如下：   
```
$ npm run test

> html-parser@1.0.0 test F:\极客时间\前端训练营\作业提交\Frontend-04-Template\Week_17\工具链（二）\对html-parser进行单元测试\html-parser
> mocha --require @babel/register



  parser html:
elements [ { type: 'document', children: [] } ]
    √ <a>abc</a>


  1 passing (8ms)
```
* 执行命令 `npm run coverage` 结果如下：    
```
$ npm run coverage

> html-parser@1.0.0 coverage F:\极客时间\前端训练营\作业提交\Frontend-04-Templat                               e\Week_17\工具链（二）\对html-parser进行单元测试\html-parser
> nyc mocha



  parser html:
elements [ { type: 'document', children: [] } ]
    √ <a>abc</a>


  1 passing (31ms)

-----------|---------|----------|---------|---------|---------------------------                               --------------------
File       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                        
-----------|---------|----------|---------|---------|---------------------------                               --------------------
All files  |   28.57 |    16.28 |   31.82 |   28.99 |                                                          
 parser.js |   28.57 |    16.28 |   31.82 |   28.99 | ...26,153,173,177,228,239-                               241,250,252,260-423
-----------|---------|----------|---------|---------|---------------------------                               --------------------
```
此时行覆盖率只有 28.99%    



    

