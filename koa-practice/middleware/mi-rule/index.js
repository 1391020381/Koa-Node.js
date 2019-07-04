const path = require('path')
const fs = require('fs')
module.exports = function(opts){
  let { app,rules = [] } = opts
  if(!app){
    throw new Error('the app params is necessary')
  } 
  
  // 提取app 实例对象中的属性名
  const appKeys = Object.keys(app)
  rules.forEach(item=>{
    let { folder,name } = item
    if(appKeys.includes(name)){
      throw new Error(`the name of ${name} already exists!`)
    }
    let  content = {}
    fs.readdirSync(folder).forEach(filename=>{
      let extname = path.extname(filename)   // 取出文件后缀
      if(extname === '.js'){
        let name = path.basename(filename,extname)   // 从文件名中去掉后缀
        // 读取文件中的内容并赋值绑定
        content[name] = require(path.join(folder,filename))
      }
    })
    app[name] = content
  })
}