console.log("Notes js loadade");

var totalNotesInMilestone;
var currNoteIndex = 0;
var currNoteItem;

var noteLeft = 100;
var noteTop = 100;



function initNote(){
	t=1;
	console.log("init note called");
	// Hide the base canvas and show separate canvas for memories
	$('#c').hide();
	$('#canvasForMemories').show();
	//console.log("in initnotes ", milestonesArray, curMilestoneIndex);
	totalNotesInMilestone = milestonesArray[curMilestoneIndex].stone.notes.length;
	showNotes();
}

function showNotes(){
	console.log("shownotes with total notes = " + totalNotesInMilestone);
	if(currNoteIndex < totalNotesInMilestone){
		currNoteItem = milestonesArray[curMilestoneIndex].stone.notes[currNoteIndex].note;
		addNote();
	}
	else{
		// this is the break-point for videos
		console.log("no notes present");
		currNoteIndex = 0;

		initMood();
	}
}

function addNote(){



	console.log("addNote called");
	// set canavs background image 
	// Put same image with a little opacity
	canvasForMemories.setBackgroundColor('rgba(255, 255, 255, 1)', canvas.renderAll.bind(canvas), {
		
		width : canvasForMemories.width,
		height: canvasForMemories.height,
		originX: 'left',
		originY: 'top'
	});




	var mapimg = new fabric.Image("https://s3-ap-southeast-1.amazonaws.com/traveljar-production/uploads/picture/picture_file/5/abhinav-side.jpg", {
		left: videoLeft,
		top: videoTop,
		width: (canvasForMemories.width - 200),
		height: (canvasForMemories.height - 200),


	});


	var rect = new fabric.Rect({
		opacity: 1,
		fill: '#f5f5f5',
		left: noteLeft+150,
		top: noteTop+100,
		width: (canvasForMemories.width - 500),
		height: (canvasForMemories.height - 400),

	});

	canvasForMemories.add(rect);

	var name = new fabric.Text("Abhinav Mittal "+"Wrote ", { 

		fill:'#cacaca',
		left: noteLeft+250,
		top: noteTop+70,
		fontFamily:'Segoe UI',
		fontSize: 25,

	});

	canvasForMemories.add(name);

	var time = new fabric.Text("23 November 2014", { 

		fill:'#cacaca',
		left: noteLeft+150,
		top: noteTop+105+(canvasForMemories.height - 400),
		fontFamily:'Segoe UI',
		fontSize: 25,

	});

	canvasForMemories.add(time);

	var place = new fabric.Text(currNoteItem.place, { 

		fill:'#cacaca',
		left: noteLeft+150+canvasForMemories.width - 500,
		top: noteTop+105+canvasForMemories.height - 400,
		fontFamily:'Segoe UI',
		fontSize: 25,
		originX: 'right',


	});

	canvasForMemories.add(place);

	var unformatted = new fabric.Text("\" "+currNoteItem.description+" \"", {
		left: noteLeft+200,
		top: noteTop+150,
		fill: '#6b5455',
		fontFamily: 'Segoe UI',
		fontSize: 35
	});



	var description = wrapCanvasText(unformatted, canvasForMemories, 800, 500, 'justify');
	description.top = noteTop+200;
	description.left = noteLeft+200;
	canvasForMemories.add(description);





	fabric.Image.fromURL("https://s3-ap-southeast-1.amazonaws.com/traveljar-production/uploads/picture/picture_file/5/abhinav-side.jpg", function(oImg) {
		oImg.scale(1.0).set({
			left: noteLeft+50,
			top: noteTop,
			width: 200,
			height: 200,
			clipTo: function (ctx) {
	        	// context.arc(x, y, r, sAngle, eAngle, counterclockwise);
	        	ctx.arc(0, 0, 75, 0, Math.PI * 2, true);
	        }
	    });

		// Add a name below the text
		// And group it with above image
		

		
		canvasForMemories.add(oImg);

		// Add animation
		cross_anime(oImg,-200,noteLeft+50,-200,noteTop,3000);
		cross_anime(name,-200,noteLeft+250,-200,noteTop+70,3000);
		cross_anime(time,-200,noteLeft+150,1000,noteTop+105+(canvasForMemories.height - 400),3000);
		cross_anime(place,1500,noteLeft+150+canvasForMemories.width - 500,1000,noteTop+105+canvasForMemories.height - 400,3000);

		
		description.animate('opacity', 1, {
			from:0,
			onChange: canvas.renderAll.bind(canvas),
			duration: 2000, 

		})


		rect.animate('angle', 0, {
			from: 0,
			onChange: canvasForMemories.renderAll.bind(canvasForMemories),
			duration: 5000,

			onComplete: function(){
				console.log(currNoteIndex++);
				currNoteIndex++;
				canvasForMemories.remove(name);
				canvasForMemories.remove(rect);
				canvasForMemories.remove(description);
				canvasForMemories.remove(oImg);
				canvasForMemories.remove(place);
				canvasForMemories.remove(time);
				showNotes();
			}
		});






	});





}






























