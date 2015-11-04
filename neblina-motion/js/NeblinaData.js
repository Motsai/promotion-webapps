



/* Small test data containing 5 Neblina Euler packets */
var data_samples_euler = 
 [0x01, 0x10, 0x00, 0x05, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x01, 0x10, 0x9c, 0x05, 0xa0, 0x86, 0x01, 0x00, 0x68, 0x01, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x01, 0x10, 0x34, 0x05, 0x40, 0x0d, 0x03, 0x00, 0xd0, 0x02, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
  0x01, 0x10, 0xca, 0x05, 0xe0, 0x93, 0x04, 0x00, 0x38, 0x04, 0x00, 0x00,
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
  0x01, 0x10, 0xb6, 0x05, 0x80, 0x1a, 0x06, 0x00, 0xa0, 0x05, 0x00, 0x00, 
  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ];


var hexChar = ["0", "1", "2", "3", "4", "5", "6", "7","8", "9", "A", "B", "C", "D", "E", "F"];

function byteToHex(b) {
  return hexChar[(b >> 4) & 0x0f] + hexChar[b & 0x0f];
}  
  
var hexlify = function(str) {
  result = '';
  for(var ii=0; ii < str.length; ii++) {
    result += byteToHex(str[ii]);
  }
  return result;
};


/* Main command interpreter */
var interpret_full_packet = function(single_packet) {
  var header    = new Uint8Array(single_packet.slice(0,4));
  subsystem = header[0];
  length    = header[1];
  CRC       = header[3];
  cmd_rsp   = header[4];
  console.log("Header: " + header);
  
  data = single_packet.slice(4,single_packet.length);
  console.log("Data: " + data);
  
}; 
  
/*
  // from https://github.com/michalbe/binascii
var hexlify = function(str) {
  var result = '';
  var padding = '00';
  for (var i=0, l=str.length; i<l; i++) {
    var digit = str[i].toString(16);
    var padded = (padding+digit).slice(-2);
    result += padded;
  }
  return result;
};
*/

// Split packets on a multiple frontier
// Test routine only, not a framer
var split_packets = function(raw_bytes, packet_size) {
  console.log("Splitting packets");
  var packet_array = [];
  
  for(var ii = 0; ii < raw_bytes.length / packet_size; ii++) {
    packet_array.push(raw_bytes.slice(packet_size*ii, packet_size*ii+packet_size));
  }
  console.log("Packet Array:" + packet_array.length);
  return packet_array;
};

var print_pkt_array = function(array) {
  for(var ii=0; ii < array.length; ii++) {
    console.log("Pkt(" + ii + "): " + hexlify(array[ii]));
    interpret_full_packet(packets[ii]);
  }
};

window.onload = function() {
  document.getElementById("test-button").onclick = function() {
    console.log("Starting");
    packets = split_packets(data_samples_euler,20);
    
    print_pkt_array(packets);
  };
};


