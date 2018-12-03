import Vue from 'vue'
import Component from 'vue-class-component'
import echarts from 'echarts'
import axios from 'axios'
import NavMenu from './component/NavMenu/index.vue'
import Helper from '../../../static/Common/Helper'
import moment from 'moment'
import {Prop} from "vue-property-decorator";

/*
const NavMenu = Vue.component('NavMenu', function (resolve:any){
  require('./component/NavMenu/index.vue')
});
*/
//console.log(NavMenu);
declare const $:any;
declare const WebGL:any;


@Component({
  components: {
    navmenu: NavMenu
  }
})
export default class TestHomeComponent extends Vue {

  public navdata:any =
    [
      {
        key:1,
        title:'主页',
        routeurl:'/index'
      },{
        key:2,
        title:'GIS地图',
        routeurl:'/gismapexam'
      }, {
        key:3,
        title:'表格与ECharts',
        routeurl:'/DataTable'
      },{
        key:4,
        title:'ThreeJS例子',
        routeurl:'/threeExam'
      }
    ];
  mounted () {

    console.log('Hello Vue of TypeScript On: ' + moment().format('YYYY-MM-DD HH:mm:ss'));
    this.$message({
      message: 'Hello Vue of TypeScript On: ' + moment().format('YYYY-MM-DD HH:mm:ss'),
      type: 'success',
      duration: 8000
    });
    this.$router.push({path: '/index'});

    console.log(Helper);
  }
}
  