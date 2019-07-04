const koa = require('koa')
const app = new koa()
const bodyParser = require('koa-bodyparser')
const Router  = require('koa-router')
const router = new Router()
router.get('/',async (ctx,next)=>{
  await next()
  ctx.type = 'html'
  let html = `
<h1>登录</h1>
<form method="POST" action="/">
<p>用户名</p><input name="userName"><br>
<p>密码</p>
<input name="password" type="password"><br>
<button type="submit">submit</button>
</form>
`
  ctx.body = html
})
router.post('/',async (ctx,next)=>{
  await next()
  let postData = ctx.request.body
  ctx.body = postData
})
app.use(bodyParser())
   .use(router.routes())
   .use(router.allowedMethods()) // 对异常状态码的处理

// app.use(async (ctx, next) => {
//   console.log(ctx)
//   await next()
//   if (ctx.url === '/' && ctx.method === 'GET') {
//     ctx.type = 'html'
//     let html = `
//   <h1>登录</h1>
//   <form method="POST" action="/">
//   <p>用户名</p><input name="userName"><br>
//   <p>密码</p>
//   <input name="password" type="password"><br>
//   <button type="submit">submit</button>
//   </form>
//   `
//     ctx.body = html
//   } else if (ctx.url === '/' && ctx.method === 'POST') {
//     let postData = ctx.request.body
//     ctx.body = postData
//   }
// })

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
