const webpackBaseConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const merge = require('webpack-merge');
const cleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const fs = require('fs');
const path = require('path');
const config = require('./config');
const utils = require('./utils');

function getJSList(path) {
    let fileList = [];
    let dirlist = fs.readdirSync(path);
    let reg = /(.*)\.js$/;
    dirlist.forEach(item => {
        if (reg.test(item)) {
            fileList.push(RegExp.$1);
        }
    });
    return fileList;
}



function getChunks() {
    let jslist = getJSList(config.jspath);
    let chunksObj = {};
    jslist.forEach(item => {
        let vendorName = `${item}Vendor`;
        chunksObj[vendorName] = {
            test: module => {
                for (const chunk of module.chunksIterable) {
                    if (chunk.name && chunk.name.indexOf(item) > -1) {
                        if (module.nameForCondition() && /[\\/]node_modules[\\/]/.test(module.nameForCondition())) {
                            return true;
                        }
                    }
                }
                return false;
            },
            minChunks: 2,
            name: `${item}.vendor`,
            chunks: 'all',
        }
    })
    return chunksObj;
}
let chunksObj = getChunks();
// console.log();


module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            extract: true,
            usePostCSS: true
        })
    },
    optimization: { // 取出公共的modules模块  TODO:未完善，webpack4.0的API实例不太好
        splitChunks:{
            chunks:chunksObj
        } 
    },
    plugins: [
        new cleanWebpackPlugin(["dist"], {
            root: config.projectPath
        }),
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            publicPath: '../',
            filename: 'css/[name].css',
            chunkFilename: "css/[id].css",
            allChunks: true
        }),
    ]
});