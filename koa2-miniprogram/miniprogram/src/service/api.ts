import { GET, POST } from './request'
export function login(code) {
  return GET({
    url: '/login',
    data: {
      code
    }
  })
}

export function getAlbumList() { // 通过sessionKey来标识每个用户
  return GET({
    url: '/xcx/album',
    data: {}
  })
}