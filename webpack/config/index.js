const path = require('path');
// 获取ip地址
const address = require('address');
const devhost = address.ip() || 'localhost';
const projectPath = process.cwd(); // 项目目录


const SRC_PATH = path.join(projectPath, './src/');


const config = {
    projectPath,
    srcpath: SRC_PATH,
    htmlpath: SRC_PATH,
    jspath: './src/js',
    ignoreJs: ['test'], // 没有入口js文件的html名
    dev: {
        host: devhost,
        port: '8080',
        assetsPublicPath: '/',
        proxyTable: { // proxy代理
            '/api': {
                target: 'http://www.welife1948.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        },
    },
    build: {
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: './'
    }
}


module.exports = config;