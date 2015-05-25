// It contains JSON object of journey info
var jInfo;

function createStage1(canvas, journeyInfo){
	jInfo = journeyInfo;

	var bg = getBGImage(canvas);
	var txt1 = getJourneyName(canvas);
	var txt2 = getJourneyTagline(canvas);
	var txt3 = getJourneyDates(canvas);
	var txt4 = getJourneyPlaces(canvas);

	// console.log("jInfo = ", journeyInfo);
	// console.log("jInfo.name = ", journeyInfo.name);
	// console.log("jInfo.tagline = ", journeyInfo.tagline);
}

// Draws a background image from an URL to fit the canvas
function getBGImage(canvas){
	console.log("in getBGImage ",jInfo);
	fabric.Image.fromURL('./img/7.jpg', function(oImg) {
		oImg.scale(1.0).set({
			left: 1,
			top: 1,
			width: canvas.width,
			height: canvas.height
		});
		canvas.add(oImg).setActiveObject(oImg);
		oImg.sendToBack();
		//canvas.renderAll();

		return oImg;
	});

	
}

function getJourneyName(canvas){
	var text = new fabric.Text(jInfo.name, { 
		top: 60,
		fontFamily: 'Comic Sans',
		fontSize: 40,
		fontWeight: 'bold',
		shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
	});
	canvas.add(text);
	text.centerH();

	return text;
}

function getJourneyTagline(canvas){
	var tagLine = (jInfo.tag_line === null) ? 'Not all those who wander are lost!' : jInfo.tag_line;
	var text = new fabric.Text( tagLine, { 
		top: 100,
		fontFamily: 'Comic Sans',
		fontSize: 30,
		fontStyle: 'italic',
		shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
	});
	canvas.add(text);
	text.centerH();

	// Add animation
	text.animate('left', (canvas.width/2) - (text.width/2), {
		from: 0,
	  	onChange: canvas.renderAll.bind(canvas),
	  	duration: 2000,
	  	easing: fabric.util.ease.easeOutBounce
	});

	return text;
}

function getJourneyDates(canvas){
	var timestamp = new Date(jInfo.start_date);
    var formattedDate = timestamp.toDateString();

	var text = new fabric.Text(formattedDate, { 
		left: 50, 
		top: (canvas.height - 100),
		fontFamily: 'Comic Sans',
		fontSize: 30,
		fontStyle: 'italic',
		shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
	});
	canvas.add(text);

	return text;
}

function getJourneyPlaces(canvas){
	var text = new fabric.Text(jInfo.place[0].place_item, { 
		left: (canvas.width - 100), 
		top: (canvas.height - 100),
		fontFamily: 'Comic Sans',
		fontSize: 30,
		fontStyle: 'italic',
		shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
	});
	canvas.add(text);

	return text;
}



