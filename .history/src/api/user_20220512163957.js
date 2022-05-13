import http from '@/utils/request'

//登录
export async function login(parms){
  return await http({
    url: "/user/login",parms
  });
}


export async function getInfo() {
  return await http.get("/user/getUserInfo?id=1")
}

// export function getInfo(token) {
//   return http({
//     url: '/user/getUserInfo/?id=1',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return http({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
