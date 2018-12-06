import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/log1',
    method: 'get',
    params: query
  })
}
