import request from '@/utils/request'

//基本数据库列表
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

//删除数据
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

//添加数据
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
