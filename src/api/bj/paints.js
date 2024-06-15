import request from '@/utils/request'

// 查询Paints列表
export function listPaints(query) {
    return request({
        url: '/api/v1/paints',
        method: 'get',
        params: query
    })
}

// 查询Paints详细
export function getPaints (id) {
    return request({
        url: '/api/v1/paints/' + id,
        method: 'get'
    })
}


// 新增Paints
export function addPaints(data) {
    return request({
        url: '/api/v1/paints',
        method: 'post',
        data: data
    })
}

// 修改Paints
export function updatePaints(data) {
    return request({
        url: '/api/v1/paints/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除Paints
export function delPaints(data) {
    return request({
        url: '/api/v1/paints',
        method: 'delete',
        data: data
    })
}

