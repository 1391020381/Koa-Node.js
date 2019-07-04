const HomeService = require('../service/home')
module.exports = {
  index: async (ctx, next) => {
    ctx.response.body = '<h1>index page</h1>'
  },
  home: async (ctx, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    ctx.response.body = '<h1>HOME page</h1>'
  },
  homeParams: async (ctx, next) => {
    console.log(ctx.params)
    ctx.response.body = `<h>HOME page ${ctx.params.id} - ${ctx.params.name}</h>`
  },
  user: async (ctx, next) => {
    await ctx.render('home/login', {
      btnName: 'GoGoGo'
    })
  },
  login: async (ctx, next) => {
    let { name, password } = ctx.request.body
    let data = await HomeService.login(name, password)
    if (data.status == '-1') {
      await ctx.render('home/login', data)
    } else {
      ctx.state.title = '个人中心'
      await ctx.render('home/success', data)
    }
  }
}
