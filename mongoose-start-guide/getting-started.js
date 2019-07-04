const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongoose-start-guide',{ useNewUrlParser:true})
const db = mongoose.connection
db.on('error',(err)=>{
  console.log(`mongoDB链接错误:${err}`)
})
db.once('open',()=>{
  console.log(`mongoDB链接成功`)
})
const kittySchema = mongoose.Schema({
  name:String
})

kittySchema.methods.speak = function(){
  let greeting = this.name ?'Meow name is' + this.name:'I don`t have a nanme'
  console.log(greeting)
}
const Kitten = mongoose.model('Kitten',kittySchema)

const felyne = new Kitten({name:'Felyne'})

// felyne.speak()

felyne.save(function(err,felyne){
  if(err) return err
  felyne.speak()
})
Kitten.find(function(err,kittens){
  if(err) return console.log(err)
  console.log(kittens)
  kittens.forEach(item=>{
    item.speak()
  })
})