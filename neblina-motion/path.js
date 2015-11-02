

var key_up=38;
var key_down=40;
var key_left=37;
var key_right=39;
var key_space=32;
var key_zero=48;

var step=60;

function refresh(item)
{
			item.position.set(pos.x,pos.y,0);
			item.rotation.z = heading;
}

document.addEventListener('keydown', function(event) {
    var element = document.querySelector("#greeting");
    
    if(event.keyCode == key_up || event.keyCode == key_right) {

      heading = heading + 0.1;
      refresh(arrow);

    }
    else if(event.keyCode == key_down || event.keyCode == key_left) {

      heading = heading - 0.1;
      refresh(arrow);

    }
    else if(event.keyCode == key_space) {
      
    	trace = new THREE.Mesh( triGeo, new THREE.MeshNormalMaterial( { side: THREE.DoubleSide } ) );

			pos.x = pos.x + step*Math.cos(heading);
			pos.y = pos.y + step*Math.sin(heading);
      scene.add(trace);

      refresh(trace);

    }
    else if(event.keyCode == key_zero) {
      
      element.innerText = "Back to origin";
			pos={x:-1000, y:-500};
			heading = 0;

      refresh(arrow);

    }

});