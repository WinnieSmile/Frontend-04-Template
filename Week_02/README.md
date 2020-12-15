# 一、寻路
## 广度优先搜索  

* 广度优先搜索BFS（Breadth First Search）也称为宽度优先搜索，它是一种先生成的结点先扩展的策略。类似于树的遍历。  
* 广度优先搜索算法的搜索步骤一般是：  
（1）从队列头取出一个结点，检查它按照扩展规则是否能够扩展，如果能则产生一个新结点。  
（2）检查新生成的结点，看它是否已在队列中存在，如果新结点已经在队列中出现过，就放弃这个结点，然后回到第（1）步。否则，如果新结点未曾在队列中出现过，则将它加入到队列尾。   
（3）检查新结点是否目标结点。如果新结点是目标结点，则搜索成功，程序结束；若新结点不是目标结点，则回到第（1）步，再从队列头取出结点进行扩展。    
**最终可能产生两种结果；找到目标结点，或扩展完所有结点而没有找到目标结点。**    

* 如果目标结点存在于解答树的有限层上，广度优先搜索算法一定能保证找到一条通向它的最佳路径，因此广度优先搜索算法特别适用于只需求出最优解的问题。当问题需要给出解的路径，则要保存每个结点的来源，也就是它是从哪一个节点扩展来的。  

* JavaScript数组就是一个天然的队列，也是一个天然的栈。   
* 数组的方法有`shift、unshift` 和 `push、pop`如果`push`和`shift`相对，那么它就是一个队列，`pop`如果和`unshift`联合使用也是一个队列；`push`和`pop`联合使用就是一个栈。    

## 启发式寻路  

* 启发式寻路：用一个函数去判断它的这些点扩展的优先级，只要判断好了优先级就可以有目的地去寻路。  
（1）比如说沿着点的方向去做优先地去找寻路，只要启发式函数所使用的估值能够一定小于这个点到终点的路径，那么它就一定能找到最优路径。  
（2）在计算机领域，通过启发式寻路能够找到最优路径，称为 A*; 不一定找到最终的启发式寻路称为 A。A*是A寻路的特例。 

* 实现 `Sorted` 这个数据结构
``` javascript
class Sorted{
    constructor(data, compare){ 
        this.data = data.slice();   // 保存一份data
        this.compare = compare || ((a, b) => a - b);  
    }
    // 每次take时都拿出一个最小的
    take(){
        if (!this.data.length) {
            return;     
        }
        let min = this.data[0];   // 存最小的数 (默认从0开始)
        let minIndex = 0;         // 存最小的位置

        // 循环从1开始
        for(let i = 1; i < this.data.length; i++){
            if (this.compare(this.data[i], min) < 0) {
                min = this.data[i];  
                minIndex = i;
            }
        }
        // 把数组和最后一个元素交换，把最后一个元素用新的点覆盖掉了
        this.data[minIndex] = this.data[this.data.length - 1];          
        this.data.pop();
        return min;
    }
    give(v){
        this.data.push(v);   
    }
}
```

执行：
``` javascript
// 定义一个无序数组
let s = new Sorted([7, 3, 9, 6, 5, 4, 8, 0, 2])
s.take();  

// 使用sort()
[7, 3, 9, 6, 5, 4, 8, 0, 2].sort()
// 执行
[0, 2, 3, 4, 5, 6, 7, 8, 9]
```

# 二、使用LL算法构建AST
AST：抽象语法树。我们的代码在计算机的分析过程中，首先就是把我们的编程语言去分词，在分词之后的下一步就是把这些词，让它构成这种层层嵌套的这种语法树的这样的树形结构。下一步才是如何去解析代码去执行。  
构建AST抽象语法树的过程又被叫做语法分析，最著名的语法分析算法核心思想有两种，一种是LL算法，一种是LR算法，L是Left的缩写，LL算法就是从左到右扫描，然后从左到右规约的这样的一个缩写。    

## 四则运算
**四则运算词法的定义**
number数字；加减运算符；允许编程语言的使用者添加一些格式化的字符：例如空格、换行等。  
有意义的输入有两种：一种是Number数字、一种是Operator运算符。  
* TokenNumber:  
    * 1 2 3 4 5 6 7 8 9 0 的组合  
* Operator: + 、 -、 *、/ 之一
* Whitespace: <SP>
* LineTerminator: <LF> <CR>  

**四则运算语法的定义**  

使用 JavaScript 的产生式来定义加法和乘法运算，做成一个嵌套的结构。  
加法是由左右两个乘法组成的，并且加法是可以连加的，加法是一个重复自身的这样的一个序列。定义里会有一个递归这样的产生式的结构，这也是做产生式的时候处理无限的列表的时候的一个常用的手法。  
  
MultiplicativeExpression 是乘法运算。  
单独的一个数字也是一种特殊的乘法，它是只有一项的乘法；  
只有 * 号，把它认为是一种特殊的加法，只有一项的加法。这样比较方便去递归的定义整个的这样的一个表达式。     

下方中的 `<EOF>` 、`<+>`、`<->`、`<Number>`、`<*><Number>`、`</><Number>` 是终结符TerminalSymbol，TerminalSymbol就是直接从词法中扫描出来的。其他是非终结符 NoneTerminalSymbol，非终结符就是拿终结符的组合定义出来的。 

最低层级的 MultiplicativeExpression，它的定义是一个用乘号或者除号相连接的 Number 的序列。递归的思想：它可以是一个单独的Number，也可以是一个乘法表达式后边缀上一个乘号，再加上一个 Number 。  

定义乘法表达式的非终结符，它可以是一个单独的 Number，也可以是它自身加上一个乘号然后再加上一个Number，也可以是除号加上一个Number。  

加法表达式的结构：与乘法表达式类似，它的基本单元换成了一个非终结符 MultiplicativeExpression，就是数个乘法用加号或减号连接在一起，那么它就是加法的结构。整体的能处理的表达式 Expression 就是一个加法表达式。  
EOF（End of File）不是一个真实可见的字符，在分析中，如果有一些结构是要求一定要到尾巴上结束的。EOF标识了所有的源代码的结束，用在各种表示终结的场景里。

``` html
<!-- 一个完整表达式由一个加减法表达式和终止符构成 -->
<Expression>::=  
<AdditiveExpression><EOF> 

<!-- 加法表达式 -->
<AdditiveExpression>::=
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>

<!-- 乘法表达式的结构 -->
<MultiplicativeExpression>::=
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
```

## LL语法分析

以**加法表达式**为例  
从输入的序列里去看当前能够拿到的是什么样的东西，在前面这三条产生式的规则里发现 AdditiveExpression ，如果在做一个策划分析，如果处理 AdditiveExpression，它找到的第一个符号 symbol 是？  
从产生式中可以看到，它可能会面临两种情况：  
* 开头是一个 MultiplicativeExpression   
* 开头是一个 AdditiveExpression       

但是又不止这两种情况，如乘法表达式可能是 Number MultiplicativeExpression AdditiveExpression 等一系列的可能性，所以说它第一个符号有三种可能性。    
如果遇到 Number 或者 MultiplicativeExpression 那是不是应该把它直接当做乘法去处理呢？只看一个字符是不够的。需要看它第二个输入的元素是乘号除号还是加号减号，因为原来的 MultiplicativeExpression 还是在的。  
从左到右扫描，然后从左到右去归并的这样的一个语法分析的算法，这就是 LL语法分析。每一个产生式对应着一个函数。

## 应用场景
编译原理  
理解 vue 如何解析 template 成 ast 抽象树；  
理解（逆）波兰表达式如何处理计算式；  
理解 js 词法分析，如何用 token 标记每句源码。










 








