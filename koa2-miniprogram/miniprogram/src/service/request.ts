import Taro from '@tarojs/taro'
import baseUrl from './config'

 async function  request(params, method = 'GET') {
  console.log('request-params:',params)
  let { url, data } = params
  let contentType = 'application/x-www-form-urlencoded'
  contentType = params.contentType || contentType
  const option = {
    isShowLoading: false,
    url: baseUrl + url,
    data: data,
    method: method,
    header: {
      'content-type': contentType,
      'x-session': Taro.getStorageSync('sessionKey')
    }
  }
   try{
     const {statusCode,errMsg,data} = await Taro.request(option)
     if(statusCode === 200){
      return  Promise.resolve(data)
     }else{
       console.log('errMsg:',errMsg)
     }
   }catch(e){
    return  Promise.reject(e)
   }
}

export function GET(url, data, options) {
  let newOptions = Object.assign({}, url, data, options)
  return request(newOptions)
}

export function POST(url, data, options) {
  let newOptions = Object.assign({}, url, data, options)
  return request(newOptions,'POST')
}
