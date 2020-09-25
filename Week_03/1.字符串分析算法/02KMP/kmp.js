// letcode 28题

// kmp两个参数：原串、目标
function kmp(source, pattern){
    // 计算跳转表格 table
    let table = new Array(pattern.length).fill(0);

    // 计算table的逻辑
    // 将代码放到 {}  里，就是一个局部函数了，此时 i j 就可以多次使用了。
    {
        // 查这个字符串里面有没有自重复，比如说 abcdabce
        // 首先要考虑的是自重复串的开始位置，从 1 开始，如果从0开始整个串都是自重复的。
        let i = 1, j = 0;
        while(i < pattern.length){  //这种情况说明i j是相等的，可以匹配上，有自重复。
            if (pattern[i] === pattern[j]) {
                ++j, i++;   //i、j都自增
                table[i] = j;           
            }else{  //不匹配的话
                if(j > 0){
                    j = table[j];
                }else{
                    ++i;
                }
                    
            }
        }  
        console.log('计算table',table)      
    }

    // 模式匹配的逻辑
    {
        // j表示pattern串的位置，i表示source串的位置
        let i = 0; j = 0;
        while(i < source.length ){
            if(pattern[j] === source[i]){  // 匹配上
                ++i, ++j;
            }else{  // 没匹配上，pattern位置会回退到source位置                
                if(j > 0){
                    // 不到0的时候
                    j = table[j];
                }else{
                    ++i;  //到0的时候让i自增
                }
            }
            // 如果说模式串匹配到头了，那就说明结束了。
            if(j === pattern.length)
                return true;
        }         
        return false;  //如果是source串到头了，就return false

    }
   
    // abcdabce
    // aabaaac 
    
}

// kmp(原串,模式pattern串)

// 原串为空的时候
// kmp("","abcdabce")   // [0,0,0,0,0,1,2,3]
// kmp("","abababc")    // [0,0,0,1,2,3,4]
// kmp("","aabaaac")    // [0,0,1,0,1,2,2]

// 匹配   
// kmp("Hello","ll")                        //Hello里面有没有ll   
console.log(kmp("Hello","ll"));             //true
console.log(kmp("aabaabaaacx","aabaaac"));  //true
console.log(kmp("abc","abc"));              //true


// a a b a a a c
// 0 0 1 0 1 2 2

