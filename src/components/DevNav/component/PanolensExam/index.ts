import Vue from 'vue'
import Component from 'vue-class-component'

declare const PANOLENS:any;
declare const THREE:any;
@Component({
})
export default class PanolensExamComponent extends Vue {

	private canvas:any;
	mounted() 
	{

		var infospot, infospot2, panorama:any, viewer:any;

		infospot = new PANOLENS.Infospot(500,'../../../../static/img/s.png');
		console.log(infospot);
		infospot.addEventListener('click',function ()
		{
			panorama.load('../../../../static/img/panorama/2.jpg');
		});
		
		//infospot.position.set( 5000.00, -665.23, -3996.49 );

		infospot.position.set( 5000.00, -665.23, -996.49 );

		//infospot.rotation.set(50,50,50);

		panorama = new PANOLENS.ImagePanorama( '../../../../static/img/panorama/1.jpg' );
		
		panorama.add( infospot );
		//panorama.add( infospot2 );

		this.canvas = document.getElementById('panolensCanvas');
		viewer = new PANOLENS.Viewer(
			{
				container:this.canvas,
				output:'overlay'
			});


		viewer.add( panorama );
		viewer.outputPositionEx = function ()
		{
			const intersects = this.raycaster.intersectObject( this.panorama, true );
			if ( intersects.length > 0 ) {
				const point = intersects[ 0 ].point.clone();
				const converter = new THREE.Vector3( -1, 1, 1 );
				const world = this.panorama.getWorldPosition( new THREE.Vector3() );
				point.sub( world ).multiply( converter );
				return point;	
			}
			return null;
		};
		console.log(viewer);

		setInterval(function (){
			console.log(viewer.outputPositionEx());
		},1000);
		infospot.onClick = function (){console.log('testr');};
	  }
	  

	  public loadScene():void 
	  {

	  }
}
 