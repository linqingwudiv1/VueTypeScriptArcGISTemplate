import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  components: {
  }
})

export default class TestHomeThreeJSComponent extends Vue {
  mounted ()
  {
    console.log('---threeJS---');
    var THREE = require('three');

    let scene = new THREE.Scene();
    let canvasobj = document.getElementById('TestThreeJS');
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    let renderer = new THREE.WebGLRenderer();

    console.log(scene);
    console.log(camera);
    console.log(renderer);
    console.log(renderer.domElement);
    console.log(canvasobj);
    //renderer.setSize( window.innerWidth, window.innerHeight );

    canvasobj.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry( 2, 2, 2 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff11 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame( animate );

      cube.rotation.x += 0.05;
      cube.rotation.y += 0.05;

      renderer.render(scene, camera);
    };

    animate();

    this.$message({
      showClose: true,
      message: 'ThreeJS Init Complate',
      type: 'success'
    });
  }
}
