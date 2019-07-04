const koa = require('koa')
const app = new koa()

// 中间件执行顺序

app.use(async function(ctx, next) {
  console.log('one start')
  await next()
  console.log('one end')
})

app.use(async function(ctx, next) {
  console.log('two start')
  ctx.body = 'two'
  await next()
  console.log('two end')
})
app.use(async function(ctx, next) {
  console.log('three start')
  await next()
  console.log('three end')
})

// app.use(async (ctx,next)=>{
//   //console.log('ctx:',ctx)
//   await next();
// ctx.response.type = 'text/html';
// ctx.response.body = '<h1>Hello World</h1>';

// ctx.response.body = {
//   url:ctx.request.url,
//   query:ctx.request.query,
//   querystring:ctx.request.querystring
// }

// let postdata = ''
// ctx.req.on('data',(data)=>{
//   postdata += data;
// })
// ctx.req.on('end',()=>{
//   console.log(postdata)
// })

// if(ctx.request.method === 'POST'){

// }else if(ctx.request.method === 'GET'){
//   if(ctx.request.path !== '/'){
//     ctx.response.type = 'html',
//     ctx.response.body = '<a href="/">Go To Index</a>'
//   }else {
//     ctx.response.body = 'Hello World';
//   }
// }

//   ctx.response.status = 200;
//   if(ctx.request.accepts('json')){
//     ctx.response.type = 'json';
//     ctx.response.body = { data:'Hello World'}
//   } else if(ctx.request.accept('html')){
//     ctx.response.type = 'html';
//     ctx.response.body = '<p>Hello World</p>'
//   }
// })

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
