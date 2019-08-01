import request from '@/utils/request'

export function getQrcode() {
  return request({
    url: '/login/ercode',
    method: 'get'
  })
}
export function getUserInfo(code) {
  return request({
    url: `/login/errcode/check/${code}`,
    method: 'get',
    timeout: 60000
  })
}
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
