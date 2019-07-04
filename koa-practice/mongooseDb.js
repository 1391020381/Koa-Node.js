const mongoose = require('mongoose')
const { name, user, password, host, dialect } = require('./config').db
const url  = 'mongodb://localhost:27017/koa2-node';
mongoose.connect(url,{
  user:'',
  pass:'',
  poolSize:10,
  useNewUrlParser:true
})
const db = mongoose.connection;
db.on('error',err=>{
  console.log(err)
})

db.on('open',()=>{
  console.log('mongodb链接成功')
})

const categorySchema = new mongoose.Schema({
  name:{
    type:String,
    index:true,
    unique:true
  },
  description:String,
  createdAt:{
    type:Date,
    default:Date.now
  }
})

const Category = mongoose.model('Category',categorySchema)

const category = new Category({
  name:'test',
  description:'test category'
})

category.save(err=>{
  if(err){
    console.error(err)
    return
  }
  console.log('保存成功!')
})