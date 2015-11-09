
document.addEventListener('keydown', function(event) {
  
  var key_up=38;
  var key_down=40;
  var key_left=37;
  var key_right=39;
  var key_space=32;
  var key_zero=48;

  var element = document.querySelector("#greeting");
  switch (event.keyCode)
  {
    case key_up:
    case key_right:
      heading = heading + 0.1;
      refresh(arrow);
      break;
      
    case key_down:
    case key_left:
      heading = heading - 0.1;
      refresh(arrow);
      break;
  
    case key_space:
      stepForward();
      break;
    
    case key_zero:
      element.innerText = "Back to origin";
			pos={x:-1000, y:-500};
			heading = 0;
      refresh(arrow);
    break;
  }
});

function stepForward()
{
  var step_size=60;

	trace = new THREE.Mesh( triGeo, new THREE.MeshNormalMaterial( { side: THREE.DoubleSide } ) );

	pos.x = pos.x + step_size*Math.cos(heading);
	pos.y = pos.y + step_size*Math.sin(heading);
  scene.add(trace);

  refresh(trace);
}

function refresh(item)
{
	item.position.set(pos.x,pos.y,0);
	item.rotation.z = heading;
}