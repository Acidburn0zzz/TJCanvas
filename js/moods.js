console.log("Moods js loadade");

var totalMoodsInMilestone;
var currMoodIndex = 0;
var currMoodItem;

var moodLeft = 100;
var moodTop = 100;
var cent=$(window).width();
var hei=$(window).height();

var picURL="https://s3-ap-southeast-1.amazonaws.com/traveljar-production/uploads/picture/picture_file/5/abhinav-side.jpg";

function initMood(){
	t=1;
	console.log("init mood called");
	// Hide the base canvas and show separate canvas for memories
	$('#c').hide();
	$('#canvasForMemories').show();
	//console.log("in initmoods ", milestonesArray, curMilestoneIndex);
	totalMoodsInMilestone = milestonesArray[curMilestoneIndex].stone.moods.length;
	showMoods();
}

function showMoods(){
	console.log("showmoods with total moods = " + totalMoodsInMilestone);
	if(currMoodIndex < totalMoodsInMilestone){
		currMoodItem = milestonesArray[curMilestoneIndex].stone.moods[currMoodIndex].mood;
		addMood();
	}
	else{
		// this is the break-point for videos
		console.log("no moods present");
		currMoodIndex = 0;

		initPath();
	}
}

function addMood(){



	console.log("addMood called");
	// set canavs background image 
	// Put same image with a little opacity
	canvasForMemories.setBackgroundColor('#5bb9dc', canvas.renderAll.bind(canvas), {
		
		width : canvasForMemories.width,
		height: canvasForMemories.height,
		originX: 'left',
		originY: 'top'
	});



var rect = new fabric.Rect({
	left: cent/2,
			top: hei/2,
	opacity: 1,
	fill: 'white',
			width: (canvasForMemories.width -400+20),
			height: (canvasForMemories.height-200+20 ),
        originX: 'center',
			originY: 'center'
});

canvasForMemories.add(rect);


var people=currMoodItem.person;
var res = people.split(", ");
var l=res.length;
console.log(l);












fabric.Image.fromURL('http://74211.com/wallpaper/picture_big/free_wallpaper_of_beautiful_scenery_wonderful_Glacier_National_Park.jpg', function(oImg) {
  // scale image down, and flip it, before adding it onto canvas
  oImg.scale(1).set({
			left: cent/2,
			top: hei/2,
			width: (canvasForMemories.width -400),
			height: (canvasForMemories.height-200 ),
			
			opacity:0.2,
			originX: 'center',
			originY: 'center'
			//stroke: 'white',
			//strokeWidth: 10

		});

  canvasForMemories.add(oImg);



	fabric.Image.fromURL(picURL, function(proPic) {
		proPic.scale(1.0).set({
			left: cent/2,
			top: hei/2-150,
			width: (120),
			height: (120),
			originX: 'center',
			originY: 'center',
	        clipTo: function (ctx) {
	        	// context.arc(x, y, r, sAngle, eAngle, counterclockwise);
	            ctx.arc(0, 0, 60, 0, Math.PI * 2, true);
	          }
		});

		// Add a name below the text
		// And group it with above image
		var text = new fabric.Text(res[0], { 
			left: cent/2,
			top: hei/2-50,
			width: (60),
			height: (60),
			originX: 'center',
			originY: 'center',
			fontFamily:'Segoe UI',
			fontSize: 45,
			fill:'#ffffff',
		});

		var group = new fabric.Group([ proPic, text ], {
		 
		});

		canvasForMemories.add(group);

	group.animate('opacity', 1, {
			from: 0,
		  	onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		  	duration: 3000,
		  	onComplete: function(){
		  		console.log("adsdasdasdasd");
		  		group.animate('angle', 0, {
			from: 0,
		  	onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		  	duration: 4000,

		  	onComplete: function(){
		  		canvasForMemories.remove(group);
		  		
		  	}
		  });

		  		
		  		
		  	}

		});




	});






fabric.Image.fromURL('http://images.clipartpanda.com/smiley-face-transparent-background-smile-triste-421a98.gif', function(moodi) {
  // scale image down, and flip it, before adding it onto canvas
  moodi.scale(1).set({
			left: cent/2,
			top: hei/2+50,
			width: (60),
			height: (60),
		

			originX: 'center',
			originY: 'center',
			//stroke: 'white',
			//strokeWidth: 10

		});

  canvasForMemories.add(moodi);

moodi.animate('opacity', 1, {
			from: 0,
		  	onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		  	duration: 3000,
		  	onComplete: function(){
		  		moodi.animate('angle', 0, {
			from: 0,
		  	onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		  	duration: 4000,
		  	onComplete: function(){
		  		canvasForMemories.remove(moodi);
		  		
		  	}
		  });
		  		
		  		
		  	}

		});


});

var simp_text = new fabric.Text("was feeling", { 

		fill:'#ffffff',
		left: cent/2,
		top: hei/2,
		fontFamily:'Segoe UI',
		fontSize: 45,
		originX: 'center',
		originY: 'center',


	});



var simp_text2 = new fabric.Text("because of", { 

		fill:'#ffffff',
		left: cent/2,
		top: hei/2+100,
		fontFamily:'Segoe UI',
		fontSize: 45,
		originX: 'center',
		originY: 'center',


	});


var reason = new fabric.Text("\""+currMoodItem.reason+"\"", { 

		fill:'#ffffff',
		fontFamily:'Segoe UI',
		fontSize: 45,
		originX: 'center',
		


	});

var reason_f = wrapCanvasText(reason, canvasForMemories, 600, 800, 'justify');
	reason_f.top = hei/2+120;
	reason_f.left = cent/2;
	

var group2 = new fabric.Group([ simp_text,simp_text2, reason_f ], {
		 
		});

		canvasForMemories.add(group2);


	group2.animate('opacity', 1, {
			from: 0,
		  	onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		  	duration: 3000,
		  	
		  	onComplete: function(){


	group2.animate('angle', 0, {
			from: 0,
		  	onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		  	duration: 4000,

		  	onComplete: function(){
		  		currMoodIndex++;
		  		canvasForMemories.remove(group2);
		  		canvasForMemories.remove(rect);
		  		canvasForMemories.remove(oImg);

		  		showMoods();
		  		
		  	}
		  });

		  		
		  	}
		});


});

















}






























