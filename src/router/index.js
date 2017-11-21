import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/index.vue'
import gismapexam from '@/components/Home/component/GisMapExam/index.vue'
import DataTable from '@/components/Home/component/DataTable/index.vue'
import index from '@/components/Home/component/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/gismapexam',
          name: 'gismapexam',
          component: gismapexam
        },
        {
          path: '/index',
          name: 'index',
          component: index
        },
        {
          path: '/DataTable',
          name: 'DataTable',
          component: DataTable
        }
      ]
    }
  ]
})
