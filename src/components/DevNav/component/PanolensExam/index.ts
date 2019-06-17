import Vue from 'vue'
import Component from 'vue-class-component'
import Paper, { ToolEvent, Size } from 'paper'

class SimplePanAndZoom
{
	public changeZoom(oldZoom:any, delta:number) 
	{
		let factor:any = 1.05;
		if ( delta < 0 )
		{
			return oldZoom * factor;
		}
		if ( delta > 0 )
		{
			return oldZoom / factor;
		}
		return oldZoom;
	}

	public changeCenter(oldCenter:Paper.Point, deltaX:number, deltaY:number, factor:number)
	{
		let offset:Paper.Point = new Paper.Point (deltaX, -deltaY);
		offset = offset.multiply (factor);
		oldCenter.add(offset) ;
	}
}


@Component({
})
export default class PanolensExamComponent extends Vue {
	mounted() {
  	}
}
