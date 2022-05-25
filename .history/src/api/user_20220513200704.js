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
    url: '/patient/insert',
    method: 'post',
    // paramsSerializer:function(params) {
    //   return Qs.stringify(params, {arrayFormat: 'indices'})
    // }
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      birthday: "2022-05-13T11:25:37.409Z",
      createTinme: "2022-05-13T11:25:37.409Z",
      curMedicalRecord: "21",
      familyHistory: "121",
      gender: 0,
      idCard: "121",
      modifiedTime: "2022-05-13T11:25:37.409Z",
      pastHistory: "121",
      patientName: "121",
      personalHistory: "112",
      status: 0,
      telephone: "12"
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
