import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/task',
    method: 'get',
    params: query
  })
}

export function updateTask(data) {
  return request({
    url: '/task',
    method: 'put',
    data
  })
}
