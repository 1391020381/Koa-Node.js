import { GET, POST } from './request'
import baseUrl from './config'
import Taro from '@tarojs/taro'
import { func } from 'prop-types';
export function login(code) {
  return GET({  // 参数在 query上
    url: '/login',
    data: {
      code
    }
  })
}
export function bindCodeWithSessionKey(code){
  return GET({
    url:`/login/ercode/${code}`
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
     name:title
    }
  })
}
export function upladPhoto(files, name,albumId) {
  return Taro.uploadFile({
    url: `${baseUrl}/photo`,
    filePath: files[0].file.path,
    name: name,
    header: {
      "Content-Type": "multipart/form-data",
      'x-session': Taro.getStorageSync('sessionKey')
    },
    formData: {
      'id': albumId
    }
  })
}
export function getPhotosByAlbumId (albumId){
  return GET({
    url:`/xcx/album/${albumId}`
  })
}
export function deleteImage(_id){
  return POST({
    url:'/deleteImage',
    data:{
      id:_id
    }
  })
}
export function adminLogin(code){
  return GET({
    url:`/login/ercode/${code}`,
    
  })
}