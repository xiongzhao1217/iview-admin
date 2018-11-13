import container from '@/components/main/container.vue'
import Main from '@/components/main'
// import busioppoRouters from '@/view/busioppo'
export default [
  {
    path: '/applications',
    name: 'applications',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: require('./applications').default
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      icon: 'ios-stats',
      title: '用户管理'
    },
    component: Main,
    children: require('./user').default
  }
]
