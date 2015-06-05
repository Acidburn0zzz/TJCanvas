console.log("loaded my script js");

// real time clock for animations
var tjar;   // contains the entire JSON object fetched from server
var delayFromStageOneToTwo = 5500;  
var delayFromStageTwoToThree = delayFromStageOneToTwo + 6000;

var canvas;
var canvasForMemories;
var natWidth = $(window).width();
var natHeight = $(window).height();
// This function initiates the process
// Called from onLoad function of HTML body

var images;
function init(){

	preloadAllImages();

	// Base canvas to show journey info, buddy info and map
	var canvas = document.getElementById("c");  
  	canvas.width = natWidth;
  	canvas.height = natHeight;

  	var canvasBackground = document.getElementById("cb");  
  	canvasBackground.width = natWidth;
  	canvasBackground.height = natHeight;

  	// Canvas to show all memories including pictures, notes, moods et
  	var canvasForMemoriesElement = document.getElementById("canvasForMemories");  
  	canvasForMemoriesElement.width = natWidth;
  	canvasForMemoriesElement.height = natHeight;
  	canvas = new fabric.Canvas('cb');
	canvas = new fabric.Canvas('c');
	canvasForMemories = new fabric.Canvas('canvasForMemories');

	// canvas-container is automatocally genetaed by Fabric.js 
	// Apply css property to it
	$(".canvas-container").css("position", "absolute");
	$(".canvas-container").css("top", "0px");
	//hide the background roller
	$('#cb').hide(); 
	console.log(canvas);
	console.log(canvasForMemories);
	console.log(canvasForMemoriesElement);
	
	// Call stage 1 to start the video
	createStage1(canvas, tjar.journey);

	// Call stage 2 after some time
	// dont add parenthesis in createStage2, otherwise it will call it immediately + canvas is a parameter passed
	  setTimeout(createStage2, delayFromStageOneToTwo, canvas, tjar.friends);

	// // // Call stage 3 after some time
	  setTimeout(createStage3, delayFromStageTwoToThree, canvas, tjar.milestones);
}

function fetchDataFromAPI(){
	console.log("fetchDataFromAPI called");
	// tjar = json_variable;
	// init();

	 var xmlhttp = new XMLHttpRequest(); 
	// var url = "http://192.168.1.2:3000/api/v1/timecapsule?j_id=20";
	//var url = "http://192.168.1.15:3000/api/v1/timecapsule?j_id=20";
    // var url = "https://traveljar.in/timecapsule/dummy";
    // var url = "http://localhost:3000/timecapsule/dummy";
      var url = "http://192.168.1.10:3000/timecapsule/dummy";

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

function preloadAllImages(){
	console.log(tjar);
	images = new Array();
	var count = 0;
	len = tjar.milestones.length;
	for(i=0 ; i<len ; i++){
		totalPics = tjar.milestones[i].stone.pictures.length;

		for(j=0; j<totalPics ; j++){
			console.log(tjar.milestones[i].stone.pictures[j].picture.path);
			images[count] = new Image()
			images[count].src = tjar.milestones[i].stone.pictures[j].picture.path;
			count++;
		}
	}
}






