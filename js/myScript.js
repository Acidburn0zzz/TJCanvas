console.log("loaded my script js");

// real time clock for animations
var tjar;   // contains the entire JSON object fetched from server
var delayFromStageOneToTwo = 3000;  
var delayFromStageTwoToThree = delayFromStageOneToTwo + 3000;

var canvas;
var canvasForMemories;

// This function initiates the process
// Called from onLoad function of HTML body
function init(){

	// Base canvas to show journey info, buddy info and map
	var canvas = document.getElementById("c");  
  	canvas.width = $(window).width();
  	canvas.height = $(window).height();

  	// Canvas to show all memories including pictures, notes, moods et
  	var canvasForMemoriesElement = document.getElementById("canvasForMemories");  
  	canvasForMemoriesElement.width = $(window).width();
  	canvasForMemoriesElement.height = $(window).height();

	canvas = new fabric.Canvas('c');
	canvasForMemories = new fabric.Canvas('canvasForMemories');

	// canvas-container is automatocally genetaed by Fabric.js 
	// Apply css property to it
	$(".canvas-container").css("position", "absolute");
	$(".canvas-container").css("top", "0px");

	console.log(canvas);
	console.log(canvasForMemories);
	console.log(canvasForMemoriesElement);
	
	// Call stage 1 to start the video
	createStage1(canvas, tjar.journey);

	// Call stage 2 after some time
	// dont add parenthesis in createStage2, otherwise it will call it immediately + canvas is a parameter passed
	setTimeout(createStage2, delayFromStageOneToTwo, canvas, tjar.friends);

	// Call stage 3 after some time
	setTimeout(createStage3, delayFromStageTwoToThree, canvas, tjar.milestones);
}

function fetchDataFromAPI(){
	console.log("fetchDataFromAPI calles");
	var xmlhttp = new XMLHttpRequest(); 
	var url = "http://localhost:3000/api/v1/timecapsule?j_id=1";
	// var url = "https://traveljar.in/api/v1/timecapsule?j_id=1";
    // var url = "https://traveljar.in/timecapsule/dummy";
    // var url = "http://localhost:3000/timecapsule/dummy";

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var myArr = JSON.parse(xmlhttp.responseText);
            tjar = myArr;
            console.log(tjar);
            init();
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

