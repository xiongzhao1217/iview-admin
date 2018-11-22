// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import installPlugin from '@/plugin'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import '../node_modules/ztree/css/zTreeStyle/zTreeStyle.css'
import '../node_modules/ztree/js/jquery-1.4.4.min.js'
import '../node_modules/ztree/js/jquery.ztree.core.js'
import '../node_modules/ztree/js/jquery.ztree.excheck.js'
import '../node_modules/ztree/js/jquery.ztree.exedit.js'
import AutoButton from './components/_comps/AutoButton.vue'
import AutoSelect from './components/_comps/AutoSelect.vue'
import AutoInput from './components/_comps/AutoInput.vue'
import AutoSwitch from './components/_comps/AutoSwitch.vue'
import AutoTable from './components/_comps/AutoTable.vue'
import Ztree from './components/_comps/ztree.vue'

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.component('AutoTable', AutoTable)
Vue.component('AutoButton', AutoButton)
Vue.component('AutoSelect', AutoSelect)
Vue.component('AutoSwitch', AutoSwitch)
Vue.component('AutoInput', AutoInput)
Vue.component('Ztree', Ztree)

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
