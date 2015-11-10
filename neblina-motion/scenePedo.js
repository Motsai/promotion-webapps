
var scene, camera, renderer;
var arrow, trace, triGeo;
var	pos_orig = {x:-1000, y:400};
var	pos = {x:-1000, y:400};
var heading = 0;
var refresh_rate = 30;

init();
animate();

function init() {
		
	  var element = document.querySelector("#greeting");

    element.innerText = "Press up/right keys to change direction, zero key to go back to origin.";

		var width = window.innerWidth;
		var height = 200;
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, width / height, 1, 10000 );
    camera.position.z = 1000;

		var triShape = new THREE.Shape();
		triShape.moveTo(0, 0);
		triShape.lineTo(0, -15);
		triShape.lineTo(30, 0);
		triShape.lineTo(0, 15); 
		triShape.lineTo(0, 0); 
		triGeo = new THREE.ShapeGeometry( triShape );
		
    trace = new THREE.Mesh( triGeo, new THREE.MeshNormalMaterial( { side: THREE.DoubleSide } ) );
		trace.rotation.z = heading;
		trace.position.set(pos.x,pos.y,0);
    scene.add(trace);
    
		arrow = new THREE.Mesh( triGeo, new THREE.MeshBasicMaterial( {color: 0xff0000, wireframe: true, side: THREE.DoubleSide } ) );
		arrow.rotation.z = heading;
		arrow.position.set(pos.x,pos.y,0);
    scene.add(arrow);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );

    document.body.appendChild( renderer.domElement );

}

function animate() 
{
  setTimeout (function()
  {
    readBlob();
    requestAnimationFrame( animate );
  }, 1000 / refresh_rate);
    
  arrow.rotation.z = heading;
  trace.rotation.z = heading;

  renderer.render( scene, camera );
}