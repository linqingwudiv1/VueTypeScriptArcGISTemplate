import Vue from 'vue'
import Component from 'vue-class-component'
import Paper, { ToolEvent } from 'paper'

@Component({
})
export default class PaperJSExamComponent extends Vue {
	public values:any = {
		paths: 50,
		minPoints: 5,
		maxPoints: 15,
		minRadius: 30,
		maxRadius: 90
	};
	
	public hitOptions:any = {
		segments: true,
		stroke: true,
		fill: true,
		tolerance: 5
	};

	public paper = new Paper.PaperScope();
	public segment:Paper.Segment; 
	public path:Paper.Item;
	public movePath:boolean = false;
	mounted() {
		let canvas:HTMLCanvasElement = document.getElementById('paperCanvas') as HTMLCanvasElement;

		if (canvas == null)
		{
			this.$message('element not is HTMLCanvasElement');
			return;
		}
	
		this.paper.setup(canvas);

		console.log(this.paper.tool);
		this.paper.tool = new Paper.Tool();
		this.paper.tool.onMouseDown = this.onMouseDown;

		this.createPaths();
  }

  createPaths() {
	let radiusDelta = this.values.maxRadius - this.values.minRadius;
	let pointsDelta = this.values.maxPoints - this.values.minPoints;
	for (let i = 0; i < this.values.paths; i++) {
		let radius = this.values.minRadius + Math.random() * radiusDelta;
		let points = this.values.minPoints + Math.floor(Math.random() * pointsDelta)	
		let temp_center = this.paper.view.size.multiply ( Paper.Size.random());
		let path:Paper.Path = this.createBlob( temp_center, radius, points);
		let lightness = (Math.random() - 0.5) * 0.4 + 0.4;
		let hue = Math.random() * 360;
		path.fillColor = new Paper.Color({ hue: hue, saturation: 1, lightness: lightness });
		path.strokeColor = new Paper.Color('black');
	};
  }

   createBlob(center:any, maxRadius:any, points:any): Paper.Path {
 		let path = new Paper.Path();
 		path.closed = true;
 		for (let i = 0; i < points; i++) {
 			let delta = new Paper.Point({
				length: (maxRadius * 0.5) + (Math.random() * maxRadius * 0.5),
				angle: (360 / points) * i
			}
 			);

 			path.add(center.add(delta) );
 		}
 		path.smooth();
 		return path;
   }

   
	onMouseDown(event:Paper.ToolEvent) {
		this.segment = this.path = null;
		let hitResult = this.paper.project.hitTest(event.point, this.hitOptions);
		if (!hitResult)
		{
			return;
		}

		if (hitResult) {
			this.path = hitResult.item;
		}

	}

 	onMouseDrag(event:any) {
		console.log('You dragged the mouse!');
	}

 	onMouseUp(event:any) {
		console.log('You released the mouse!');
	}
}
