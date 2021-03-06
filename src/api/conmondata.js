import request from '@/utils/request'

// 基本数据库列表
export function getDataList(params) {
  return request({
    url: '/commonData/pagedBatchQuery',
    method: 'get',
    // headers: {
    //     'Content-Type': 'application/json'
    // },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params
  })
}

// 删除数据
export function infomationDelete(data) {
  return request({

    url: '/commonData/delete',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

// 添加数据
export function adddinfomation(data) {
  return request({

    url: '/commonData/insert',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

// 编辑
export function editmationSubmit(data) {
  return request({

    url: '/commonData/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

// 新增数据类型
export function addtype(data) {
  return request({

    url: '/commonData/insertType',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

// 根据类型id获取基本类别
export function gettypelist(params) {
  return request({
    url: '/commonData/typeListData',
    method: 'get',
    // headers: {
    //     'Content-Type': 'application/json'
    // },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params
  })
}

// 根据类型id获取基本类别
export function getAllType() {
  return request({
    url: '/commonData/getAllType',
    method: 'get',
    // headers: {
    //     'Content-Type': 'application/json'
    // },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
