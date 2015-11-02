
    var scene, camera, renderer;
    var geometry, material, mesh, teapot;
  	var teapotSize = 200;
  	var tess = 10;
  	var loader;
    var arrow, trace, triGeo;
		var	pos = {x:-1000, y:-500};
		var heading = 0;

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
				
			  var element = document.querySelector("#greeting");

	      element.innerText = "Press up/right keys to change direction, zero key to go back to origin.";

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
        loader = new THREE.TextureLoader();

				teapot = new THREE.Mesh( teapotGeometry, material );

				loader.load( 'neblina.jpg', function ( texture ) {

					//var geometry = new THREE.SphereGeometry( 200, 20, 20 );

					material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
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


				var triShape = new THREE.Shape();
				triShape.moveTo(0, 0);
				triShape.lineTo(0, -15);
				triShape.lineTo(80, 0);
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



				// circle = new THREE.CircleGeometry( circleRadius, 64 );
				// mesh = new THREE.Mesh( circle, new THREE.MeshNormalMaterial( { side: THREE.DoubleSide } ) );
				
				// mesh.position.set(pos.x,pos.y,0);
    //     scene.add(mesh);


        renderer = new THREE.WebGLRenderer();
        renderer.setSize( width, height );

        document.body.appendChild( renderer.domElement );

    }
    

    function animate() {

        requestAnimationFrame( animate );
        
        teapot.rotation.x -= 0.005;
        teapot.rotation.y -= 0.005;
        
        arrow.rotation.z = heading;
        trace.rotation.z = heading;

        renderer.render( scene, camera );

    }