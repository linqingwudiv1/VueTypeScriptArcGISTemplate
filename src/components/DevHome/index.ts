import Vue from 'vue'
import Component from 'vue-class-component'
import echarts from 'echarts'
import axios from 'axios'
import NavMenu from './component/NavMenu/index.vue'
import Helper from '../../../static/Common/Helper'
import moment from 'moment'
import {Prop} from "vue-property-decorator";
@Component({
  components: {
    navmenu: NavMenu
  }
})

export default class TestHomeComponent extends Vue {

  public navdata:any =
    [
      {
        title:'主页',
        routeurl:'/index'
      },{
        title:'GIS地图',
        routeurl:'/gismapexam'
      }, {
        title:'表格与ECharts',
        routeurl:'/DataTable'
      },{
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
