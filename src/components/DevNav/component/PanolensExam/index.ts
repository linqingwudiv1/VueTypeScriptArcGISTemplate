import Vue from 'vue'
import Component from 'vue-class-component'
import { Image } from 'element-ui';

declare const PANOLENS:any;
declare const THREE:any;



class DTOModel_SceneItem
{
	constructor(_imagesrc:string, _position:any)
	{
		this.imagesrc = _imagesrc;
		this.position = _position;
	}
	public imagesrc:string = '';
	public position:any = new THREE.Vector3( 5000.00, 0.00, 0.00 );

	public children:Array<DTOModel_SceneItem> = []; 
}

class PanoramaWrapper
{
	constructor(id:string)
	{
		let canvasElement = document.getElementById(id);
		this.viewer = new PANOLENS.Viewer(
			{
				container:canvasElement ,
				//output:'overlay',
				autoHideInfospot :false,
				controlBar: false,
				horizontalView: true
			});
	}
	public viewer:any;
	public sceneData:Array<DTOModel_SceneItem> = [];  

}

@Component({
})
export default class PanolensExamComponent extends Vue {
	public progressElement:HTMLElement;

	public arr_panorama:Array<any> = [];
	public dialogVisible:boolean = false;

	private panoramaWrapper:PanoramaWrapper = null;
	mounted() 
	{

		console.log('mounted');
		console.log(this.panoramaWrapper);
		this.init();


		//setInterval(function (){
		//	console.log(viewer.outputPositionEx());
		//},1000);
		//infospot.onClick = function (){console.log('testr');};
	  }

	  public loadScene():void
	  {
		  this.panoramaWrapper.sceneData.push(new DTOModel_SceneItem
			( 
				'../../../../static/img/panorama/firefighting/scene_1.jpg', 
				new THREE.Vector3(-3478.26, -100, 3051.20))
			);
		  this.panoramaWrapper.sceneData.push(new DTOModel_SceneItem
			(
				'../../../../static/img/panorama/firefighting/scene_2.jpg', 
				new THREE.Vector3(3590.22, -100, -3431.81)
			));
		  this.panoramaWrapper.sceneData.push(new DTOModel_SceneItem
			(
				'../../../../static/img/panorama/firefighting/scene_3.jpg', 
				new THREE.Vector3(2799.18, -100, 4060.24)
			));
	  }

	  public init():boolean
	  {
		  this.progressElement 	= document.getElementById( 'progress' );
		  //this.canvasElement 	= document.getElementById('panolensCanvas');

		  this.initPanorama();
		  return true;
	  }

	  public initPanorama():boolean
	  {   
		this.panoramaWrapper = new PanoramaWrapper ('panolensCanvas');
		this.loadScene();
		
		let infospot = new PANOLENS.Infospot(500, '../../../../static/img/s.png', true);

		infospot.addEventListener('click', function ()
		{
			//panorama.load('../../../../static/img/panorama/2.jpg');
		});

		infospot.position.set( 5000.00, -665.23, -996.49 );

		this.panoramaWrapper.viewer ;


		for (let i = 0 ; i < this.panoramaWrapper.sceneData.length; i++)
		{
			let temp_panorama = new PANOLENS.ImagePanorama( this.panoramaWrapper.sceneData[i].imagesrc );

			temp_panorama.addEventListener( 'progress', this.onProgress );
			temp_panorama.addEventListener( 'enter', this.onEnter );
		
			this.arr_panorama.push( temp_panorama );
		}

		for (let i = 0; i < this.panoramaWrapper.sceneData.length; i++)
		{
			let cur_panorama = this.arr_panorama[i];
			let next_panorma =  this.arr_panorama[(i + 1) < this.arr_panorama.length ? (i + 1) : 0 ];
			
			let vec = this.panoramaWrapper.sceneData[i].position;
			cur_panorama.link(next_panorma, vec, 650);

			
			console.log(this.arr_panorama[0].linkedSpots [0]);

			let el = document.createElement('h2');
			el.innerText = '疏散点';
			//cur_panorama.linkedSpots[0].addHoverElement(el);
			/*
			this.arr_panorama[0].linkedSpots[0] .addHoverElement(el);
			console.log(this.arr_panorama[0].linkedSpots[0].element);
			this.arr_panorama[0].linkedSpots[0].setText('abc');
			let temp1 = this.arr_panorama[0].linkedSpots[0];
			temp1.lockHoverElement();
			temp1.element.style.display = 'block';
			temp1.lockHoverElement();
			*/
			this.panoramaWrapper.viewer.add(cur_panorama);


		}

		this.panoramaWrapper.viewer.outputPositionEx = function ()
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




		return true;
	  }

	  public onProgress (event:any):void
	  {
		console.log('onProgress');
        let progress = event.progress.loaded / event.progress.total * 100;
        this.progressElement.style.width = progress + '%';
		if ( progress === 100 ) 
		{
          this.progressElement.classList.add( 'finish' );
		}
	  }

	  public onEnter(event:any):void 
	  {
		console.log('onEnter');
		this.progressElement.style.width = '0';
        this.progressElement.classList.remove( 'finish' );
	  }

	  public gotofocus():void 
	  {

		  this.panoramaWrapper.viewer.panorama.linkedSpots[0].focus();
	  }

	  public openDialog():void 
	  {

		this.dialogVisible = true;
	  }
}
 