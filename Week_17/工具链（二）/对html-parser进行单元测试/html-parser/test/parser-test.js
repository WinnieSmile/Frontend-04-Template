/*
 * @Author: your name
 * @Date: 2021-02-18 23:28:01
 * @LastEditTime: 2021-02-18 23:58:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \html-parser\test\parser-test.js
 */
var assert = require('assert');

import {parseHTML} from '../src/parser.js';

describe('parser html:', function() {
    // 第一个 case 
    it('<a></a>', function() {
        let tree = parseHTML('<a></a>');
        assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 0);
    }); 
    // 与属性相关的代码： endTagOpen 、
    it('<a href="//time.geekbang.org"></a>', function() {
        let tree = parseHTML('<a href="//time.geekbang.org"></a>');
        console.log(tree);
        // assert.equal(tree.children[0].tagName, "a");
        assert.equal(tree.children[0].children.length, 0);
    }); 
});
