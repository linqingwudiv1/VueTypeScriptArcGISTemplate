import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import moment from 'moment'


/** threejs */
declare const THREE:any;
declare const WEBGL:any;
declare const Stats:any;
/** threejs */

/** */
/*
 * Cloth Simulation using a relaxed constraints solver
 */
class Particle
{
  public position = new THREE.Vector3();
  public previous = new THREE.Vector3();
  public original = new THREE.Vector3();
  public a = new THREE.Vector3( 0, 0, 0 );
  public mass:any;
  public invMass:any;
  public tmp = new THREE.Vector3();
  public tmp2 = new THREE.Vector3();
  constructor(x:any, y:any, z:any, mass:any)
  {
    this.mass = mass;
    this.invMass = 1 / mass;

	  // init
	  clothFunction( x, y, this.position ); // position
	  clothFunction( x, y, this.previous ); // previous
	  clothFunction( x, y, this.original );
  }

  public addForce ( force:any )
  {
    this.a.add(
      this.tmp2.copy( force ).multiplyScalar( this.invMass )
    );
  }

  public integrate (timesq:any)
  {
    var newPos = this.tmp.subVectors( this.position, this.previous );
    //console.log(newPos);
    newPos.multiplyScalar( DRAG ).add( this.position );
    newPos.add( this.a.multiplyScalar( timesq ) );
  
    this.tmp = this.previous;
    this.previous = this.position;
    this.position = newPos;
  
    this.a.set( 0, 0, 0 );
  }
}

class Cloth
{
  public w:any;
  public h:any;
  public particles:any;
  public constraints:any;

  constructor(w:any, h:any)
  {
    w = w || 10;
    h = h || 10;
    this.w = w;
    this.h = h;
  
    var particles = [];
    var constraints = [];
  
    var u, v;
  
    // Create particles
    for ( v = 0; v <= h; v ++ ) {
  
      for ( u = 0; u <= w; u ++ ) {
  
        particles.push(
          new Particle( u / w, v / h, 0, MASS )
        );
  
      }
  
    }
  
    // Structural
  
    for ( v = 0; v < h; v ++ ) {
  
      for ( u = 0; u < w; u ++ ) {
  
        constraints.push( [
          particles[ this.index( u, v ) ],
          particles[ this.index( u, v + 1 ) ],
          restDistance
        ] );
  
        constraints.push( [
          particles[ this.index( u, v ) ],
          particles[ this.index( u + 1, v ) ],
          restDistance
        ] );
  
      }
  
    }
  
    for ( u = w, v = 0; v < h; v ++ ) {
  
      constraints.push( [
        particles[ this.index( u, v ) ],
        particles[ this.index( u, v + 1 ) ],
        restDistance
  
      ] );
  
    }
  
    for ( v = h, u = 0; u < w; u ++ ) {
  
      constraints.push( [
        particles[ this.index( u, v ) ],
        particles[ this.index( u + 1, v ) ],
        restDistance
      ] );
  
    }
  
  
    this.particles = particles;
    this.constraints = constraints;
  }
  public index( u:any, v:any ) {
    return u + v * ( this.w + 1 );
  }
}


var DAMPING = 0.03;
var DRAG = 1 - DAMPING;
var MASS = 0.1;
var restDistance = 25;

var xSegs = 10;
var ySegs = 10;

var clothFunction = plane( restDistance * xSegs, restDistance * ySegs );

var cloth:any = new Cloth( xSegs, ySegs );

var GRAVITY = 981 * 1.4;
var gravity = new THREE.Vector3( 0, - GRAVITY, 0 ).multiplyScalar( MASS );


var TIMESTEP = 18 / 1000;
var TIMESTEP_SQ = TIMESTEP * TIMESTEP;

var pins:any = [];


var wind = true;
var windStrength = 1;
var windForce = new THREE.Vector3( 0, 0, 0 );

var ballPosition = new THREE.Vector3( 0, - 45, 0 );
var ballSize = 60; //40

var tmpForce = new THREE.Vector3();

var lastTime:any;
var diff = new THREE.Vector3();

var container:any, stats:any;
var camera:any, scene:any, renderer:any;
var clothGeometry:any;
var sphere:any;
var object:any;

function plane( width:any, height:any ) {

	return function ( u:any, v:any, target:any ) {

		var x = ( u - 0.5 ) * width;
		var y = ( v + 0.5 ) * height;
		var z = 0;

		target.set( x, y, z );

	};
}


function satisfyConstraints( p1:any, p2:any, distance:any ) {

	diff.subVectors( p2.position, p1.position );
	var currentDist = diff.length();
	if ( currentDist === 0 ) return; // prevents division by 0
	var correction = diff.multiplyScalar( 1 - distance / currentDist );
	var correctionHalf = correction.multiplyScalar( 0.5 );
	p1.position.add( correctionHalf );
	p2.position.sub( correctionHalf );

}



function simulate( time:any ) {
	if ( ! lastTime ) {

		lastTime = time;
		return;

	}

	var i, il, particles, particle, pt, constraints, constraint;

	// Aerodynamics forces

	if ( wind ) {

		var indx;
		var normal = new THREE.Vector3();
		var indices = clothGeometry.index;
		var normals = clothGeometry.attributes.normal;

		particles = cloth.particles;

		for ( let i = 0, il = indices.count; i < il; i += 3 ) {

			for ( let j = 0; j < 3; j ++ ) {

				indx = indices.getX( i + j );
				normal.fromBufferAttribute( normals, indx )
				tmpForce.copy( normal ).normalize().multiplyScalar( normal.dot( windForce ) );
				particles[ indx ].addForce( tmpForce );

			}

		}
	}

	for ( particles = cloth.particles, i = 0, il = particles.length; i < il; i ++ ) {

		particle = particles[ i ];
		particle.addForce( gravity );

		particle.integrate( TIMESTEP_SQ );

	}

	// Start Constraints

	constraints = cloth.constraints;
	il = constraints.length;

	for ( i = 0; i < il; i ++ ) {

		constraint = constraints[ i ];
		satisfyConstraints( constraint[ 0 ], constraint[ 1 ], constraint[ 2 ] );

	}

	// Ball Constraints

	ballPosition.z = - Math.sin( Date.now() / 600 ) * 90; //+ 40;
	ballPosition.x = Math.cos( Date.now() / 400 ) * 70;

	if ( sphere.visible ) {

		for ( particles = cloth.particles, i = 0, il = particles.length; i < il; i ++ ) {

			particle = particles[ i ];
			var pos = particle.position;
			diff.subVectors( pos, ballPosition );
			if ( diff.length() < ballSize ) {

				// collided
				diff.normalize().multiplyScalar( ballSize );
				pos.copy( ballPosition ).add( diff );

			}

		}

	}


	// Floor Constraints

	for ( particles = cloth.particles, i = 0, il = particles.length; i < il; i ++ ) {

		particle = particles[ i ];
		pos = particle.position;
		if ( pos.y < - 250 ) {

			pos.y = - 250;

		}

	}

	// Pin Constraints

	for ( i = 0, il = pins.length; i < il; i ++ ) {

		var xy = pins[ i ];
		var p = particles[ xy ];
		p.position.copy( p.original );
		p.previous.copy( p.original );

	}
}



/** */



@Component({})
export default class TestHomeThreeJSComponent extends Vue {
  mounted ()
  {
    console.log($('body'));
    console.log(WEBGL);
    this.$message({
      message: 'Hello Vue of Three On: ' + moment().format('YYYY-MM-DD HH:mm:ss'),
      type: 'success',
      duration: 8000
    });


			/* testing cloth simulation */
			var pinsFormation:any = [];
			pinsFormation.push( pins );
			pins = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
			pinsFormation.push( pins );
			pins = [ 0 ];
			pinsFormation.push( pins );
			pins = []; // cut the rope ;)
			pinsFormation.push( pins );
			pins = [ 0, cloth.w ]; // classic 2 pins
			pinsFormation.push( pins );
			pins = pinsFormation[ 1 ];
			function togglePins() {
				pins = pinsFormation[ ~~ ( Math.random() * pinsFormation.length ) ];
			}
			if ( WEBGL.isWebGLAvailable() === false ) {
				document.body.appendChild( WEBGL.getWebGLErrorMessage() );
      }
      
			init();
			animate();
			function init() {
				container = document.getElementById( 'TestThreeJS' );
				// scene
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xcce0ff );
				scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
				// camera
				camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 1000, 50, 1500 );
				// lights
				scene.add( new THREE.AmbientLight( 0x666666 ) );
				var light = new THREE.DirectionalLight( 0xdfebff, 1 );
				light.position.set( 50, 200, 100 );
				light.position.multiplyScalar( 1.3 );
				light.castShadow = true;
				light.shadow.mapSize.width = 1024;
				light.shadow.mapSize.height = 1024;
				var d = 300;
				light.shadow.camera.left = - d;
				light.shadow.camera.right = d;
				light.shadow.camera.top = d;
				light.shadow.camera.bottom = - d;
				light.shadow.camera.far = 1000;
				scene.add( light );
				// cloth material
				var loader = new THREE.TextureLoader();
				var clothTexture = loader.load( 'textures/patterns/circuit_pattern.png' );
				clothTexture.anisotropy = 16;
				var clothMaterial = new THREE.MeshLambertMaterial( {
					map: clothTexture,
					side: THREE.DoubleSide,
					alphaTest: 0.5
				} );
				// cloth geometry
				clothGeometry = new THREE.ParametricBufferGeometry( clothFunction, cloth.w, cloth.h );
				// cloth mesh
				object = new THREE.Mesh( clothGeometry, clothMaterial );
				object.position.set( 0, 0, 0 );
				object.castShadow = true;
				scene.add( object );
				object.customDepthMaterial = new THREE.MeshDepthMaterial( {
					depthPacking: THREE.RGBADepthPacking,
					map: clothTexture,
					alphaTest: 0.5
				} );
				// sphere
				var ballGeo = new THREE.SphereBufferGeometry( ballSize, 32, 16 );
				var ballMaterial = new THREE.MeshLambertMaterial();
				sphere = new THREE.Mesh( ballGeo, ballMaterial );
				sphere.castShadow = true;
				sphere.receiveShadow = true;
				scene.add( sphere );
				// ground
				var groundTexture = loader.load( 'textures/terrain/grasslight-big.jpg' );
				groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
				groundTexture.repeat.set( 25, 25 );
				groundTexture.anisotropy = 16;
				var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
				var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
				mesh.position.y = - 250;
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				scene.add( mesh );
				// poles
				var poleGeo = new THREE.BoxBufferGeometry( 5, 375, 5 );
				var poleMat = new THREE.MeshLambertMaterial();
				var mesh = new THREE.Mesh( poleGeo, poleMat );
				mesh.position.x = - 125;
				mesh.position.y = - 62;
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				scene.add( mesh );
				var mesh = new THREE.Mesh( poleGeo, poleMat );
				mesh.position.x = 125;
				mesh.position.y = - 62;
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				scene.add( mesh );
				var mesh = new THREE.Mesh( new THREE.BoxBufferGeometry( 255, 5, 5 ), poleMat );
				mesh.position.y = - 250 + ( 750 / 2 );
				mesh.position.x = 0;
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				scene.add( mesh );
				var gg = new THREE.BoxBufferGeometry( 10, 10, 10 );
				var mesh = new THREE.Mesh( gg, poleMat );
				mesh.position.y = - 250;
				mesh.position.x = 125;
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				scene.add( mesh );
				var mesh = new THREE.Mesh( gg, poleMat );
				mesh.position.y = - 250;
				mesh.position.x = - 125;
				mesh.receiveShadow = true;
				mesh.castShadow = true;
				scene.add( mesh );
				// renderer
				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
				renderer.gammaInput = true;
				renderer.gammaOutput = true;
				renderer.shadowMap.enabled = true;
				// controls
				var controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.maxPolarAngle = Math.PI * 0.5;
				controls.minDistance = 1000;
				controls.maxDistance = 5000;
				// performance monitor
				stats = new Stats();
				container.appendChild( stats.dom );
				//
				window.addEventListener( 'resize', onWindowResize, false );
				sphere.visible = ! true;
			}
			//
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			//
			function animate() {
				requestAnimationFrame( animate );
				var time = Date.now();
				var windStrength = Math.cos( time / 7000 ) * 20 + 40;
				windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) )
				windForce.normalize()
				windForce.multiplyScalar( windStrength );
				simulate( time );
				render();
				stats.update();
			}
			function render() {
				var p = cloth.particles;
				for ( var i = 0, il = p.length; i < il; i ++ ) {
					var v = p[ i ].position;
					clothGeometry.attributes.position.setXYZ( i, v.x, v.y, v.z );
				}
				clothGeometry.attributes.position.needsUpdate = true;
				clothGeometry.computeVertexNormals();
				sphere.position.copy( ballPosition );
				renderer.render( scene, camera );
			}
  }
}
