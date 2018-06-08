import Vue from 'vue'
import Component from 'vue-class-component'
import {Prop} from "vue-property-decorator";

@Component({
})
export default class TestNavMenuComponent extends Vue {
  
  @Prop()
  public navdata:any;
  public testdata:any = '';

  mounted(){
  }

  beforeCreate(){
    console.log('beforeCreate');
  }
}
