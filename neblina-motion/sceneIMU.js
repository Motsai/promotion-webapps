
var y = [0, 1, 2, 3, 4, 5];	

	window.onload = function () {

		var dps = [[],[],[],[],[],[]];

		var chart = new CanvasJS.Chart("chartContainer",{
			title :{
				text: "IMU Data"
			},			
			data: [
			  {	type: "line",	dataPoints: dps[0] },
			  {	type: "line",	dataPoints: dps[1] },
			  {	type: "line",	dataPoints: dps[2] },
			  {	type: "line",	dataPoints: dps[3] },
			  {	type: "line",	dataPoints: dps[4] },
			  {	type: "line",	dataPoints: dps[5] },
			]
		});

		var xVal = 0;
		var updateInterval = 50;
		var dataLength = 500; // number of dataPoints visible at any point

		var updateChart = function (count) {
			count = count || 1;
			// count is number of times loop runs to generate random dataPoints.
			
			for (var j = 0; j < count; j++) {	
 				//yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
 				for (var k = 0; k < 6; k++) {
 				  dps[k].push ({x: xVal,y: y[k]});
 				  if (dps[k].length > dataLength)
  		  	{
	    			dps[k].shift();				
			    }
 				}
 				xVal++;
 			}

			chart.render();		

		}

		// generates first set of dataPoints
		updateChart(dataLength); 

		// update chart after specified time. 
		setInterval(function(){updateChart()}, updateInterval);

	}
