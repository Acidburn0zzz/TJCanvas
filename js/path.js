console.log("path js loaded");

var nextMilestoneItem;
var stepEndLeft;
var stepEndTop;
var stepStartLeft;
var stepStartTop;
var stepIconWidth = 25;

var currStepLeft;
var currStepTop;

function initPath(){

	// Hide Memories canvas and show Base canvas
	$('#canvasForMemories').hide();
	$('#c').show();

	nextMilestoneItem = milestonesArray[curMilestoneIndex].stone;
	stepStartLeft = currMilestoneLeft + iconWidth;
	stepStartTop = currMilestoneTop + iconWidth/2;
	stepEndLeft = getMilestoneLeft(curMilestoneIndex);
	stepEndTop = getMilestoneTop(curMilestoneIndex) + iconWidth/2;
	
	currStepLeft = stepStartLeft;
	currStepTop = stepStartTop;
	addPath(nextMilestoneItem.conveyance);
}

function addPath(conveyance){
	switch (conveyance) {
	    case 'car': repeatSteps();
	        		console.log("car cosen");
	        		break;
	}
}

function repeatSteps(){
	console.log("in repeatSteps stepStartTop = ", stepStartTop , "stepEndTop = ", stepEndTop);

	// left =======> right
	if(stepStartTop === stepEndTop && stepStartLeft < stepEndLeft){
		if(currStepLeft < stepEndLeft){
			addStepRight();
		}
		else{
			//console.log("next milestone reached in repeatSteps");
			buildMilestones();
		}
	}
	// right =======> left
	else if(stepStartTop === stepEndTop && stepStartLeft > stepEndLeft){
		if(currStepLeft > (stepEndLeft + iconWidth)){
			addStepLeft();
		}
		else{
			//console.log("next milestone reached in repeatSteps");
			buildMilestones();
		}
	}
	// up =======> down
	else{
		if(currStepTop < stepEndTop){
			addStepDown();
		}
		else{
			//console.log("next milestone reached in repeatSteps");
			buildMilestones();
		}
	}
}

function addStepRight(){

	console.log("in addStep with currStepLeft = ", currStepLeft, currMilestoneLeft);
	fabric.Image.fromURL('./img/footsteps_right.png', function(oImg) {
		oImg.scale(1.0).set({
			left: currStepLeft,
			top: currStepTop,
			width: stepIconWidth,
			height: stepIconWidth
		});
		canvas.add(oImg);

		oImg.animate('left', currStepLeft, {
			from: currStepLeft - stepIconWidth,
		  	onChange: canvas.renderAll.bind(canvas),
		  	duration: 200,
		  	onComplete: function() {
		     	// Here
		     	currStepLeft = currStepLeft + stepIconWidth;
		     	repeatSteps();
		   }
		});
	});
}

function addStepLeft(){

	console.log("in addStep with currStepLeft = ", currStepLeft, currMilestoneLeft);
	fabric.Image.fromURL('./img/footsteps_left.png', function(oImg) {
		oImg.scale(1.0).set({
			left: currStepLeft,
			top: currStepTop,
			width: stepIconWidth,
			height: stepIconWidth
		});
		canvas.add(oImg);

		oImg.animate('left', currStepLeft - iconWidth, {
			from: currStepLeft,
		  	onChange: canvas.renderAll.bind(canvas),
		  	duration: 200,
		  	onComplete: function() {
		     	// Here
		     	currStepLeft = currStepLeft - stepIconWidth;
		     	repeatSteps();
		   }
		});
	});
}

function addStepDown(){

	console.log("in addStep with currStepLeft = ", currStepTop, currMilestoneTop);
	fabric.Image.fromURL('./img/footsteps_down.png', function(oImg) {
		oImg.scale(1.0).set({
			left: currStepLeft,
			top: currStepTop,
			width: stepIconWidth,
			height: stepIconWidth
		});
		canvas.add(oImg);

		oImg.animate('top', currStepTop, {
			from: stepStartTop,
		  	onChange: canvas.renderAll.bind(canvas),
		  	duration: 200,
		  	onComplete: function() {
		     	// Here
		     	currStepTop = currStepTop + stepIconWidth;
		     	repeatSteps();
		   }
		});
	});

}


// function repeatSteps(fromLeft, fromTop, toLeft, toTop){

// 	console.log("repeatSteps");
// 	for(i = fromLeft; i <= toLeft; i = i + stepIconWidth){

// 		// varibale i is not in the same scope as of fromURL function
// 		// So when loading image it doesnot retreive its value
// 		// so we need to wrap the method so it will use corrent value of 'i'
// 		// http://stackoverflow.com/questions/17442299/images-in-a-loop-with-fabricjs
// 		(function (i) {
// 			console.log(i);
// 			fabric.Image.fromURL('./img/footsteps_right.png', function(oImg) {
// 				console.log(i);
// 				oImg.scale(1.0).set({
// 					left: i,
// 					top: fromTop,
// 					width: stepIconWidth,
// 					height: stepIconWidth
// 				});
// 				canvas.add(oImg);

// 				oImg.animate('left', i, {
// 					from: 0,
// 				  	onChange: canvas.renderAll.bind(canvas),
// 				  	duration: 2000,
// 				  	onComplete: function() {
// 				     	// Here
// 				     	if(i > toLeft)
// 				     	buildMilestones();
// 				   }
// 				});
// 			});

// 		})(i);
// 	}
// }
