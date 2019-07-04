// 第一个完整的koa 实例
const koa = require('koa')
const views = require('koa-views')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const Router = require('koa-router')

const app = new koa()
const router = new Router()
app.use(views(__dirname + '/views',{
    map:{html:'ejs'}
}))

app.use(static(path.join(__dirname,'/static')))

router.get('/',async (ctx,next)=>{
    await ctx.render('index')
})

router.post('/',(ctx,next)=>{
    let postData = ctx.request.body
    ctx.body = postData
})

app.use(bodyParser)
   .use(router.routes())
   .use(router.allowedMethods())

app.listen(3000)   