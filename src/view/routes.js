import Main from '@/components/main'
export default [
  {
    path: '/app',
    name: 'app',
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
      icon: 'md-person',
      title: '用户管理'
    },
    component: Main,
    children: require('./user').default
  },
  {
    path: '/access',
    name: 'access',
    meta: {
      icon: 'md-lock',
      title: '权限控制'
    },
    component: Main,
    children: require('./access').default
  }
]
