const log4js = require('log4js')
const access = require('./access.js')
const methods = ['trace','info','warn','error','fatal','mark']
const baseInfo = {
  appLogLevel:'debug',
  dir:'logs',
  env:'dev',
  projectName:'koa-nodejs',
  serverIp:'0.0.0.0'
}

// 中间件函数是一个带有 ctx next 两个参数的简单函数。
module.exports = (options)=>{  // 执行 logger() 时 返回一个 中间件 
    const start = Date.now()
    const contextLogger = {}
    const appenders = {}
    const opts = Object.assign({},baseInfo,options | {})
    const { env, appLogLevel,dir,serverIp,projectName} = opts
    const commonInfo = { projectName,serverIp }
    appenders.cheese={ 
      type:'dateFile',
      filename:`${dir}/task`,
      pattern:'-yyyy-MM-dd.log',
      alwaysIncludePattern:true   // 是否总是有后缀名
    } 
    if(env === 'dev' || env ==='development'){
      appenders.out = {
        type:'console'
      }
    }
    let config = {
      appenders,
      categories:{
        default:{
          appenders:Object.keys(appenders),
          level:appLogLevel
        }
      }
    }
    const logger = log4js.getLogger('cheese')
    log4js.configure(config)
    return async (ctx,next)=>{
      const start = Date.now()
      methods.forEach((method,i)=>{
        contextLogger[method] = (message)=>{
          logger[method](access(ctx,message,commonIfno))
        }
      })
      ctx.log = contextLogger
      await next()
      const responseTime = Date.now() - start
      logger.info(access(ctx,{
        responseTime:`响应时间为${responseTime/1000}s`
      },commonInfo))
    }
  
}