import request from '@/utils/request'
// 患者列表
export function getPatientList(params) {
  return request({
    url: '/patient/pagedBatchQuery',
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

// 添加患者
export function addPatient(data) {
  return request({

    url: '/patient/insert',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

// 获取就诊信息
export function getpationconsult(params) {
  return request({
    url: '/consultation/pagedBatchQuery',
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

// 添加就诊信息
export function addconsult(data) {
  return request({
    url: '/consultation/insert',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  })
}

// 基本数据库列表
export function getAllSameData(params) {
  return request({
    url: '/commonData/getAllSameData',
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

// 添加基本数据表就诊地址全部数据
export function getAllSameData0() {
  return request({
    url: '/commonData/getAllSameData?typeId=0',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// 添加基本数据表主病诊断全部数据
export function getAllSameData1() {
  return request({
    url: '/commonData/getAllSameData?typeId=1',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// 添加基本数据表证候分类全部数据
export function getAllSameData2() {
  return request({
    url: '/commonData/getAllSameData?typeId=2',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 删除患者
export function patientDelete(data) {
  // console.log('params', params)
  return request({
    url: '/patient/delete',
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

// 修改用户
export function patientUpdate(data) {
  // console.log('params', params)
  return request({
    url: '/patient/update',
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

// 获得类型的基本数据
export function getcommonlist(param) {
  return request({
    url: '/commonData/typeListData',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      typeList: param
    }
  })
}

// 删除诊断信息
export function deleteconsult(data) {
  // console.log('params', params)
  return request({
    url: '/consultation/delete',
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


// 新增快速录入
export function addquick(data) {
  // console.log('params', params)
  return request({
    url: '/patient/quickInsert',
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

// 获得类型的基本数据
export function getConsultationInfo(consultationId, patientId) {
  return request({
    url: '/consultation/getConsultationInfo',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      consultationId: consultationId,
      patientId: patientId
    }
  })
}

// 获取患者个人信息和就诊信息
export function getPatientInfo(id, isFirst = true) {
  return request({
    url: '/patient/getPatientInfo',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      id: id,
      isFirst: isFirst
    }
  })
}
