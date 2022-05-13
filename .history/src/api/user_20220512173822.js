import request from '@/utils/request'

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


export  function getInfo(data = {id: 1}) {
  console.log('data', data)
  return request({
    url: `/user/getUserInfo?id=1`,
    method: 'get',
  })
}

// export function getInfo(token) {
//   return http({
//     url: '/user/getUserInfo/?id=1',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return http({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
