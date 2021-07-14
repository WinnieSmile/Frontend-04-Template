<!--
 * @Author: your name
 * @Date: 2020-08-23 22:33:08
 * @LastEditTime: 2021-02-18 16:21:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_16\README.md
-->
# 工具链      
如何为JavaScript的生产环境制作一套工具链来覆盖前端开发的各个环节      
所有工具的开端就是脚手架，脚手架和工具链不是一回事，一般来说会把 generator称作脚手架，Yeoman是脚手架的生成器（它称作 generator的generator），也就是说，通过 yeoman的框架可以轻易的去开发一个能够初始化项目、创建模板的这样的工具。 

Yeoman官网：http://yeoman.io/authoring/index.html  

# 初始化与构建        
## 初始化工具 Yeoman（一）   
全局安装： 【参考：https://www.jianshu.com/p/313b1b92197f 】       
* 全局安装yo  : `npm install -g yo`
* npm install yeoman/generator-webapp

自定义模板  

* 新建文件夹 toolchain   
* npm init  
* 一直回车 
* ls 查看当前文件夹下有一个 package.json文件，即得到一个 js 的模块
* 在这个模块上安装 Yeoman：npm install yeoman-generator     
* 按照 yeoman 的文档创建它的目录 
```
├───package.json
├───app/
│   └───index.js
└───router/
    └───index.js
```
app/index.js 文件中
```javascript
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
  
    }

    method1() {
        this.log('method 1 just ran');
    }

    method2() {
        this.log('method 2 just ran');
    }
};
```
* 在根目录toolchain下：执行 `npm link` 把本地的模块link到npm 标准的模块里面去
* 把package.json中： （name必须为generator开头）
`"name": "toolchain"` 改为 `"name": "generator-toolchain"`         
`"main": "index.js"`  改为 `"main": "generators/app/index.js"`     
* 重新 npm link    
   
* 退回到toolchain的上一层文件夹，执行命令  `yo toolchain`   
```
$ yo toolchain
method 1 just ran
method 2 just ran
```
此时generator就可以执行了        
<br>

## 初始化工具 Yeoman（二） 

**下一步：给generator设计流程**      
除了允许我们使用这种同步的method之外，还可以使用 async 异步的method，在异步的method里边就可以使用await      
```javascript
async method1() {
    this.log('method 1 just ran');
}

method2() {
    this.log('method 2 just ran');
}
```   
通过命令行和用户交互的功能
* `this.prompt` 输入
* `this.log` 输出
```javascript
async method1() {
    const answers = await this.prompt([
        {
            type: "input",
            name: "name",
            message: "Your project name",
            default: this.appname // Default to current folder name
        },
        {
            type: "confirm",
            name: "cool",
            message: "Would you like to enable the Cool feature?"
        }
    ]);

    this.log("app name", answers.name);
    this.log("cool feature", answers.cool);
}
```
执行 `yo toolchain`
```
$ yo toolchain
? Your project name (      ) demo
? Your project name demo
? Would you like to enable the Cool feature? (Y/n) n
? Would you like to enable the Cool feature? No
app name demo
cool feature false
```   
**Yeoman的文件模板系统：Interacting with the file system**    

大部分的初始化能力都是通过这个文件模板最后实现的。

创建一个template   
* 在app文件夹下创建 templates文件夹，创建 t.html   
generators/app/templates/t.html
```html
<html>
  <head>
    <title><%= title %></title>
  </head>
</html>
```  
* 在 generators/app/index.js 中： 清空 method1里边的内容，调用 copyTpl。   
将 method1 名称改为 step1（第一步）  
```javascript
async step1() {
    this.fs.copyTpl(
        this.templatePath('t.html'),  //this.templatePath('index.html'),
        this.destinationPath('public/index.html'),
        { title: 'Templating with Yeoman' }
    );
}
```    
在根目录创建demo文件夹
```
├───demo
├───toolchain
```
在demo目录下执行 yo toolchain   
此时目标文件夹里边已经有了 index.html，index.html的内容已经是填好的，与模板里面的不一样了。```<title>Templating with Yeoman</title>```
此时有：
demo/public/index.html
```html
<html>
  <head>
    <title>Templating with Yeoman</title>
  </head>
</html>
```
我们可以通过 prompt 来收集一些信息，所以说在填写yeoman的template的时候，json的数据可能是来自于 prompt

**Yeoman的依赖系统：Managing Dependencies**   

对npm 进行了一个简单的包装，让它用起来更舒适。
   
* 调用 `this.npmInstall(['lodash'], { 'save-dev': true });` 来创建一个依赖   
* 最重要的是要把 package.json加进去   

在 generators/app/index.js 中
```javascript
initPackage(){
    const pkgJson = {
        devDependencies: {
            eslint: '^3.15.0'
        },
        dependencies: {
            react: '^16.2.0'
        }
    };
    
    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson); 
}
```
* 在demo目录下执行命令 `yo toolchain` 有了package.json文件 【 装package.json 】   

demo/package.json
```
{
  "devDependencies": {
    "eslint": "^3.15.0"
  },
  "dependencies": {
    "react": "^16.2.0"
  }
}
```
* 装 npmInstall   
可以直接调，也可以向命令行一样加参数安装特定的包或者库   
`this.npmInstall();`    

在 generators/app/index.js 中
```javascript
initPackage(){
    const pkgJson = {
        devDependencies: {
            eslint: '^3.15.0'
        },
        dependencies: {
            react: '^16.2.0'
        }
    };
    
    // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson); 
    // this.npmInstall(['lodash'], { 'save-dev': true });
    this.npmInstall();
}
```
* 在demo目录下执行命令 `yo toolchain`
```
$ ls
node_modules/  package.json  package-lock.json  public/
``
此时初始化一个项目所需要的最主要的内容已经在yeoman里面学会使用了。   
```
<br>

## 初始化工具 Yeoman（三）      
**深入理解 generator，做一个简单的例子：**   
vue的整个机制：（可以运行起来）   
尝试生成一个叫做vue的项目的这样的generator，这个generator将会初始化一个项目，让vue.js能够直接在这个项目里跑起来。（不使用vue-cli，使用webpack和vue的loader等通用工具作为环境）     

通过这个案例可以了解 怎样使用 generator来一步一步地去生成一个想要的这样的一个项目的模板

https://yeoman.io/authoring/file-system.html    
https://webpack.js.org/plugins/copy-webpack-plugin/#root
https://vuejs.org/v2/guide/single-file-components.html
https://www.npmjs.com/package/vue-loader  
https://vue-loader.vuejs.org/
https://vue-loader.vuejs.org/guide/#manual-setup   

`generator-vue`是项目模板    
`vue-demo`（复制运行模板）： → yo vue-demo → webpack      

## Webpack基本知识    
对于一个工具链来说，初始化之后，最主要的一个动作是去build它    
build是同时为开发和发布服务的一种基础设施 —— Webpack   
Webpack最初是为node设计的一款打包工具，它的能力是把一个Node的代码打包成一个浏览器可用的这样的代码，所以说它从最初的设计上是完全针对JS的这样的一个系统。

最后打包出来的是一个JS文件，然后拿HTML手工地引这个JS文件，这是Webpack的一个核心的思路。

Webpack可以帮我们做多文件合并，在合并的过程中，它可以通过各种各样的 loader和plugin去控制合并的一些规则和对文本进行一些转换。    

**全局安装webpack及webpack-cli：**
```
全局安装webpack及webpack-cli：
npm install webpack-cli -g   
npm install webpack -g

卸载全局webpack及webpack-cli：
npm uninstall -g webpack
npm uninstall -g webpack-cli
```
**在项目里面安装webpack**  
(比较新的版本的npm已经支持了npx)   
```
local安装webpack及webpack-cli：
npm install webpack-cli --save-dev
npx webpack
```    
**webpack的config**   
* `Entry` 入口的文件    
webpack其实也是可以多个入口，相当于多打包几个文件，但是其实一次webpack的整个过程只支持一个文件及其它所有依赖的这样的文件的打包。    
* `Output` 输出的文件名和输出的路径    
* `loader`    
loader是在module的里面进行配置的，它在module的rules里面，有一个list，允许我们写一个test正则表达式；use:'raw-loader' 等。
```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [
        { test: /\.txt$/, use: 'raw-loader' },
        { test: /\.css$/, use: 'css-loader' },
        { test: /\.ts$/, use: 'ts-loader' },
    ],  
  },
};
```   
**比较常见的 babel-loader、css-loader、view-loader**   
loader.js示例：    
```javascript
import { getOptions } from 'loader-utils';
import { validate } from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
};

export default function (source) {
  const options = getOptions(this);

  validate(schema, options, {
    name: 'Example Loader',
    baseDataPath: 'options',
  });

  // Apply some transformations to the source...

  return `export default ${JSON.stringify(source)}`;
}
```
**总结loader的作用：**
* export了一个文件，示例中的export可以用Node风格的export，也可以用最新的（使用export语句）。
* loader的使用是把一个source变成一个目标的代码。loader也可以认为是一个纯粹的文本的转换
* 而webpack会根据我们所有的最后转出来的import语句或者是require函数把它对应的文件给它加载进来。    
* 通过test的规则来决定什么样的后缀的文件使用什么样的loader。   
* 也可以使用多个loader处理同一个文件：比如说 style-loader要经过css-loader、sass-loader一系列的loader把它处理进来。

<br>   

## Babel基本知识    
了解到的是webpack的babel-plugin 较多  
`babel` ： 是完全独立于webpack的一个独立的系统，它的作用是把我们的新版本的JS编译成一个老版本的JS的版本，babel整个的体系比较复杂。     

全局命令 babel   
是需要一个输入和输出的，它可以直接跟一个文件名，babel不像webpack那样一下子处理多个文件，它是必须要用一定的脚本去调用它    
```
babel命令：     babel
查看babel版本： babel --version

安装全局babel
npm install -g @babel/core @babel/cli

安装到本地
npm install --save-dev @babel/core @babel/cli

卸载全局babel
npm uninstall -g @babel/core
npm uninstall -g @babel/cli
```
babel可以用命令去编译一个文件
vue-demo/src/sample.js
```javascript
for(let a of [1, 2, 3]){
    console.log(a);
}
```
在vue-demo文件夹下执行命令 `babel ./src/sample.js`    
运行结果如下：
```
$ babel ./src/sample.js
for (let a of [1, 2, 3]) {
  console.log(a);
}
```   
把它存成一个文件的话，用命令行特有的一种重定向标准输出的这种方式：用一个大于号后边跟一个文件名的形式：   
```
babel ./src/sample.js >1.txt
```    
https://babeljs.io/docs/en/usage

配置babel：
新建一个 .babelrc文件 【是一个JSON文件】
```javascript
{
    "presets": ["@babel/preset-env"]
}
```  
```
安装 preset-env    
npm install --save-dev @babel/preset-env   

安装 babel/core
npm install --save-dev @babel/core
```
执行 `babel ./src/sample.js`
```
$ babel ./src/sample.js
"use strict";

for (var _i = 0, _arr = [1, 2, 3]; _i < _arr.length; _i++) {
  var a = _arr[_i];
  console.log(a);
}
```   
babel-loader是不会默认去读 babelrc的，我们要在webpack里面去给它配置上。   
```javascript
module.exports = {
    entry: './main.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [["@babel/plugin-transform-react-jsx", {pragma:'createElement'}]]
                    },              
                ]
            }
        ],       
    },
    mode: "development"
};
```    
一般来说，我们都是使用现成的 preset和少数特殊的插件来完成我们的工作的，要想配整个的preset的话是非常困难的。

 


