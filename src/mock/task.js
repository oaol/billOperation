import Mock from 'mockjs'

const List = []

  List.push(Mock.mock({
    flag: 'N',
    sqlDate: '@datetime',
    startTime: '@datetime',
    endTime: +Mock.Random.date('T'),
    unit: 'M',
    period: '@integer(1, 5)',
    // 'flag|1': ['CN', 'US', 'JP', 'EU'],
    platforms: ['a-platform']
  }))
export default {
  getList: config => {
    return {
      total: List.length,
      items: List
    }
  },
  updateTask: () => ({
    data: 'success'
  })
}
