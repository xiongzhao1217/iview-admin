export default [{
  path: 'users',
  name: 'users',
  meta: {
    icon: 'md-person',
    title: '用户管理'
  },
  component: () => import('@/view/user/users.vue')
}, {
  path: 'optlog',
  name: 'optlog',
  meta: {
    icon: 'ios-folder',
    title: '操作日志'
  },
  component: () => import('@/view/user/users.vue')
}]

// 用户状态
export let userStatusMapper = {0: '无效', 1: '有效'}

// 性别
export let sexMapper = {1: '男', 2: '女'}
