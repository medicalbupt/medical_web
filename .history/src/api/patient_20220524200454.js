import request from '@/utils/request'
//患者列表
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

//添加患者
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

//添加患者
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

// 添加基本数据表
export function getAllSameData(params) {
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


