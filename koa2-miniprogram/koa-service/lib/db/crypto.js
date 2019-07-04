
// 本示例中,生成登录凭证采用的是对称加密算法,将用户ID 时间戳及一些额外的信息加密得到登录凭证,在后面通过登录凭证校验用户的时候,可以解密得到用户ID 和时间戳,此时可以通过计算时间戳来校验登录凭证是否过期。


const crypto = require('crypto')
const secret = 'justdoit'
const algorithm = 'aes-256-cbc'

function encode (id){
  const encoder = crypto.createCipher(algorithm, secret)
  const str = [id,Date.now(),'justdoit'].join('|')
  let encrypted = encoder.update(str,'utf8','hex')
  encrypted += encoder.final('hex')
  return encrypted
}
function decode (str) {
  const decoder = crypto.createDecipher(algorithm,secret)
  let decoded = decoder.update(str,'hex','utf8')
  decoded += decoder.final('utf8')
  const arr = decoded.split('|')
  return {
    id:arr[0],
    timespan:parseInt(arr[1])
  }
}
function encodeErCode (){
  return encode(Math.random())
}

module.exports = {
  encode,
  decode,
  encodeErCode
}
