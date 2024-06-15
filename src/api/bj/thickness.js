import request from '@/utils/request'

// 查询Thickness列表
export function listThickness(query) {
    return request({
        url: '/api/v1/thickness',
        method: 'get',
        params: query
    })
}

// 查询Thickness详细
export function getThickness (id) {
    return request({
        url: '/api/v1/thickness/' + id,
        method: 'get'
    })
}


// 新增Thickness
export function addThickness(data) {
    return request({
        url: '/api/v1/thickness',
        method: 'post',
        data: data
    })
}

// 修改Thickness
export function updateThickness(data) {
    return request({
        url: '/api/v1/thickness/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除Thickness
export function delThickness(data) {
    return request({
        url: '/api/v1/thickness',
        method: 'delete',
        data: data
    })
}

