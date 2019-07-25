import { GET, POST } from './request'
export default  function login(code) {
  return GET({
    url: '/login',
    data: {
      code
    }
  })
}