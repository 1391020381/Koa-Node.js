const path = require('path')
const Router = require('koa-router')
const router = new Router()

const multer = require('koa-multer')
const account = require('./actions/account')
const photo = require('./actions/photo')
const auth = require('./middlewares/auth')
const responseOK = require('./middlewares/responseOK')
const uuid = require('uuid')

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename(req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, uuid.v4() + ext)
  }
})
const uploader = multer({
  storage: storage
})
router.get('/login', async (ctx, next) => {
  const code = ctx.query.code
  console.log(`[login] 用户登陆Code为${code}`)
  ctx.body = {
    status: 0,
    data: await account.login(code)
  }
})
router.get('/login/ercode', async (ctx, next) => {
  ctx.body = {
    status: 0,
    data: await account.getErCode()
  }
})
router.get(
  '/login/ercode/:code',
  auth,
  async (ctx, next) => {
    const code = ctx.params.code
    const sessionKey = ctx.get('x-session')
    await account.setSessionKeyForCode(code, sessionKey)
    await next()
  },
  responseOK
)
router.get('/login/errcode/check/:code', async (ctx, next) => {
  const startTime = Date.now()
  async function login() {
    const code = ctx.params.code
    const sessionKey = await account.getSessionKeyByCode(code)
    if (sessionKey) {
      ctx.body = {
        status: 0,
        data: {
          sessionKey: sessionKey
        }
      }
    } else {
      if (Date.now() - startTime < 10000) {
        await new Promise(resolve => {
          process.nextTick(() => {
            resovle()
          })
        })
        await login()
      } else {
        ctx.body = { status: -1 }
      }
    }
  }
})


//添加相册
router.post(
  '/album',
  auth,
  async (ctx, next) => {
    const { name } = ctx.request.body   
    await photo.addAlbum(ctx.state.user.id, name) //   auth  中间件 赋值了 全局的变量
    await next()
  },
  responseOK
)

//修改相册

router.put(
  '/album/:id',
  auth,
  async (ctx, next) => {
    await photo.updateAlbum(ctx.params.id, ctx.body.name, ctx.user)
  },
  responseOK
)

// 删除相册
router.del(
  '/album/:id',
  auth,
  async (ctx, next) => {
    await photo.deleteAlbum(ctx.params.id)
    await next()
  },
  responseOK
)

//  相册列表

router.get('/xcx/album', auth, async (ctx, next) => {
  const albums = await photo.getAlbum(ctx.state.user.id)
  ctx.body = {
    data: albums,
    status: 0
  }
})
// 单个相册的图片

router.get('/xcx/album/:albumId',auth,async (ctx,next)=>{
  let albumId = ctx.params.albumId
  const imageList = await await photo.getPhotosByAlbumId(albumId)
  ctx.body = {
    data:imageList,
    status:0
  }
})
// 上传图片
router.post(
  '/photo',
  auth,
  uploader.single('file'),
  async (ctx, next) => {
    const { file } = ctx.req
    const { id } = ctx.req.body
    console.log('上传图片:',file,id)
    await photo.add(ctx.state.user.id,`http://127.0.0.1:4001${file}`,id)
    await next()
  },
  responseOK
)
module.exports = router
