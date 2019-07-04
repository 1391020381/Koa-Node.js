module.exports = ()=>{
  function render(json){
    this.set('Content-Type','application/json')
    this.body = JSON.stringify(json)
  }
  return async (ctx,next)=>{
    ctx.send = render.bind(ctx)
    await next()
  }
}

// 中间件被调用时,将会在上下文对象上扩展send函数,并转移控制权。