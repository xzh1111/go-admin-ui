// 查询列表
export function getItems(f, query) {
  query = query || { pageSize: 10000 }
  return f(query)
}

export function setItems(response, k, v) {
  const data = []
  k = k || 'id'
  v = v || 'name'
  if (response.data && response.data.list && response.data.list.length > 0) {
    // console.log('response.data.list 1:', response.data.list)
    response.data.list.forEach(e => {
      data.push({
        key: e[k].toString(),
        value: e[v].toString()
      })
    })
    return data
  }
}

export function setItemsNew(response, fields = [], newFields = []) {
  const data = []

  if (response.data && response.data.list && response.data.list.length > 0) {
    // console.log('response.data.list 2:', response.data.list)

    response.data.list.forEach(e => {
      const item = {
        key: e['name'],
        value: e['name']
      }
      // 遍历额外的字段
      fields.forEach((field, idx) => {
        let keyName = field
        if (newFields.length > idx) {
          keyName = newFields[idx]
          // console.log('response keyName:', keyName)
        }
        item[keyName] = e[field]
        // console.log('response keyName:', keyName, 'value:', e[field], 'field:', field)
      })
      data.push(item)
    })
    // console.log('response data 2:', data)

    return data
  }
}
