const koa = require('koa')
const Router = require('koa-router')

const app = new koa()
const router = new Router()

router.get('/', async (ctx, next) => {
  ctx.body = 'koa-router'
  await next()
})
router.post('/users',async(ctx,next)=>{
   await next()
})
router.put('/users/:id',async(ctx,next)=>{
  await next()
})
router.del('/users/:id',async(ctx,next)=>{
 await next()
})
router.all('/users/:id',async(ctx,next)=>{
  await next()
})
app.use(router.routes())
// app.use(async (ctx, next) => {
//   const { url, method } = ctx
//   if (url === '/404' && method === 'GET') {
//     ctx.body = 'Page Not Found'
//     ctx.status = 404
//   } else {
//     ctx.body = 'Default Content'
//   }
//   await next()
// })

app.listen(4000, () => {
  console.log('server is running at http://localhost:4000')
})
