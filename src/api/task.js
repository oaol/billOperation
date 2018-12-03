import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/task/list',
    method: 'get',
    params: query
  })
}

export function fetchTask(id) {
  return request({
    url: '/task/detail',
    method: 'get',
    params: { id }
  })
}

export function updateTask(data) {
  return request({
    url: '/task/update',
    method: 'post',
    data
  })
}
