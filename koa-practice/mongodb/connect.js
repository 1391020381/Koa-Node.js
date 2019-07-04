const mongoose = require('mongoose')
const url  = 'mongodb://localhost:27017/koa2-node';
async function connect (){
  await mongoose.connect(url,{
    user:'',
    pass:'',
    poolSize:10,
    useNewUrlParser:true
  })
}
async function connect(){
  await mongoose.connection.close()
}

module.exports = {
  mongoose,
  connect,
  connect
}