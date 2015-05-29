console.log("picture js loadade");

var totalPicturesInMilestone;
var currPictureIndex = 0;
var currPictureItem;

var picLeft = 100;
var picTop = 100;

function initPictures(){
	console.log("init pictures called");
	// Hide the base canvas and show separate canvas for memories
	$('#c').hide();
	$('#canvasForMemories').show();
	//console.log("in initPictures ", milestonesArray, curMilestoneIndex);
	totalPicturesInMilestone = milestonesArray[curMilestoneIndex].stone.pictures.length;
	showPictures();
}

function showPictures(){
	console.log("showPictures with total pictures = " + totalPicturesInMilestone);
	if(currPictureIndex < totalPicturesInMilestone){
		currPictureItem = milestonesArray[curMilestoneIndex].stone.pictures[currPictureIndex].picture;
		addPicture();
	}
	else{
		// this is the break-point for pictures
		console.log("no pictures present");
		currPictureIndex = 0;
		initVideo();
	}
}

function addPicture(){
	console.log("addPicture called");
	// set canavs background image 
	// Put same image with a little opacity
	canvasForMemories.setBackgroundImage(currPictureItem.path, canvas.renderAll.bind(canvas), {
		opacity: 0.5,
		width : canvasForMemories.width,
		height: canvasForMemories.height,
		originX: 'left',
		originY: 'top'
	});


	// inside image with original colors
	fabric.Image.fromURL(currPictureItem.path, function(innerImg) {
		innerImg.scale(1.0).set({
			left: picLeft,
			top: picTop,
			width: (canvasForMemories.width - 200),
			height: (canvasForMemories.height - 200),
			//stroke: 'white',
			//strokeWidth: 10
		});

		// Add text to the picture
		// Keep it aligned to the inner image
		var caption = new fabric.Text(currPictureItem.caption, { 
			left : (canvasForMemories.width/2),
			top: picTop - 50,
			fontFamily: 'Comic Sans',
			fontSize: 20,
			fontStyle: 'italic',
			shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
		});
		caption.setLeft((canvasForMemories.width/2) - caption.width/2);

		var place = new fabric.Text(currPictureItem.place, { 
			left: (canvasForMemories.width - picLeft*2),
			top: (canvasForMemories.height - picTop),
			fontFamily: 'Comic Sans',
			fontSize: 20,
			fontStyle: 'italic',
			shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
		});

		var group = new fabric.Group([ innerImg, caption, place ], {
		  	//left: picLeft,
			//top: picTop,
		});

		canvasForMemories.add(group);

		group.animate('left', picLeft, {
			from: 0,
		  	onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		  	duration: 3000,
		  	easing: fabric.util.ease.easeOutBounce,
		  	onComplete: function(){
		  		currPictureIndex++;
		  		canvasForMemories.remove(group);
		  		showPictures();
		  	}
		});
	});
}



