import request from '@/utils/request'

// 查询QuotationsV1列表
export function listQuotationsV1(query) {
    return request({
        url: '/api/v1/quotations',
        method: 'get',
        params: query
    })
}

// 查询QuotationsV1详细
export function getQuotationsV1 (id) {
    return request({
        url: '/api/v1/quotations/' + id,
        method: 'get'
    })
}


// 新增QuotationsV1
export function addQuotationsV1(data) {
    return request({
        url: '/api/v1/quotations',
        method: 'post',
        data: data
    })
}

// 修改QuotationsV1
export function updateQuotationsV1(data) {
    return request({
        url: '/api/v1/quotations/'+data.id,
        method: 'put',
        data: data
    })
}

// 删除QuotationsV1
export function delQuotationsV1(data) {
    return request({
        url: '/api/v1/quotations',
        method: 'delete',
        data: data
    })
}

