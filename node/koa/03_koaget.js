const koa = require('koa');

const app = new koa();


app.use(async (ctx) => {
    let url = ctx.url;
    let request = ctx.request;

    let req_query = request.query;
    let req_querystring = request.querystring;
    
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;

    
    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring
    };
});
app.listen(3000, () => {
    console.log('服务启动');
});