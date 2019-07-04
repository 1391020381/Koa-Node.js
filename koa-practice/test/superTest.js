const request = require('supertest')
const Koa = require('koa')

describe('test.index.js',()=>{
  it('should always set "Access-Control-Allow-Origin to *"',done=>{
    const app = new Koa()
    app.use(async(ctx,next)=>{
      ctx.set("Access-Control-Allow-Origin", "*")
      next()
    })
    app.use(function(ctx){
      ctx.body = {foo:'bar'}
    })
   request(app.listen())
   .get('/')
   .expect('Access-Control-Allow-Origin','*')
   .expect({foo:'bar'}.expect(200,done)) 
  })
})

