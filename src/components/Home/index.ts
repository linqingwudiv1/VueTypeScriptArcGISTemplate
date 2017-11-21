import Vue from 'vue'
import Component from 'vue-class-component'
import echarts from 'echarts'
import axios from 'axios'
import NavMenu from './component/NavMenu/index.vue'
@Component({
  components: {
    navmenu: NavMenu
  }
})
export default class TestHomeComponent extends Vue {
  mounted ()
  {
  }
}
