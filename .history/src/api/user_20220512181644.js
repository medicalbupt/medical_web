import request from '@/utils/request'
import Qs from 'qs'

//登录
export  function login(data){
  return request({
    // url: '/user/login',
    url: '/user/login',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: data
  })
}


export  function getInfo(params) {
  console.log('params', params)
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    params: qs.stringify({
      id: 1
    })
    ,paramsSerializer:function(params) {
      return Qs.stringify(params, {})
    }
  })
}

// export function getInfo(token) {
//   return http({
//     url: '/user/getUserInfo/?id=1',
//     method: 'get',
//     data: { token }
//   })
// }

// export function logout() {
//   return http({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
