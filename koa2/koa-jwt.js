const koa = require('koa')
const app = new koa()
const Router = require('koa-router')
const router = new Router()
const bodyParser = require('koa-bodyparser')
const { sign } = require('jsonwebtoken')
const secret = 'demo'
const jwt = require('koa-jwt')({ secret })
const admin = require('./admin')

router.get('/', async (ctx, next) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    ctx.type = 'html'
    let html = `
  <h1>登录</h1>
  <form method="POST" action="/api/login">
  <p>用户名</p><input name="userName"><br>
  <p>密码</p>
  <input name="password" type="password"><br>
  <button type="submit">submit</button>
  </form>
  `
    ctx.body = html
  }
})
router.post('/api/login', async (ctx, next) => {
  const user = ctx.request.body
  console.log('user:', user)
  if (user && user.userName) {
    let { userName } = user
    // 生成 Token,secret 作为秘钥需要开发者设置, expiresln 为失效时间,不要设置太久
    const token = sign({ userName }, secret, { expiresIn: '1h' })
    ctx.body = {
      message: 'Get Token Success',
      code: 1,
      token
    }
  } else {
    ctx.body = {
      message: 'Param Error',
      code: -1
    }
  }
})

router.get('/api/userInfo', jwt, async (ctx, next) => {
  ctx.body = { userName: ctx.state.user.userName }
})
router.get('/api/adminInfo', jwt, admin, async (ctx, next) => {
  ctx.body = { userName: ctx.state.user.userName }
})

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods()) // 对异常状态码的处理
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
