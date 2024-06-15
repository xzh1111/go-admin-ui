import request from '@/utils/request'

// 查询Regions列表
export function listRegions(query) {
    return request({
        url: '/api/v1/regions',
        method: 'get',
        params: query
    })
}

// 查询Regions详细
export function getRegions (id) {
    return request({
        url: '/api/v1/regions/' + id,
        method: 'get'
    })
}


// 新增Regions
export function addRegions(data) {
    return request({
        url: '/api/v1/regions',
        method: 'post',
        data: data
    })
}

// 修改Regions
export function updateRegions(data) {
    return request({
        url: '/api/v1/regions/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除Regions
export function delRegions(data) {
    return request({
        url: '/api/v1/regions',
        method: 'delete',
        data: data
    })
}

