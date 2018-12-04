import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    sqlDate: +Mock.Random.date('T'),
    hTitle: '@integer(1, 24)',
    mTime: '@integer(1, 60)',
    execStart: '@datetime',
    execEnd: '@datetime',
    useTime: 'datetime',
    flag: '@integer(1, 3)',
    period: '10',
    platforms: ['a-platform']
  }))
}

export default {
  getList: config => {
    const { execStart, execEnd, page = 1, limit = 20, sort } = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (execStart && item.execStart <= execStart) return false
      if (execEnd && item.execEnd >= execEnd) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getLog: (config) => {
    const { id } = param2Obj(config.url)
    for (const log of List) {
      if (log.id === +id) {
        return log
      }
    }
  }
}
