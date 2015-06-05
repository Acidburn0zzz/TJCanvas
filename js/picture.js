console.log("picture js loadad");


var totalPicturesInMilestone;
var currPictureIndex = 0;
var currPictureItem;
var picCount = -1;

// Defines from where the image is being animated
var originx;
var originy;

// Initial positions of pictures where  ther are animated from
var picLeft;
var picTop;

// Screen sizes
var totalAvailableWidth = natWidth - gapOnRight - sidePicItemWidth;
var picMargin = 40;
var picMainWidth = totalAvailableWidth - picMargin*2;
var picMainHeight = natHeight - picMargin*2;

function initPictures(){
	console.log("init pictures called");
	// Hide the base canvas and show separate canvas for memories
	$('#c').hide();
	$('#cb').show();
	$('#canvasForMemories').show();
	//console.log("in initPictures ", milestonesArray, curMilestoneIndex);
	totalPicturesInMilestone = milestonesArray[curMilestoneIndex].stone.pictures.length;
	showPictures();
}

function showPictures(){
	// console.log("showPictures with total pictures = " + totalPicturesInMilestone);
	if(currPictureIndex < totalPicturesInMilestone){
		currPictureItem = milestonesArray[curMilestoneIndex].stone.pictures[currPictureIndex].picture;
		picCount++;
		addPicture();
	}
	else{
		// this is the break-point for pictures
		console.log("no pictures present");
		currPictureIndex = 0;
		canvasForMemories.clear().renderAll();
		initVideo();
	}
}

function addPicture(){

	// console.log("addPicture called");
	// preloading
	// newImg = $('#sampleImg');
	var newImg = new Image();
	newImg.src = currPictureItem.path;

	console.log(images[picCount].src);
	console.log(currPictureItem.path);
	console.log(newImg.naturalWidth);
	console.log(newImg.naturalHeight);
	

	
	// set canavs background image 
	// Put same image with a little opacity

	// CHeck if the picture is portrait or landscape
	// Limit the pictures width accordingly
	//console.log("checkong for orientation")
	if(newImg.naturalWidth < newImg.naturalHeight ){
		// portrait
		console.log("its a portrait image");
		// console.log(newImg.width());
		// console.log(newImg.height());
		// picMainWidth = newImg.width();
		picMainWidth = 350;

		if(currPictureIndex%2==0){
			originx='left';
			originy='top';
			picLeft = (totalAvailableWidth - picMainWidth)/2;
			picTop = picMargin;
		}
		else{
			originx='right';
			originy='bottom';
			picLeft = (totalAvailableWidth - picMainWidth)/2 + picMainWidth;
			picTop = natHeight - picMargin;
		}
	}
	else{
		// landscape
		console.log("its a landscape image");
		picMainWidth = totalAvailableWidth - picMargin*2;

		if(currPictureIndex%2==0){
			originx='left';
			originy='top';
			picLeft = picMargin;
			picTop = picMargin;
		}
		else{
			originx='right';
			originy='bottom';
			picLeft = totalAvailableWidth - picMargin;
			picTop = natHeight - picMargin;
		}
	}

	// inside image with original colors
	fabric.Image.fromURL(currPictureItem.path, function(innerImg) {
		innerImg.scale(1.0).set({
			top:picTop,
			left:picLeft,
			originX: originx,
			originY: originy,
			clipTo: function (ctx) {
				roundedRect(ctx, -picMainWidth/2, -picMainHeight/2, picMainWidth, picMainHeight, 15);
			}
			//stroke: 'white',
			//strokeWidth: 10
		});
		canvasForMemories.add(innerImg);
		canvasForMemories.sendBackwards(innerImg);


		// animate image wrt height
		innerImg.animate('height', picMainHeight, {
			from: 0,
			onChange: canvasForMemories.renderAll.bind(canvasForMemories),
			duration: 1000,
			easing: fabric.util.ease.easeInQuad,
			
			onComplete: function(){
				canvasForMemories.sendBackwards(innerImg);
				canvasForMemories.sendBackwards(innerImg);
				innerImg.animate('', 2, {
					from: 1,
					onChange: canvas.renderAll.bind(canvas),
					duration: 1700,
					easing: fabric.util.ease.easeInQuad,
				});
			}

		});


		innerImg.animate('width', picMainWidth, {
			from: 0,
			onChange: canvasForMemories.renderAll.bind(canvasForMemories),
			duration: 1000,
			easing: fabric.util.ease.easeInQuad,
			onComplete: function(){
				canvasForMemories.sendBackwards(innerImg);
				canvasForMemories.sendBackwards(innerImg);
				innerImg.animate('angle', 0, {
					from: 0,
					onChange: canvas.renderAll.bind(canvas),
					duration: 1700,
					easing: fabric.util.ease.easeInQuad,
					onComplete: function(){
						canvasForMemories.sendBackwards(innerImg);
						canvasForMemories.sendBackwards(innerImg);
						canvasForMemories.remove(innerImg);
						currPictureIndex++;
						showPictures();
					}
				});
			}
		});
	});



// TO generate "Day" text with animation at bottom
var rect = new fabric.Rect({
	left: natWidth/16-10,
	top: natHeight*7/8-20,
	fill: '#809eff',
	height: 45,
	rx: 22.5,
	ry:22.5,
	originX: 'left',
	originY: 'center',
	angle:5,
});
canvasForMemories.add(rect);
canvasForMemories.renderAll();
rect.animate('width', 300, {
	from: 0,
	onChange: canvasForMemories.renderAll.bind(canvasForMemories),
	duration: 500,
	easing: fabric.util.ease.easeInQuad,
	onComplete: function(){

		rect.animate('opacity', 1, {
			from: 1,
			onChange: canvasForMemories.renderAll.bind(canvasForMemories),
			duration: 1500,
			easing: fabric.util.ease.easeInQuad,
			onComplete: function(){
				rect.animate('width', 0, {
					from: 300,
					onChange: canvasForMemories.renderAll.bind(canvasForMemories),
					duration: 500,
					easing: fabric.util.ease.easeInQuad,

				});


			}
		});


	}
});


var rect2 = new fabric.Rect({
	left: natWidth/16-10,
	top: natHeight*7/8-20,
	fill: '#ffce69',
	height: 45,
	rx: 22.5,
	ry:22.5,
	originX: 'left',
	originY: 'center',
	angle:5,
});
canvasForMemories.add(rect2);

rect2.animate('opacity', 1, {
	from: 1,
	onChange: canvasForMemories.renderAll.bind(canvasForMemories),
	duration: 250,
	easing: fabric.util.ease.easeInQuad,
	onComplete: function(){

		rect2.animate('width', 300, {
			from: 0,
			onChange: canvasForMemories.renderAll.bind(canvasForMemories),
			duration: 500,
			easing: fabric.util.ease.easeInQuad,
			onComplete: function(){

				rect2.animate('opacity', 1, {
					from:1,
					onChange: canvasForMemories.renderAll.bind(canvasForMemories),
					duration: 1000,
					easing: fabric.util.ease.easeInQuad,
					onComplete: function(){
						rect2.animate('width', 0, {
							from: 300,
							onChange: canvasForMemories.renderAll.bind(canvasForMemories),
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


var text = new fabric.Text("F  R  I  D  A  Y", { 
	left: -400,
	top: natHeight*7/8-20+12.5,
	originX: 'center',
	originY: 'center',
	fontFamily: 'Comic Sans',
	fontSize: 30,
	fill: '#ffffff',
	angle: 5,

});
canvasForMemories.add(text);

text.animate('opacity', 1, {
	from: 1,
	onChange: canvasForMemories.renderAll.bind(canvasForMemories),
	duration: 250,
	easing: fabric.util.ease.easeInQuad,
	onComplete: function(){


		text.animate('left', natWidth/16-10+150, {
			from: -400,
			onChange: canvasForMemories.renderAll.bind(canvasForMemories),
			duration: 500,
			easing: fabric.util.ease.easeInQuad,
			onComplete: function(){
				text.animate('opacity', 1, {
					from: 1,
					onChange: canvasForMemories.renderAll.bind(canvasForMemories),
					duration: 1000,
					easing: fabric.util.ease.easeInQuad,
					onComplete: function(){

						text.animate('opacity', 0, {
							from: 1,
							onChange: canvasForMemories.renderAll.bind(canvasForMemories),
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



var backgroundImage = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

backgroundImage.src = 'https://qualitygrade.files.wordpress.com/2013/03/street-lights-wallpaper.jpg';
var CanvasXSize = natWidth;
var CanvasYSize = natHeight;
var speed = 80; //lower is faster
var scale = 1.05;
var y = -4.5; //vertical offset

// Main program

var dx = 0.75;
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
var ctx;

backgroundImage.onload = function() {
    imgW = natWidth;
    imgH = natHeight;
    if (imgW > CanvasXSize) { x = CanvasXSize-imgW; } // image larger than canvas
    if (imgW > CanvasXSize) { clearX = imgW; } // image larger than canvas
    else { clearX = CanvasXSize; }
    if (imgH > CanvasYSize) { clearY = imgH; } // image larger than canvas
    else { clearY = CanvasYSize; }
    //Get Canvas Element
    ctx = document.getElementById('cb').getContext('2d');
    //Set Refresh Rate
    return setInterval(draw, speed);
}

function draw() {
    //Clear Canvas
    ctx.clearRect(0,0,clearX,clearY);
    //If image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = 0; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx.drawImage(backgroundImage,x-CanvasXSize+1,y,imgW,imgH); }
    }
    //If image is > Canvas Size
    else {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = CanvasXSize-imgW; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx.drawImage(backgroundImage,x-imgW+1,y,imgW,imgH); }
    }
    //draw image
    ctx.drawImage(backgroundImage,x,y,imgW,imgH);
    //amount to move
    x += dx;
}


















