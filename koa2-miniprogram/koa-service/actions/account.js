const { login } = require('../lib/db/user')
const { encodeErCode } = require('../lib/db/crypto')
const { getSession } = require('../lib/db/wx')
const { add,removeData ,updateSessionKey,getSessionKey} = require('../lib/db/code')
module.exports = {
  async login(code){
    const session = await getSession(code)
    if(session){
      const { openid } = session
      return login(openid)
    }else{
      throw new Error('登录失败')
    }
  },
  async getErCode (){
    const code = encodeErCode()
    await add(code)
    setTimeout(()=>{
      removeDate(code)
    },3000)
    return code
  },
  async setSessionKeyForCode(code,sessionKey){
    const { timespan } = decode(code)
    // 30s过期
    if(Date.now() - timespan>30){
      throw new Error('timeout')
    }
    await updateSessionKey(code,sessionKey)
  },
  async getSessionKeyByCode(code){
    const sessionKey = await getSessionKey(code)
    if(sessionKey){
      await removeDate(code)
    }
    return sessionKey
  }
}
