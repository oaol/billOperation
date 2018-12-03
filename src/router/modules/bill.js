/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/views/layout/Layout'

const billRouter = {
  path: '/bill',
  component: Layout,
  redirect: '/bill/task',
  name: 'Bill',
  meta: {
    title: 'bill',
    icon: 'table'
  },
  children: [
    {
      path: 'task',
      component: () => import('@/views/bill/task'),
      name: 'Task',
      meta: { title: 'task' }
    },
    {
      path: 'log',
      component: () => import('@/views/bill/log'),
      name: 'Log',
      meta: { title: 'log' }
    }
  ]
}
export default billRouter
