

var key_up=38;
var key_down=40;
var key_left=37;
var key_right=39;

document.addEventListener('keydown', function(event) {
    var element = document.querySelector("#greeting");
    if(event.keyCode == key_right) {
      element.innerText = "RIGHT, world!";
    }
    else if(event.keyCode == key_up) {
      element.innerText = "UP, world!";
    }
    else if(event.keyCode == key_left) {
      element.innerText = "LEFT, world!";
    }
    else if(event.keyCode == key_down) {
      element.innerText = "DOWN, world!";
    }
});