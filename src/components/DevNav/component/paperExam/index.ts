import Vue from 'vue'
import Component from 'vue-class-component'
import Paper, { ToolEvent, Size } from 'paper'
import { setInterval } from 'timers';


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
export default class PaperJSExamComponent extends Vue {
	public values:any = {
		paths: 50		,
		minPoints: 5	,
		maxPoints: 15	,
		minRadius: 30	,
		maxRadius: 90
	};
	
	public hitOptions:any = {
		segments: true	,
		stroke: true	,
		fill: true		,
		tolerance: 5
	};

	public State:any = {
		ZoomIning: false,
		ZoomOuting: false
	};

	public SetupLength:number = 15;

	public paper = new Paper.PaperScope();
	public segment:Paper.Segment; 
	public path:Paper.Path;
	public movePath:boolean = false;
	mounted() {

		let canvas:HTMLCanvasElement = document.getElementById('paperCanvas') as HTMLCanvasElement;

		if (canvas == null)
		{
			this.$message('element not is [HTMLCanvasElement] Class');
			return;
		}

		canvas.addEventListener('mousewheel', this.onMouseWheel);
		canvas.addEventListener('resize', this.onResize);
	
		this.paper.setup(canvas);


		let width:number =  canvas.width;
		let height:number = canvas.height;

		this.createGrid(width,height);
		
		//Event Bind
		this.paper.tool = new Paper.Tool();
		this.paper.tool.onMouseDown = this.onMouseDown;
		this.paper.tool.onMouseUp = this.onMouseUp;
		this.paper.tool.onMouseMove = this.onMouseMove;
		this.paper.tool.onMouseDrag = this.onMouseDrag;


		this.createPaths();
		this.paper.view.update();


		let url = 'static/img/unreal.png';
		let raster = new Paper.Raster(url);
		console.log (raster.view.center);
		raster.onLoad = () =>
		{
			console.log('imag Loaded');
		};
		
  	}

  private createGrid(width:number, height:number) :void 
  {

		for( let x = -width * 5; x < width * 5; x += this.SetupLength  )
		{
			let linePath = new Paper.Path.Line( new Paper.Point(x, -height * 5), new Paper.Point(x, height * 5) );
			linePath.name = 'gridLine';
			linePath.strokeColor  = new Paper.Color(52, 52, 52, 0.5) ;
			linePath.strokeWidth = ( x % (this.SetupLength * 5) == 0 ? 2 : 1 );
			linePath.smooth();
		}
		for( let y = -height * 5; y < height * 5; y += this.SetupLength  )
		{
			let linePath = new Paper.Path.Line( new Paper.Point(-width * 5, y), new Paper.Point(width * 5, y) );
			linePath.name = 'gridLine';
			linePath.strokeColor  = new Paper.Color(52,52,52,0.5) ;

			linePath.strokeWidth = ( y % (this.SetupLength * 5) == 0 ? 2 : 1);
			linePath.smooth();
		}
  }

   private createPaths() :void
   {
		let radiusDelta:number = this.values.maxRadius - this.values.minRadius;
 		let pointsDelta:number = this.values.maxPoints - this.values.minPoints;
 
 		for (let i = 0; i < this.values.paths; i++) 
 		{
 			let radius:number = this.values.minRadius + Math.random() * radiusDelta;
 			let points:number = this.values.minPoints + Math.floor(Math.random() * pointsDelta);
 			let temp_center:Paper.Point =new Paper.Point(this.paper.view.size.multiply ( Paper.Size.random())) ;
 			let path:Paper.Path = this.createBlob( temp_center, radius, points);
 			let lightness:number = (Math.random() - 0.5) * 0.4 + 0.4;
 			let hue:number = Math.random() * 360;
 			path.fillColor = new Paper.Color({ hue: hue, saturation: 1, lightness: lightness });
 			path.strokeColor = new Paper.Color('black');
 			path.strokeWidth = 5;
 		}
   }

   private createBlob(center:Paper.Point, maxRadius:number, points:number): Paper.Path {
  		let path = new Paper.Path();
  		path.closed = true;
 		 for (let i = 0; i < points; i++) 
 		 {
  			let delta = new Paper.Point(
 			{
 				length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
 				angle: (360 / points) * i
 			});
  			path.add( center.add(delta) );
  		}
  		path.smooth();
  		return path;
    }

    onResize(event:any) 
    {

	}   

	onMouseDown(event:Paper.ToolEvent) {
		this.segment = this.path = null;


		let hitResult:Paper.HitResult = this.paper.project.hitTest(event.point, this.hitOptions);

		if (!hitResult || 
			(hitResult.item &&  hitResult.item.name == 'gridLine') )
		{
			return;
		}

		let modifiers:any = event.modifiers as any;
		
		if (modifiers.shift) 
		{
			if (hitResult.type == 'segment') 
			{
				hitResult.segment.remove();
			}
			return;
		}

		if ( hitResult ) {
			this.path = hitResult.item as Paper.Path;

			switch(hitResult.type )
			{
				case 'segment':
				{
					this.segment = hitResult.segment;
					break;
				}
				case 'stroke':
				{
					let location:Paper.CurveLocation = hitResult.location;
					
					this.segment = this.path.insert(location.index + 1, event.point);
					this.path.smooth();
					
					break;
				}

			}
		}

		this.movePath = ( hitResult.type == 'fill' );

		if (this.movePath)
		{
			this.paper.project.activeLayer.addChild(hitResult.item);
		}
	}

	onMouseUp(event:any) 
	{
		console.log('You released the mouse!');
	}

	onMouseMove(event:ToolEvent)
	{
		this.paper.project.activeLayer.selected = false;
		
		if (event.item && 
			event.item.name != 'gridLine')
		{
			event.item.selected = true;
		}

	}

	onMouseDrag(event:ToolEvent) 
	{

		let modifiers = event.modifiers as any;
		if (this.segment) 
		{
			this.segment.point = this.segment.point.add( event.delta );
			this.path.smooth();
		} 
		else if (this.path) 
		{
			this.path.position = this.path.position.add(event.delta) ;
		}
		else 
		{
			this.paper.view.center = this.paper.view.center.add( event.delta.multiply(-0.4));
		}
	}

	changeZoom(oldZoom:any, delta:number) 
	{
		const factor = 1.05;
		if (delta < 0) {
		  return oldZoom * factor;
		}
		if (delta > 0) {
		  return oldZoom / factor;
		}
		return oldZoom;
	}

	changeCenter(oldCenter:Paper.Point, deltaX:number, deltaY:number, factor:number) :Paper.Point
	{
		let offset = new paper.Point(deltaX, -deltaY);
		offset = offset.multiply(factor);
		return oldCenter.add(offset);
	}

	onMouseWheel(event:any)
	{
		this.paper.view.zoom -= event.deltaY / 100 / 50;
	}

	ZoomInPress(event:any):void
	{
		this.State.ZoomIning = true;
		let temp_time = setInterval(()=>{
			if (this.State.ZoomIning == true)
			{
				this.paper.view.zoom += 0.01;
			}
			else
			{
				clearInterval(temp_time);
			}
		} ,41.6);

		console.log('ZoomIn');

	}

	ZoomInRelease(event:any):void
	{

		console.log('ZoomIn Release');
		this.State.ZoomIning = false;
	}

	ZoomOutPress(event:any):void
	{
		this.State.ZoomOuting = true;
		let temp_time = setInterval(()=>{
			if (this.State.ZoomOuting == true)
			{
				this.paper.view.zoom -= 0.01;
			}
			else
			{
				clearInterval(temp_time);
			}
		} ,41.6);
		console.log('ZoomOut Press');
	}

	ZoomOutRelease(event:any):void
	{
		console.log('ZoomOut Release');
		this.State.ZoomOuting = false;
	}
}
