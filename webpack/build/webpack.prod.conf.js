const webpackBaseConfig = require('./webpack.base.conf');
const config = require('./config');
const utils = require('./utils');
const webpack = require('webpack');
const merge = require('webpack-merge');

const cleanWebpackPlugin = require("clean-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            extract: true,
            usePostCSS: true
        })
    },
    // optimization: { // 取出公共的modules模块  TODO:未完善，webpack4.0的API实例不太好
    //     splitChunks: {
    //         chunks: "all",
    //         name: 'vendor',
    //         cacheGroups: {
    //             vendors: {
    //                 test: /[\\/]node_modules[\\/]/
    //             }
    //         },
    //     }
    // },
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