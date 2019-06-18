import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/DevNav/component/PanolensExam/index.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Panolens',
      name: 'Panolens',
      component: Home
    }
  ]
})
