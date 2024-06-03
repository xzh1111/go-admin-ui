import request from '@/utils/request'

// 查询Styles列表
export function listStyles(query) {
  return request({
    url: '/api/v1/styles',
    method: 'get',
    params: query
  })
}

// 查询Styles详细
export function getStyles(id) {
  return request({
    url: '/api/v1/styles/' + id,
    method: 'get'
  })
}

// 新增Styles
export function addStyles(data) {
  return request({
    url: '/api/v1/styles',
    method: 'post',
    data: data
  })
}

// 修改Styles
export function updateStyles(data) {
  return request({
    url: '/api/v1/styles/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除Styles
export function delStyles(data) {
  return request({
    url: '/api/v1/styles',
    method: 'delete',
    data: data
  })
}

