const querystring = require('querystring')
const koa = require('koa')
const Router = require('koa-router')
const app = new koa()
const router = new Router()

router.get('/', async (ctx, next) => {
  console.log(ctx.request.query)
  console.log(ctx.request.querystring)
  ctx.response.body = '<h1>HOME page</h1>'
})

router.get('/home/:id/:name', async (ctx, next) => {
  console.log(ctx.params)
  ctx.response.body = `<h1>Home page ${ctx.params.id}-${ctx.params.name}</h1>`
})
app.use(router.routes()).use(router.allowedMethods()) // 对异常状态码的处理
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
