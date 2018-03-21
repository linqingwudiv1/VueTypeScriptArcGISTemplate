import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/DevHome/index.vue'
import gismapexam from '@/components/DevHome/component/GisMapExam/index.vue'
import DataTable from '@/components/DevHome/component/DataTable/index.vue'
import three from '@/components/DevHome/component/ThreeExam/index.vue'
import index from '@/components/DevHome/component/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/index',
          name: 'index',
          component: index
        },
        {
          path: '/gismapexam',
          name: 'gismapexam',
          component: gismapexam
        },
        {
          path: '/DataTable',
          name: 'DataTable',
          component: DataTable
        },
        {
          path: '/threeExam',
          name: 'threeExam',
          component: three
        }
      ]
    }
  ]
})
