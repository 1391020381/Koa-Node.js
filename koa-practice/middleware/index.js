const path = require('path')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const staticFile = require('koa-static')
const ip = require('ip')
const multer = require('koa-multer')
const session = require('koa-session')
const { promisify } = require('util')
const redis = require('redis')
const miSend = require('./mi-send')
const miLog = require('./mi-log')
const miHttpError = require('./mi-http-error')
const miRule = require('./mi-rule')
const jsonMIME = 'application/json'

const client = redis.createClient(6379,'127.0.0.1')
const hgetallAsync = promisify(client.hgetall).bind(client)
module.exports = app => {
  miRule({  // miRule 并非中间件,而是正常函数调用,因为中间件在每个HTTP请求中都会触发运行,而mi-rule知需要运行一次即可。
    app,
    rules:[
      {
        folder:path.join(__dirname,'../controller'),
        name:'controller'
      },
      {
        folder:path.join(__dirname,'../service'),
        name:'service'
      }
    ]
  })
  app.use(miHttpError({
    errorPageFolder:path.resolve(__dirname,'../errorPage')
  }))
  app.use(staticFile(path.resolve(__dirname, '../public')))
  app.use(
    nunjucks({
      ext: 'njk',
      path: path.join(__dirname, '../views'),
      nunjucksConfig: {
        trimBlocks: true
      }
    })
  )
  app.use(bodyParser())
  app.keys = ['some secret hurr']
  const store = {
    get:async(key,maxAge)=>{
      return await hgetallAsync(key)
    },
    set:(key,sess,maxAge)=>{
     client.hmset(key,sess)
    },
    destroy:(key)=>{
      client.hdel(key)
    }
  }
  const  config = {
    key:'justdoit',  // Cookie 中key 默认是 koa:sess
    maxAge:8640000,
    overwrite:true,
    httpOnly:true,  // 是否禁止客户端修改Cookie 默认为true
    signed:true ,   // 签名是否开启,与 app.keys对应 默认为true
    store           // 添加 store配置,支持 redis
  }
  app.use(session(config,app))
  app.use(miSend())
  app.use(miLog(
    {
      env: app.env,
      projectName: 'koa2-nodejs',
      appLogLevel: 'debug',
      dir: 'logs',
      serverIp: ip.address()
  }
  ))
  app.use(async (ctx, next) => {
    // 统一错误处理
    try {
      await next()
    } catch (ex) {
      ctx.type = jsonMIME
      ctx.body = {
        status: -1,
        message: ex.message
      }
    }
  })
}
