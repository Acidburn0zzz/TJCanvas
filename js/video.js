console.log("Video js loadade");

var totalVideosInMilestone;
var currVideoIndex = 0;
var currVideoItem;

var videoLeft = 100;
var videoTop = 100;
var t=1;//time for rec




function initVideo(){
	t=1;
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

document.getElementById("v").src="https://traveljar-development.s3.amazonaws.com/uploads/video/video_file/8/4097cff4-7267-43b1-a49c-3ce722e65530";


	console.log("addVideo called");
	// set canavs background image 
	// Put same image with a little opacity
	canvasForMemories.setBackgroundImage("https://traveljar-production.s3.amazonaws.com/uploads/picture/picture_file/4/38003175-6a87-4cc0-b0ea-cb9b2350342e", canvas.renderAll.bind(canvas), {
		opacity: 0.5,
		width : canvasForMemories.width,
		height: canvasForMemories.height,
		originX: 'left',
		originY: 'top'
	});


	var video1El = document.getElementById('v');
	var video1 = new fabric.Image(video1El, {
  	left: videoLeft,
	top: videoTop,
	width: (canvasForMemories.width - 200),
	height: (canvasForMemories.height - 200),
	
 
});


var rect = new fabric.Rect({
	opacity: 0.5,
	fill: '',
  left: videoLeft+10,
	top: videoTop+10,
	width: (canvasForMemories.width - 220),
	height: (canvasForMemories.height - 220),
    stroke: '#ffffff',
        strokeWidth: 2,
});

var rec = new fabric.Text("Rec", { 
			
			fill:'#ffffff',
			top: videoTop+20,
			left: canvasForMemories.width-240,
			fontFamily: 'Comic Sans',
			fontSize: 20,
			fontStyle: 'italic',
			shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
		});

var circle = new fabric.Circle({
  radius: 6, 
  fill: 'red',
  top: videoTop+27,
  left: canvasForMemories.width-200, 

});

			var caption = new fabric.Text(currVideoItem.caption, { 
			left : (canvasForMemories.width/2),
			top: picTop - 50,
			fontFamily: 'Comic Sans',
			fontSize: 20,
			fontStyle: 'italic',
			shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
		});
		caption.setLeft((canvasForMemories.width/2) - caption.width/2);

		var place = new fabric.Text(currVideoItem.place, { 
			left: (canvasForMemories.width - picLeft*2),
			top: (canvasForMemories.height - picTop),
			fontFamily: 'Comic Sans',
			fontSize: 20,
			fontStyle: 'italic',
			shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
		});


console.log(video1)
var group = new fabric.Group([ video1, rect,rec,circle,caption, place ], {
		  	//left: picLeft,
			//top: picTop,
		});

		canvasForMemories.add(group);



function blink () {
 t=t+1;
 console.log(t);
 circle.animate('opacity', 0, {
  onChange: canvas.renderAll.bind(canvas),
  duration: 1000, 
  onComplete:function() {
     circle.animate('opacity', 1, {
  onChange: canvas.renderAll.bind(canvas),
  duration: 1000, 
  onComplete:function(){
    if(t<10){
    console.log("a");
    blink();
  }
  }
})
  } 
 
});


}


blink();




		group.animate('angle', 0, {
			from: 0,
		  	onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		  	duration: 12000,
		  	
		  	onComplete: function(){
		  		console.log(currVideoIndex++);
		  		currVideoIndex++;
		  		canvasForMemories.remove(group);
		  		showVideos();
		  	}
		});






canvas.renderAll();
video1.getElement().play();


fabric.util.requestAnimFrame(function render() {
		
  canvas.renderAll();
  fabric.util.requestAnimFrame(render);
});


}



