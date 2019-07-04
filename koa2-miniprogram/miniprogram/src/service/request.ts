import Taro from '@tarojs/taro'
import baseUrl from './config'

function request(params, method = 'GET') {
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
  return Taro.request(option)
}

export function GET(url, data, options) {
  let newOptions = Object.assign({}, url, data, options)
  return request(newOptions)
}

export function POST(url, data, options) {
  let newOptions = Object.assign({}, url, data, options)
  return request(newOptions,'POST')
}
