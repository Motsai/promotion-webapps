
  var start = 0;
  var stop = 0;
    
  function readBlob() {
  
    var packet_size = 20;
    
    var files = document.getElementById('files').files;
    if (!files.length) {
      //alert('Please select a file!');
      return;
    }

    var file = files[0];
    
    start = stop || 0;
    stop = (start + packet_size) || file.size;
    
    if (stop >= file.size)
    {
      start = 0;
      stop = start + packet_size;
    }

    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
      if (evt.target.readyState == FileReader.DONE) { // DONE == 2

        var arrayBuffer = evt.target.result; 

        if (arrayBuffer) {
          var byteArray = new Uint8Array(arrayBuffer);
          console.log(byteArray.toString());
          switch (byteArray[3])
          {
            case 0x05:
              yaw = parseAngle(byteArray[8], byteArray[9]);
              pitch = parseAngle(byteArray[10], byteArray[11]);
              roll = parseAngle(byteArray[12], byteArray[13]);
              break;
            case 0x0b:
              stepForward();
              heading = parseAngle(byteArray[11], byteArray[12]);
              break;
          }
        }

        document.getElementById('byte_content').textContent = 
        "yaw = "+ yaw +" pitch = "+ pitch + " roll = "+ roll;
        
        document.getElementById('byte_range').textContent = 
            ['Read bytes: ', start + 1, ' - ', stop,
             ' of ', file.size, ' byte file'].join('');
      }
    };

    var blob = file.slice(start, stop-1);
    reader.readAsArrayBuffer(blob);
  }
  
  
  
  function parseAngle(byte_lsb, byte_msb)
  {
    var y_str = (byte_lsb + (byte_msb * 0x100)).toString(16);
    var y = parseInt(y_str, 16);
    if ((y & 0x8000) > 0) 
    {
      y = y - 0x10000; 
    }
    y = y/10*0.0174533;

    console.log(byte_lsb.toString(16)+ " " + byte_msb.toString(16) + " " + y_str + " -> " + y);

    return y;
  }
