import Vue from 'vue'
import Component from 'vue-class-component'
import echarts from 'echarts'
import axios from 'axios'
import NavMenu from './component/NavMenu/index.vue'
import Helper from '../../../static/Common/Helper'
import moment from 'moment'
@Component({
  components: {
    navmenu: NavMenu
  }
})

export default class TestHomeComponent extends Vue {
  mounted ()
  {

    console.log('Hello Vue of TypeScript On: ' + moment().format('YYYY-MM-DD HH:mm:ss'));
    this.$message({
      message: 'Hello Vue of TypeScript On: ' + moment().format('YYYY-MM-DD HH:mm:ss'),
      type: 'success',
      duration:8000
    });
    this.$router.push({path:'/index'})
    console.log(Helper);
  }
}
