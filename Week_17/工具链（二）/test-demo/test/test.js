/*
 * @Author: your name
 * @Date: 2021-02-18 16:47:52
 * @LastEditTime: 2021-03-17 23:24:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Frontend-04-Template\Week_17\工具链（二）\test-demo\test\test.js
 */
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



