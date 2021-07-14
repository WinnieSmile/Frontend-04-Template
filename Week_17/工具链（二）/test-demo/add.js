/*
 * @Author: your name
 * @Date: 2021-02-18 16:46:46
 * @LastEditTime: 2021-02-18 20:03:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \test-demo\add.js
 */
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
