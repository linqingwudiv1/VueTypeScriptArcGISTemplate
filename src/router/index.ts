import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/DevHome/index.vue'
///import gismapexam from '@/components/DevHome/component/GisMapExam/index.vue'
//import DataTable from '@/components/DevHome/component/DataTable/index.vue'
//import three from '@/components/DevHome/component/ThreeExam/index.vue'
//import index from '@/components/DevHome/component/home.vue'

declare function require(paths:string[],re:any):any;
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
          component: function(resolve:any ){ require(['@/components/DevHome/component/home.vue'], resolve);} //index
        },
        {
          path: '/gismapexam',
          name: 'gismapexam',
          component: function(resolve:any ){ require(['@/components/DevHome/component/GisMapExam/index.vue'], resolve);} //gismapexam //() => import('@/components/DevHome/component/GisMapExam/index.vue') gismapexam
        },
        {
          path: '/DataTable',
          name: 'DataTable',
          component: function(resolve:any ){ require(['@/components/DevHome/component/DataTable/index.vue'], resolve);}  //DataTable //() => import('@/components/DevHome/component/DataTable/index.vue')  
        },
        {
          path: '/threeExam',
          name: 'threeExam',
          component: function(resolve:any ){ require(['@/components/DevHome/component/ThreeExam/index.vue'], resolve);} //three// () => import('@/components/DevHome/component/ThreeExam/index.vue') 
        }
      ]
    }
  ]
})
