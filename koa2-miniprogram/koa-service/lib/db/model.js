const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  openId: {
    type: String,
    index: true,
    unique: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  name: {
    type: String,
    index: true
  },
  avatar: {
    type: String
  },
  userType: {
    type: Number
  }
})

const codeSchema = new mongoose.Schema({
  code: {
    // 存储二维码字符串
    tyep: String
  },
  sessionKey: String // 存储小程序的登录凭证
})
const albumSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    name: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: 'created',
      updateAt: 'updated'
    }
  }
)

const photoSchema = new mongoose.Schema({
   userId:{
     type:String
   },
   url:{
     type:String
   },
   isApproved:{  // 照片审核字段
     type:Boolean,
     defalut:null,
     index:true
   },
   albumId:{
     type:mongoose.Schema.Types.ObjectId
   },
   created:{
     type:Date,
     default:Date.now
   },
   isDelete:{
     type:Boolean,
     default:false
   }
})

module.exports = {
  User: mongoose.model('User', userSchema),
  Code: mongoose.model('Code', codeSchema),
  Album:mongoose.model('Album',albumSchema),
  Photo:mongoose.model('Photo',photoSchema)
}
