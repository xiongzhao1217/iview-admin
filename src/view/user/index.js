export default [{
  path: 'users',
  name: 'users',
  meta: {
    icon: 'md-add',
    title: '用户管理'
  },
  component: () => import('@/view/user/users.vue')
}, {
  path: 'optLog',
  name: 'opt_log',
  meta: {
    icon: 'md-download',
    title: '操作日志'
  },
  component: () => import('@/view/user/users.vue')
}]

// 应用状态
export let userStatusMapper = {0: '无效', 1: '有效'}

// 性别
export let sexMapper = {1: '男', 2: '女'}
