import { GET, POST } from './request'
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
export function upladPhoto (files,name){
  return Taro.uploadFile({
    url:'/photo',
    filePath:files[0].file.path,
    name:name
  })
}