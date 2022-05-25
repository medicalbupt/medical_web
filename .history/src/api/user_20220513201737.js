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

// 做test用的患者新增接口
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
      curMedicalRecord: "221",
      familyHistory: "1221",
      gender: 0,
      idCard: "1221",
      modifiedTime: "2022-05-13T11:25:37.409Z",
      pastHistory: "1221",
      patientName: "1221",
      personalHistory: "1122",
      status: 0,
      telephone: "122"
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
