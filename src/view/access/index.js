export default [{
  path: 'roles',
  name: 'roles',
  meta: {
    icon: 'md-add',
    title: '角色管理'
  },
  component: () => import('@/view/access/roles.vue')
}, {
  path: 'menus',
  name: 'menus',
  meta: {
    icon: 'md-download',
    title: '菜单管理'
  },
  component: () => import('@/view/access/menus.vue')
}]
