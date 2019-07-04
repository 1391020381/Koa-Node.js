const fs = require('fs')
const path = require('path')

module.exports = {
  index: async (ctx, next) => {
    await ctx.render('upload/index', {
      title: '图片上传'
    })
  },
  reName: async (ctx, next) => {
  //  console.log('ctx.req:', ctx.req)
    let files = ctx.req.files
    let errs = []
    let result
    files.forEach(item => {
      let { originalname, path: out_path, mimetype } = item
      let newName = out_path + path.parse(originalname).ext
      let err = fs.renameSync(out_path, newName)
      errs.push(err)
    })

    if (errs.length) {
      result = '<h1>upload success</h1>'
    }else{
      result = 'reName错误'
    }
    ctx.response.body = result
  } // 文件上传的路径
}
