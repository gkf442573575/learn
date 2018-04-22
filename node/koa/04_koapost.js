const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Router = require('koa-router');

const app = new koa();

app.use(bodyparser());

const router = new Router();

router.get('/', async (ctx) => {

    // 当GET请求时候返回表单页面
    let html = `
        <h1>koa2 request post demo</h1>
        <form method="POST" action="/postuser.do">
          <p>userName</p>
          <input name="userName" /><br/>
          <p>nickName</p>
          <input name="nickName" /><br/>
          <p>email</p>
          <input name="email" /><br/>
          <button type="submit">submit</button>
        </form>
      `
    ctx.body = html;
});


router.post('/postuser.do', async (ctx) => {
    let postData = ctx.request.body
    ctx.body = postData
})

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('服务启动');
});