import http from '@/utils/request'

//登录
export async function login(parms){
  return await http.get("/user/login",parms);
}

export function getInfo(token) {
  return http({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}



export function logout() {
  return http({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
