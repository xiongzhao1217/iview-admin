export default [{
  path: 'roles',
  name: 'roles',
  meta: {
    icon: 'ios-man',
    title: '角色管理'
  },
  component: () => import('@/view/access/roles.vue')
}, {
  path: 'menus',
  name: 'menus',
  meta: {
    icon: 'md-menu',
    title: '菜单管理'
  },
  component: () => import('@/view/access/menus.vue')
}, {
  path: 'access',
  name: 'accesses',
  meta: {
    icon: 'ios-key',
    title: '权限管理'
  },
  component: () => import('@/view/access/access.vue')
}]

// 权限类型
export let accessTypeMapper = {1: '菜单', 2: '按钮'}

// 图标大全
export let iconMapper = {
  'ios-add': 'ios-add<Icon type="ios-add"/>',
  'md-add': 'md-add<Icon type="md-add" />',
  'ios-add-circle': 'ios-add-circle<Icon type="ios-add-circle" />'
}
