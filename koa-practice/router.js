const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const multer = require('koa-multer')
const { getAllCustomers, createCustomer } = require('./db')
const HomeController = require('./controller/home')
const UploadController = require('./controller/upload')
const router = new Router()
const upload = multer({
  dest: 'uploads/'
})
// const types = upload.single('avatar')
const types = upload.array('avatar')
const jsonMIME = 'application/json'
module.exports = app => {
  router.get('/', app.controller.home.index)
  router.get('/home', app.controller.home.home)
  router.get('/home/:id/:name', app.controller.home.homeParams)
  router.get('/user', app.controller.home.user)
  router.post('/user/login', app.controller.home.login)
  router.get('/uploads', app.controller.upload.index)
  router.post('/profile', types, app.controller.upload.reName)
  router.get('/customer', async (ctx, next) => {
    const customers = await getAllCustomers()
    ctx.type = jsonMIME
    ctx.body = {
      status: 0,
      data: customers
    }
  })
  router.get('/createCustomer', async (ctx, next) => {
    await ctx.render('customer/createCustomer')
  })
  router.post('/createCustomer', async (ctx, next) => {
    const result = await createCustomer(ctx.request.body)
    ctx.type = jsonMIME
    ctx.body = {
      status: 0,
      data: result
    }
  })
  app.use(router.routes()).use(router.allowedMethods())
}
