const koa = require('koa');
const views = require('koa-views');
const path = require('path');
const convert = require('koa-convert');
const static = require('koa-static');
const {
    uploadImg
} = require('./util/upimg');

const app = new koa();

app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static';
// 由于koa-static目前不支持koa2
// 所以只能用koa-convert封装一下
app.use(convert(static(
    path.join(__dirname, staticPath)
)))


app.use(async (ctx) => {
    if (ctx.method === 'GET') {
        let title = 'upload pic async';
        await ctx.render('index', {
            title
        });
    } else if (ctx.url === '/api/picture/upload.json' && ctx.method === 'POST') {
        let result = {
            success: false
        };
        let severFilePath = path.join(__dirname, 'static/image');

        result = await uploadImg(ctx, {
            fileType: 'album',
            path: severFilePath
        });
        ctx.body = result;
    } else {
        ctx.body = '<h1>404</h1>'
    }
});

app.listen(3000, () => {
    console.log('服务启动');
});