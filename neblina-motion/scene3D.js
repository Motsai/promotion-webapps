
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
				
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

				var teapotGeometry = new THREE.TeapotBufferGeometry( effectController.size,
					effectController.tess,
					effectController.bottom,
					effectController.lid,
					effectController.body,
					effectController.fitLid,
					! effectController.nonblinn );
					
        material2 = new THREE.MeshNormalMaterial( { wireframe: false, side: THREE.DoubleSide } );
				teapot = new THREE.Mesh(teapotGeometry,	material2);	
				teapot.position.y=0;
				teapot.rotation.z=0.2;
				scene.add( teapot );

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
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( renderer.domElement );

    }
    

    function animate() {

        requestAnimationFrame( animate );
        
        teapot.rotation.x -= 0.005;
        teapot.rotation.y -= 0.005;

        renderer.render( scene, camera );

    }