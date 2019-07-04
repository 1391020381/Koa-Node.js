const koa = require('koa')
const app = new koa()
app.use(async (ctx, next) => {
  let startTime = new Date().getTime()
  await next()
  let endTime = new Date().getTime()
  ctx.response.type = 'text/html'
  ctx.response.body = '<h1>Hello World</h1>'
  console.log(`请求地址:${ctx.path},响应时间:${endTime - startTime}ms`)
})
app.use(async (ctx, next) => {
  console.log('中间件doSomeing')
  await next()
  console.log('中间件执行over')
})

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
