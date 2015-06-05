console.log("Video js loadad");

var totalVideosInMilestone;
var currVideoIndex = 0;
var currVideoItem;

var videoLeft;
var videoTop;

// Screen sizes
var totalAvailableWidth = natWidth - gapOnRight - sidePicItemWidth;
var videoMargin = 40;
var videoMainWidth = totalAvailableWidth - videoMargin*2;
var videoMainHeight = natHeight - videoMargin*2;
var t=1;//time for rec

var totalVideoLength = 10;

function initVideo(){
	console.log("init video called");
	// Hide the base canvas and show separate canvas for memories
	$('#c').hide();
	$('#canvasForMemories').show();
	//console.log("in initVideos ", milestonesArray, curMilestoneIndex);
	totalVideosInMilestone = milestonesArray[curMilestoneIndex].stone.videos.length;
	showVideos();
}

function showVideos(){
	console.log("showVideos with total video = " + totalVideosInMilestone);
	if(currVideoIndex < totalVideosInMilestone){
		currVideoItem = milestonesArray[curMilestoneIndex].stone.videos[currVideoIndex].video;
		addVideo();
	}
	else{
		// this is the break-point for videos
		console.log("no videos present");
		currVideoIndex = 0;

		initNote();
	}
}

function addVideo(){
	t=1;
	document.getElementById("v").src=currVideoItem.path;


	console.log("addVideo called");
	// set canavs background image 
	// Put same image with a little opacity

		originx='left';
		originy='top';
		videoLeft = videoMargin;
		videoTop = videoMargin;



	// canvasForMemories.setBackgroundImage("https://traveljar-production.s3.amazonaws.com/uploads/picture/picture_file/4/38003175-6a87-4cc0-b0ea-cb9b2350342e", canvas.renderAll.bind(canvas), {
	// 	opacity: 0.5,
	// 	width : canvasForMemories.width,
	// 	height: canvasForMemories.height,
	// 	originX: 'left',
	// 	originY: 'top'
	// });


var video1El = document.getElementById('v');
var video1 = new fabric.Image(video1El, {
	top:videoTop,
	left:videoLeft,
	originX: originx,
	originY: originy,
	height: videoMainHeight,
	width: videoMainWidth,

	clipTo: function (ctx) {
		roundedRect(ctx, -videoMainWidth/2, -videoMainHeight/2, videoMainWidth, videoMainHeight, 15);
	}
	

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







var whiteBorder = new fabric.Rect({
	opacity: 0.5,
	fill: '',
	left: videoLeft+20,
	top: videoTop+20,
	width: videoMainWidth-40,
	height: videoMainHeight-40,
	stroke: '#ffffff',
	strokeWidth: 2,
	rx:15,
	rx:15,
});

var rec = new fabric.Text("REC", { 

	fill:'#ffffff',
	top: videoTop+30,
	left: videoLeft+videoMainWidth-110,
	fontFamily: 'Comic Sans',
	fontSize: 20,
	fontStyle: 'italic',
	shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
});

var circle = new fabric.Circle({
	radius: 8, 
	fill: 'red',
	top: videoTop+33,
	left: videoLeft+videoMainWidth-60, 
	strokeWidth:1,
	stroke:'#ffffff',

});

canvasForMemories.add(video1);


console.log(video1)
var group = new fabric.Group([ whiteBorder,rec,circle], {
		  	//left: picLeft,
			//top: picTop,
		});
console.log('hell');

canvasForMemories.sendBackwards(video1);
canvasForMemories.renderAll();




blink();
function blink () {
	t=t+1;
	circle.animate('opacity', 0, {
		onChange: canvas.renderAll.bind(canvas),
		duration: 1000, 
		onComplete:function() {
			circle.animate('opacity', 1, {
				onChange: canvas.renderAll.bind(canvas),
				duration: 1000, 
				onComplete:function(){
					if(t<10){
						blink();
					}
				}
			})
		} 

	});


}










canvas.renderAll();
video1.getElement().play();


fabric.util.requestAnimFrame(function render() {

	canvas.renderAll();
	fabric.util.requestAnimFrame(render);
});
canvasForMemories.add(group);
group.animate('angle', 0, {
	from: 0,
	onChange: canvasForMemories.renderAll.bind(canvasForMemories),
	duration: totalVideoLength*1000,

	onComplete: function(){
		currVideoIndex++;
		console.log('curr video index'+(currVideoIndex));
		video1.getElement().pause();
		canvasForMemories.remove(video1);
		canvasForMemories.remove(group);
		
		showVideos();
	}
});





}



