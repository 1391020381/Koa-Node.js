const Koa = require('koa')
const Router = require('koa-router')
const Http = require('http')
const Querystring = require('querystring')

const app = new Koa()
const router = new Router()

const Service = {
  search: async (kw = '') => {
    return new Promise((resolve, reject) => {
      Http.request(
        {
          hostname: 'm.maoyan.com',
          path:
            '/ajax/search?' +
            Querystring.stringify({
              kw,
              cityId: 10
            })
        },
        res => {
          res.setEncoding('utf8')
          let data = []
          res.on('data', chunk => {
            data.push(chunk)
          })
          res.on('end', () => {
            resolve(data.join(''))
          })
          res.on('error', e => {
            console.error(`problem with request: ${e.message}`)
          })
        }
      ).end()
    })
  }
}
router.get('/', async (ctx, next) => {
  let { kw } = ctx.query
  let data = await Service.search(kw)
  ctx.body = data
})

app.use(router.routes())
app.listen(8080, () => {
  console.log('Server is running at http://localhost:8080')
})
