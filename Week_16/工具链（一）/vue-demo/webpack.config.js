/*
 * @Author: your name
 * @Date: 2021-02-17 21:33:44
 * @LastEditTime: 2021-02-18 01:11:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \generator-vue\generators\app\templates\webpack.config.js
 */

const webpack = require('webpack'); //to access built-in plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/main.js',
    module: {
        rules: [
            { test: /\.vue$/, use: 'vue-loader' },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
            }
        ],       
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
              { from: "src/*.html", to: "[name].[ext]" },
            ],
        }),
    ],
};