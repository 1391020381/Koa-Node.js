const { findBySessionKey } = require('../lib/db/user')
module.exports = async function(ctx,next){
  const sessionKey = ctx.get('x-session')
  if(!sessionKey){
    ctx.throw(401,'请求头中未包含x-session')
  }
  const user = await findBySessionKey(sessionKey)
  if(user){
    ctx.state.user = {
      id:user_id,
      name:user.name,
      avatar:user.avatar,
      isAdmin:user.userType === 1
    }
  }else{
    ctx.throw(401,'session过期')
  }
  await next()
}