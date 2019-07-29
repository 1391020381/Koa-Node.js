import { GET, POST } from './request'
import baseUrl from './config'
import Taro from '@tarojs/taro'
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
export function createAlbum(title) {
  return POST({
    url: '/album',
    data: {
      title
    }
  })
}
export function upladPhoto(files, name) {
  return Taro.uploadFile({
    url: `${baseUrl}/photo`,
    filePath: files[0].file.path,
    name: name,
    header: {
      "Content-Type": "multipart/form-data",
      'x-session': Taro.getStorageSync('sessionKey')
    }
  })
}