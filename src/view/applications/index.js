export default [{
  path: 'apps',
  name: '应用管理',
  meta: {
    icon: 'ios-apps',
    title: '应用管理'
  },
  component: () => import('@/view/applications/apps.vue')
}]

// 应用状态
export let appStatus = {0: '无效', 1: '有效'}
