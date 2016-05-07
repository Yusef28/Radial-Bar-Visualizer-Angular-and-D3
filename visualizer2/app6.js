


var app = angular.module('myApp', []);

app.controller('myCtrl',function($scope){

});

app.directive('clockTime', ['$interval', function($interval){

	return {
	
	restrict: 'E',
	template: '<h1 style="color:#770099;">{{currentTimeString}}</h1>',
	scope: {
	data: '='
	},
	link: function(scope, element, attrs){
		
var currentTime = new Date ( );	

function updateClock()
	{
var currentHours = currentTime.getHours ( );
var currentMinutes = currentTime.getMinutes ( );
var currentSeconds = currentTime.getSeconds ( );
var timeOfDay = ( currentHours < 12 ) ? "AM" : "PM";
currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours;
currentHours = ( currentHours == 0 ) ? 12 : currentHours;
scope.currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
	}
	
	
		
		
	}//link
	};//return
	}]);//clockTime

app.directive('barDirective', function(){


var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioElement =  document.getElementById('audioElement');
var audioSrc = audioCtx.createMediaElementSource(audioElement);
var analyser = audioCtx.createAnalyser();
audioSrc.connect(analyser);
audioSrc.connect(audioCtx.destination);

var frequencyData = new Uint8Array(100);
var svgHeight = '400';
var reflsvgHeight = '20';
var svgWidth = '800';
var barPadding = '1';

return {
	restrict: 'E',
	scope: {
	data: '=',
	r: '=',
	g: '=',
	b: '=',
	}, 
	link: function (scope, element, attrs){ 
	
$(document).ready(function () {



		function createSvg(parent, height, width) {
			return d3.select(parent)
					 .append('svg')
					 .attr('height', height)
					 .attr('width', width);
					
		}
		
		//var circles = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,1,2,3,4,5,6,7,8,9,10,11,12,13,14,1,2,3,4,5,6,7,8,9,10,11,12,13,14,1,2,3,4,5,6,7,8,9,10,11,12,13,14,1,2,3,4,5,6,7,8,9,10,11,12,13,14,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
		var offsetX = 500;
		var offsetY = 160;
		var Num = frequencyData.length;
		var amp = 50;
		
		var graph = createSvg('bar-directive', svgHeight, svgWidth);
		var reflection = createSvg('bar-directive', reflsvgHeight, svgWidth);		

			var circleGroup = graph.append('g');
			var musicGroup = graph.append('g');
			
			
			circleGroup.selectAll('rect')
			.data(frequencyData)
			.enter()
			.append('rect')
			.style('fill', 'blue')
			.attr('x', function(d, i)
			{
				return trigX(i, Num, offsetX, amp); 
			})
			.attr('y', function(d, i)
			{
				return trigY(i, Num, offsetY, amp);
			})
			.attr('width', '3')
			.attr('height', '70')
			.attr("transform", function(d, i){
																	
	//huge problem was rotating each rectangle but I guessed the origin for each would just be the x and y I set and I was right
			return "rotate(" + (360*i/Num -90) + "," + 
			trigX(i, Num, offsetX, amp) + "," +  
			trigY(i, Num, offsetY, amp) + ")" ;
			
			})
			
			function trigX(index, N, offset, amplitude){
			
			return (amplitude*Math.cos(2*Math.PI*index/N) + offset);
			}
			
			function trigY(index, N, offset,amplitude){
			
			return (amplitude*Math.sin(2*Math.PI*index/N) + offset);
			}

			
		
	musicGroup.selectAll('rect')
	   .data(frequencyData)
	   .enter()
	   .append('rect')
	   .attr('width', svgWidth / frequencyData.length - barPadding)
	   .attr('transform', 'translate(160, 0)')
	   .attr('x', function (d, i) {
	   		return i * (svgWidth / frequencyData.length);
	   });
	   
	 reflection.selectAll('rect')
	   .data(frequencyData)
	   .enter()
	   .append('rect')
	   .attr('width', svgWidth / frequencyData.length - barPadding)
	   .attr('transform', 'translate(160, 0)')
	   .attr('x', function (d, i) {
	   		return i * (svgWidth / frequencyData.length) + 160;
	   });
	   
	   // Continuously loop and update chart with frequency data.
function renderChart() {
   requestAnimationFrame(renderChart);
	
   // Copy frequency data to frequencyData array.
   analyser.getByteFrequencyData(frequencyData);
   
   
   // Update d3 chart with new data.
   circleGroup.selectAll('rect')
      .data(frequencyData)
      //.attr('y', function(d, i) {
      //  return trigY(i, Num, 0,  d );
      //})
     .attr('height', function(d, i) {
         return trigY(-90, Num, 40, d);  //using sin/cos here causes half of the lines to be decreasing because sin goes from -1 to 1, 
      })									//soo I shouldn't use sin here...or use the same angle each time? Ended up trying -90 degrees which worked well
      .attr('fill', function(d) {
         return 'rgb( '+ d +',0,'+ d + ')';
      })
	  .attr('fill-opacity', '0.6');
	  
	  
	  
	reflection.selectAll('rect')
      .data(frequencyData)
      .attr('height', function(d, i) {
		if(i>frequencyData.length *0.11 && i< frequencyData.length *0.74)
         return d/3;
      })
      .attr('fill', function(d) {
         return 'rgb('+ d/2 +',' + d/2 + ','+ d + ')';
      })
	  .attr('fill-opacity', '0.2')
	  	  .attr('transform', function(d, i)
	  {
		return 'skewX('+ (((i+frequencyData.length*0.11) *2.40)-120) +')';
	  });
		
		


}

// Run the loop
renderChart();

		//}); //scope.watch

	    }); //document ready function
		
		}//link:function
		
		} //directive return
});


	
