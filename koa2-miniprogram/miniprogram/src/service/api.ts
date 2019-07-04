import {GET,POST} from './request'
export default function login (code){
   GET({
    url:'/login',
    data:{
      code
    }
  })
}