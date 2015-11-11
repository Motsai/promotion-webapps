
var scene3d, camera3d, renderer3d;
var geometry, material, mesh, teapot;
var teapotSize = 200;
var tess = 10;
var loader;

var yaw = roll = pitch = 0;
var refresh_rate = 30;

effectController = {
  size: 200,
  tess: 10,
	bottom: true,
	lid: true,
	body: true,
	fitLid: false,
	nonblinn: false
};


init3d();
animate3d();

function init3d()
{
	  var element = document.querySelector("#greeting");

    element.innerText = "Press up/right keys to change direction, zero key to go back to origin.";

		var width = window.innerWidth;
		var height = 300;
    scene3d = new THREE.Scene();

    camera3d = new THREE.PerspectiveCamera( 75, width / height, 1, 10000 );
    camera3d.position.z = 1000;

		var teapotGeometry = new THREE.TeapotBufferGeometry( effectController.size,
			effectController.tess,
			effectController.bottom,
			effectController.lid,
			effectController.body,
			effectController.fitLid,
			! effectController.nonblinn );
			
    // instantiate a loader
    loader = new THREE.TextureLoader();

		teapot = new THREE.Mesh( teapotGeometry, material );

		loader.load( 'neblina.jpg', function ( texture ) {

			//var geometry = new THREE.SphereGeometry( 200, 20, 20 );

			material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
			teapot = new THREE.Mesh( teapotGeometry, material );
			scene3d.add( teapot );

		} );

    renderer3d = new THREE.WebGLRenderer();
    renderer3d.setSize( width, height );

    document.body.appendChild( renderer3d.domElement );

}

function animate3d() 
{
  setTimeout( function() 
  {
    readBlob();
    teapot.rotation.x = yaw;
    teapot.rotation.y = pitch;
    teapot.rotation.z = roll;
    requestAnimationFrame( animate3d );
  }, 1000 / refresh_rate);
  renderer3d.render( scene3d, camera3d );
}