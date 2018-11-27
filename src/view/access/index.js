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
  name: 'access',
  meta: {
    icon: 'ios-key',
    title: '权限管理'
  },
  component: () => import('@/view/access/menus.vue')
}]

// 权限类型
export let accessTypeMapper = {1: '菜单', 2: '按钮'}
