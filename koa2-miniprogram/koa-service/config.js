const env = process.env
const appKey = env.APP_KEY || 'wx1aa122b03b0cf697'
const appSecret = env.APP_SECRET || '9132cc90837733d1ea38e1e62a991c0a'
const nodeEnv = env.NODE_ENV

let db = {
  name:'mongodb://127.0.0.1:27017/cloudAlbum',
  user:'',
  password:''
}
if(nodeEnv === 'production'){
  db = {
    
  }
}

module.exports = {
  appKey,
  appSecret,
  db
}