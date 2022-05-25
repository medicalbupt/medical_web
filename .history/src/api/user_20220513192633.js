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


export  function getInfo() {
  // console.log('params', params)
  return request({
    url: '/user/getUserInfo?id=1',
    method: 'get'
    // paramsSerializer:function(params) {
    //   return Qs.stringify(params, {arrayFormat: 'indices'})
    // }
  })
}

export  function pationinset() {
  // console.log('params', params)
  return request({
    url: '/user/getUserInfo?id=1',
    method: 'post'
    // paramsSerializer:function(params) {
    //   return Qs.stringify(params, {arrayFormat: 'indices'})
    // }
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
