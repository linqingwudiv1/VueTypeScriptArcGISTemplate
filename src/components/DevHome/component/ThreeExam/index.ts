import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from "vue-property-decorator";
import moment from 'moment'


/** threejs */
declare const THREE:any;
declare const WEBGL:any;
declare const clothFunction:any;
declare const cloth:any;
declare const ballSize:any;
declare const windForce:any;
declare const ballPosition:any;
declare const simulate:any;
declare const Stats:any;
/** threejs */


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
    
    console.log('---threeJS---');
    //var THREE = require('three');

    let scene = new THREE.Scene();
    let canvasobj = document.getElementById('TestThreeJS');
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    let renderer = new THREE.WebGLRenderer(
      {
        antialias: true
      });

    console.log(scene);
    console.log(camera);
    console.log(renderer);
    console.log(renderer.domElement);
    console.log(canvasobj);
    //renderer.setSize( window.innerWidth, window.innerHeight );

    canvasobj.appendChild(renderer.domElement);

    let geometry = new THREE.BoxGeometry( 5, 5, 5 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff11 } );
    let cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    console.log(cube);
    cube.position.z = -10;
    camera.position.z = 0;

    let tick = function () {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame( tick );
    };

    tick();

    this.$message({
      showClose: true,
      message: 'ThreeJS Init Complate',
      type: 'success'
    });
  }
}
