const mongoose = require('mongoose')
const { name,user,password } = require('../../config').db
module.exports = {
  open(){
    return mongoose.connect(name,{
      user:user,
      pass:password,
      poolSize:10,
      useNewUrlParser:true,
      useCreateIndex:true
    })
  },
  close(){
    return mongoose.connection.close()
  },
  error(){
    return mongoose.connection.on('error',(err)=>{
      if(err){
        console.log(`mongoose 发生错误:`,err)
      }
    })
  }
}