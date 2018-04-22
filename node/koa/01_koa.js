const koa = require('koa');

const app = new koa();

app.use(async (ctx)=>{
    ctx.body = 'hello koa'
});

app.listen(3000);

