const path = require('path')
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const router = require('./router')
const { open, error } = require('./lib/db/connect')
app.use(koaStatic(path.join(__dirname, 'uploads')))
const logger = require('./middlewares/log4.js')
app.use(logger)
app.use(bodyParser())
app.use(async (ctx, next) => { // 统一错误处理
  try {
    await next()
  } catch (e) {
    ctx.logger.error(e.stack || e)
    ctx.body = {
      status:-1,
      message:e.message || e,
      code:e.status
    }
  }
})
app.use(router.routes())
app.use(router.allowedMethods())
open()
error()
app.listen(4001, () => {
  console.log('app is listening 4001,http://127.0.0.1:4001')
})
