const Koa = require('koa')
const app = new Koa()

const router = require('./router')
// const client = require('./redis')
const middleware = require('./middleware')
middleware(app)
router(app)


app.listen(3000, () => {
  console.log(`server is running at http:localhost:3000`)
})
