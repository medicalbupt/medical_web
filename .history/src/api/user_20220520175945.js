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


export  function getInfo(id) {
  // console.log('params', params)
  return request({
    url: `/user/getUserInfo?id=${id}`,
    method: 'get'
    // paramsSerializer:function(params) {
    //   return Qs.stringify(params, {arrayFormat: 'indices'})
    // }
  })
}

// 获取当前用户信息(带参数)
export  function getInfo2(id) {
  // console.log('params', params)
  return request({
    url: `/user/getUserInfo?id=${id}`,
    method: 'get'
    // paramsSerializer:function(params) {
    //   return Qs.stringify(params, {arrayFormat: 'indices'})
    // }
  })
}

// 修改用户密码
export  function modifyPassword(data) {
  // console.log('params', params)
  return request({
    url: '/user/updatePassword',
    method: 'post',
    // paramsSerializer:function(params) {
    //   return Qs.stringify(params, {arrayFormat: 'indices'})
    // }
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}


// 分页查询用户接口
export  function pageBatchQuery(data) {
  // console.log('params', params)
  return request({
    url: '/user/pageBatchQuery',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params:data
  })
}

// 新增用户
export  function useradd(data) {
  // console.log('params', params)
  return request({
    url: '/user/insert',
    method: 'post',
    // paramsSerializer:function(params) {
    //   return Qs.stringify(params, {arrayFormat: 'indices'})
    // }
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

// // 做test用的患者新增接口
// export  function pationinset(data) {
//   // console.log('params', params)
//   return request({
//     url: '/patient/insert',
//     method: 'post',
//     // paramsSerializer:function(params) {
//     //   return Qs.stringify(params, {arrayFormat: 'indices'})
//     // }
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: data
//   })
// }

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
