
    var scene, camera, renderer;
    var geometry, material, mesh, teapot;
  	var teapotSize = 200;
  	var tess = 10;

		effectController = {
		  size: 200,
		  tess: 10,
			bottom: true,
			lid: true,
			body: true,
			fitLid: false,
			nonblinn: false
		};
				
    init();
    animate();

    function init() {
				
				var width = window.innerWidth;
				var height = 400;
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 75, width / height, 1, 10000 );
        camera.position.z = 1000;



				var teapotGeometry = new THREE.TeapotBufferGeometry( effectController.size,
					effectController.tess,
					effectController.bottom,
					effectController.lid,
					effectController.body,
					effectController.fitLid,
					! effectController.nonblinn );
					
        // instantiate a loader
        var loader = new THREE.TextureLoader();


				loader.load( 'neblina.jpg', function ( texture ) {

					//var geometry = new THREE.SphereGeometry( 200, 20, 20 );

					var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
					teapot = new THREE.Mesh( teapotGeometry, material );
					scene.add( teapot );

				} );

/*
				var map = THREE.ImageUtils.loadTexture( 'neblina.jpg' );
				map.wrapS = map.wrapT = THREE.RepeatWrapping;
				map.anisotropy = 16;
				var material_neb = new THREE.MeshLambertMaterial( { map: map, side: THREE.DoubleSide } );
        object = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 10 ), material_neb );
				object.position.set( 5, 5, 5 );
				scene.add( object );

        // HY's teapot

        material2 = new THREE.MeshNormalMaterial( { wireframe: false, side: THREE.DoubleSide } );
				teapot = new THREE.Mesh(teapotGeometry,	material2);	
				teapot.position.y=0;
				teapot.rotation.z=0.2;
				//scene.add( teapot );
*/


				var triangleShape = new THREE.Shape();
				triangleShape.moveTo(  80, 20 );
				triangleShape.lineTo(  40, 80 );
				triangleShape.lineTo( 120, 80 );
				triangleShape.lineTo(  80, 20 ); // close path
				
				var geometry = new THREE.ShapeGeometry( triangleShape );
				
				var mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial( { side: THREE.DoubleSide } ) );
				mesh.position.set(10,10,10);
        mesh.scale.set( 3, 3, 3 );
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( width, height );

        document.body.appendChild( renderer.domElement );

    }
    

    function animate() {

        requestAnimationFrame( animate );
        
        teapot.rotation.x -= 0.005;
        teapot.rotation.y -= 0.005;

        renderer.render( scene, camera );

    }