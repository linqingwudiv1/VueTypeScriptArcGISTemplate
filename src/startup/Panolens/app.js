// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import panolens from './app.vue'
import router from '../../router/panolens'

import ElementUI from 'element-ui'
import AntDesignVue from 'ant-design-vue'
import 'element-ui/lib/theme-chalk/index.css'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(AntDesignVue)

/* eslint-disable no-new */
new Vue({
  el: '#myapp',
  router: router,
  template: '<panolens/>',
  components: { panolens }
})
