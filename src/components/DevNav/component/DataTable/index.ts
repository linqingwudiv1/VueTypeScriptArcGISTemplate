import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios'
import echarts from 'echarts'
import {Prop,Watch} from "vue-property-decorator";

@Component({

})
export default class TestDataTableComponent extends Vue {

  bDialog_visiable:boolean = true;
  requrl:string = 'http://element.eleme.io/versions.json';
  resdata:string = '程序猿永不为奴';
  tableData:any =[{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }] ;

  mounted() {
    console.log('HomeComponent');
    console.log(echarts);
    if (echarts != null)
    {    
      let myEchart:any = echarts.init(document.getElementById('echart'));
      let option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]};
      myEchart.setOption(option);
    }

  }
  OnClick_ReqData():void
  {
    let _this = this;
    
    axios.get(this.requrl).then(res=>
    {
      console.log(res.data);
      _this.resdata = res.data;
    });

  }
  OnClick():void
  {
    this.bDialog_visiable = true;
  }
}
