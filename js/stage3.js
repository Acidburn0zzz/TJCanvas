console.log("stage3 loadded");

// variables
var canvas;
var maxRowItem = 4;
// icon = milestones icon
var iconWidth = 75;
var iconHeight = 75;

var milestonesArray;
var totalMilestones;
var currMilestoneItem;
var curMilestoneIndex = 0;

// These are fixed according to screens
// rowNumber starts with "1"
// column number starts with "0"
var milestonesOneLeft = 100;
var milestonesTwoLeft;
var milestonesThreeLeft;
var milestonesFourLeft;
var milestoneColumnGap = 200;

// cordinates of current milestone
// will be used by "addPath()" in path.js
var currMilestoneLeft;
var currMilestoneTop;



function createStage3(myCanvas, milestones){
	// clear all objects added for stage 1
	console.log(milestones , "in createStage3")
	myCanvas.clear();
	canvas = myCanvas;
	milestonesArray = milestones;
	calculateMilestoneLefts();
	
	showSidePictures();
	totalMilestones = milestonesArray.length;
	buildMilestones();
}

function buildMilestones(){
	
	if(curMilestoneIndex < totalMilestones){
		console.log(curMilestoneIndex);
		currMilestoneItem = milestonesArray[curMilestoneIndex].stone;
		console.log("in buildMilestones: currMilestoneLeft = ", getMilestoneLeft(curMilestoneIndex));
		console.log("in buildMilestones: currMilestoneTop = ", getMilestoneTop(curMilestoneIndex));
		milestoneItemLeft = getMilestoneLeft(curMilestoneIndex);
		milestoneItemTop = getMilestoneTop(curMilestoneIndex);
		// addMilestone(milestoneItemLeft, milestoneItemTop);
		initPictures();
	}
	else{
		console.log("no more milestone to show now");
		curMilestoneIndex = 0;
	}
}

function addMilestone(myLeft, myTop){

	fabric.Image.fromURL('./img/home.jpg', function(oImg) {
		oImg.scale(1.0).set({
			originX: 'center',
			originY: 'bottom',
			width: iconWidth,
			height: iconHeight
		});

		// Add a city name below the text
		// And group it with above image
		var text = new fabric.Text(currMilestoneItem.name, { 
			fontFamily: 'Comic Sans',
			fontSize: 20,
			fontStyle: 'italic',
			shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
		});

		var group = new fabric.Group([ oImg, text ], {
		  	left: myLeft,    // give them common left and top
		  	top: myTop,
		});

		canvas.add(group);

		// Add animation
		// Call the next element only after this element ends usign onComplete
		group.animate('left', myLeft, {
			from: 0,
		  	onChange: canvas.renderAll.bind(canvas),
		  	duration: 1000,
		  	easing: fabric.util.ease.easeOutBounce,
		  	onComplete: function() {
		     	// Here
		     	
		     	initPictures();
		   }
		});
	});
}

// return milestone position based on the number of milestones
// Used variable : milestonesOneLeft, Two, Three & Four
// Used variable : milestoneColumnGap
function getMilestoneLeft(index){
	switch(index % (maxRowItem * 2)){
		case 0 : return milestonesOneLeft; break;
		case 1 : return milestonesTwoLeft; break;
		case 2 : return milestonesThreeLeft; break;
		case 3 : return milestonesFourLeft; break;
		case 4 : return milestonesFourLeft; break;
		case 5 : return milestonesThreeLeft; break;
		case 6 : return milestonesTwoLeft; break;
		case 7 : return milestonesOneLeft; break;
		default : console.log("something wrong in getMilestoneLeft()"); break;
	}
}

function getMilestoneTop(index){
	var rowNumber = Math.ceil((index + 1) / 4);        // row starts with "1"
	return rowNumber*milestoneColumnGap;
}

function calculateMilestoneLefts(){
	milestonesFourLeft = canvas.width - milestonesOneLeft - iconWidth;
	var gap = (milestonesFourLeft - milestonesOneLeft)/3;
	milestonesTwoLeft = milestonesOneLeft + gap;
	milestonesThreeLeft = milestonesOneLeft + 2*gap;
}

