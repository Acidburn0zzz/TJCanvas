// It contains JSON object of journey info
var jInfo;

function createStage1(canvas, journeyInfo){
	jInfo = journeyInfo;
	var bg = getBGImage(canvas);
	var txt1 = getJourneyName(canvas);
	// var txt2 = getJourneyTagline(canvas);
	// var txt3 = getJourneyDates(canvas);
	// var txt4 = getJourneyPlaces(canvas);

	// console.log("jInfo = ", journeyInfo);
	// console.log("jInfo.name = ", journeyInfo.name);
	// console.log("jInfo.tagline = ", journeyInfo.tagline);
}

// Draws a background image from an URL to fit the canvas
function getBGImage(canvas){
	console.log("in getBGImage ",jInfo);
	fabric.Image.fromURL('./img/7.jpg', function(oImg) {
		oImg.scale(1.0).set({
			left: 0,
			top: 0,
			width: natWidth,
			height: natHeight
		});
		canvas.add(oImg).setActiveObject(oImg);
		oImg.sendToBack();
		canvas.deactivateAll().renderAll();
	});

	
}

function getJourneyName(canvas){
	
	var rect = new fabric.Rect({
		left: natWidth*1/8,
		top: natHeight/2+250,
		fill: '#809eff',
		height: 50,
		rx: 20,
		ry:20,
		originX: 'left',
		originY: 'center',
	});
	canvas.add(rect);
	rect.animate('width', natWidth*3/4, {
		from: 0,
		onChange: canvas.renderAll.bind(canvas),
		duration: 750,
		easing: fabric.util.ease.easeInQuad,
		onComplete: function(){

			rect.animate('angle', 0, {
				from: 0,
				onChange: canvas.renderAll.bind(canvas),
				duration: 3000,
				easing: fabric.util.ease.easeInQuad,
				onComplete: function(){
					rect.animate('width', 0, {
						from: natWidth*3/4,
						onChange: canvas.renderAll.bind(canvas),
						duration: 500,
						easing: fabric.util.ease.easeInQuad,

					});


				}
			});


		}
	});



	var rect2 = new fabric.Rect({
		left: natWidth*1/8,
		top: natHeight/2+250,
		fill: '#ffce69',

		height: 50,
		rx: 20,
		ry:20,
		originX: 'left',
		originY: 'center',
	});
	canvas.add(rect2);


	rect2.animate('angle', 0, {
		from: 0,
		onChange: canvas.renderAll.bind(canvas),
		duration: 500,
		easing: fabric.util.ease.easeInQuad,
		onComplete: function(){

			rect2.animate('width', natWidth*3/4, {
				from: 0,
				onChange: canvas.renderAll.bind(canvas),
				duration: 500,
				easing: fabric.util.ease.easeInQuad,
				onComplete: function(){

					rect2.animate('angle', 0, {
						from: 0,
						onChange: canvas.renderAll.bind(canvas),
						duration: 2500,
						easing: fabric.util.ease.easeInQuad,
						onComplete: function(){
							rect2.animate('width', 0, {
								from: natWidth*3/4,
								onChange: canvas.renderAll.bind(canvas),
								duration: 500,
								easing: fabric.util.ease.easeInQuad,
								onComplete: function(){


								}
							});


						}
					});


				}
			});


		}
	});







	var text = new fabric.Text(jInfo.name, { 
		
		top: natHeight/2+250,
		left:-1000,
		originX: 'center',
		originY: 'center',
		fontFamily: 'Comic Sans',
		fontSize: 30,
		fill: '#14318e',
		
	});
	canvas.add(text);


	text.animate('angle', 0, {
		from: 0,
		onChange: canvas.renderAll.bind(canvas),
		duration: 500,
		easing: fabric.util.ease.easeInQuad,
		onComplete: function(){


			text.animate('left', natWidth/2, {
				from: -1000,
				onChange: canvas.renderAll.bind(canvas),
				duration: 500,
				easing: fabric.util.ease.easeInQuad,
				onComplete: function(){
					text.animate('angle', 0, {
						from: 0,
						onChange: canvas.renderAll.bind(canvas),
						duration: 3000,
						easing: fabric.util.ease.easeInQuad,
						onComplete: function(){

							text.animate('left', -1000, {
								from: natWidth/2,
								onChange: canvas.renderAll.bind(canvas),
								duration: 500,
								easing: fabric.util.ease.easeInQuad,

							});




						}




					});

				}


			});





		}



});
















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
	text.animate('left', (natWidth/2) - (text.width/2), {
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
		top: (natHeight - 100),
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
		left: (natWidth - 100), 
		top: (natHeight - 100),
		fontFamily: 'Comic Sans',
		fontSize: 30,
		fontStyle: 'italic',
		shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
	});
	canvas.add(text);

	return text;
}



