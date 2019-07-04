const path = require('path')
const nunjucks = require('nunjucks')  // 注意这里的 引用的是 nunjucks

module.exports = (opts = {}) =>{
  const env = opts.env || process.env.NODE_ENV || 'development'
  const folder = opts.errorPageFolder
  const templatePath = path.resolve(__dirname ,'./error.njk')
  let fileName = 'other'
  return async (ctx,next) =>{
    try{
      await next()// 如果没有更改过 response 的 status,则默认的 status 是 404
      if(ctx.response.status === 404 && !ctx.response.body){
        ctx.throw(404)
      }
    }catch(e){
      let fileName = 'other'
      let status = parseInt(e.status)
      const message = e.message
      if(status >=400){
        switch(status){
          case 400:
          case 404:
          case 500:
                fileName = status
                break
          default:
                fileName = 'other'       
        }
      }else{
        status = 500
        fileName = status
      }
      const filePath = folder ? path.join(folder,`${fileName}.njk`):templatePath
      try{
        nunjucks.configure(folder?folder:__dirname)
        const data = await nunjucks.render(filePath,{
          env:env,
          status:e.status || e.message,
          error:e.message,
          stack:e.stack
        })
        ctx.status = status
        ctx.body = data
      }catch(e){
          ctx.throw(500,`错误页渲染失败:${e.message}`)
      }
    }
  }
}