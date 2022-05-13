import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function getSessionId() {
  return request({
    url: '/user/getSessionId',
    method: 'get'
  })
}


export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
