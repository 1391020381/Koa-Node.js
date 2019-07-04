const { appKey, appSecret } = require('../../config')
const request = require('request')

module.exports = {
  async getSession(code) {
    // get url
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appKey}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
    return new Promise((resolve, reject) => {
      request(
        url,
        {
          method: 'GET',
          json: true
        },
        (err, res, body) => {
          if (err) {
            reject(err)
          } else {
            if (body.errcode) {
              reject(new Error(body.errmsg))
            } else {
              console.log('jscode2session:',body)
              //  { session_key: 'YZbXQgvu21uKPlJ3orBzFw==',openid: 'oJte31LdIzkQPN4h81H02q0ujmCM' }
              resolve(body)
            }
          }
        }
      )
    })
  }
}
