import request from '@/utils/request'

// 查询BjFormula列表
export function listBjFormula(query) {
    return request({
        url: '/api/v1/bj-formula',
        method: 'get',
        params: query
    })
}

// 查询BjFormula详细
export function getBjFormula (id) {
    return request({
        url: '/api/v1/bj-formula/' + id,
        method: 'get'
    })
}


// 新增BjFormula
export function addBjFormula(data) {
    return request({
        url: '/api/v1/bj-formula',
        method: 'post',
        data: data
    })
}

// 修改BjFormula
export function updateBjFormula(data) {
    return request({
        url: '/api/v1/bj-formula/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除BjFormula
export function delBjFormula(data) {
    return request({
        url: '/api/v1/bj-formula',
        method: 'delete',
        data: data
    })
}

