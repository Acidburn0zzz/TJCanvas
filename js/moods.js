console.log("Moods js loadade");

var totalMoodsInMilestone;
var currMoodIndex = 0;
var currMoodItem;

var moodLeft = 100;
var moodTop = 100;
var cent=$(window).width();
var hei=$(window).height();

var totalAvailableWidth = natWidth - gapOnRight - sidePicItemWidth;
var moodMargin = 40;
var moodMainWidth = totalAvailableWidth - moodMargin*2;
var moodMainHeight = natHeight - moodMargin*2;
var moodPicHeight = 200;

var moodIcon = moodIcons();



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
		curMilestoneIndex++;
		currMilestoneLeft = milestoneItemLeft;
		currMilestoneTop = milestoneItemTop;
		initPictures();
	}
}

function addMood(){



	console.log("addMood called");
	// set canavs background image 
	// Put same image with a little opacity



	var rect = new fabric.Rect({
		left: moodMargin,
		top: moodMargin,
		opacity: 1,
		fill: '#234b31',
		width: moodMainWidth,
		height: moodMainHeight,
		rx:15,
		ry:15,

	});
	canvasForMemories.add(rect);

	fabric.Image.fromURL(picURL, function(proPic) {
		proPic.scale(1.0).set({
			left: moodMargin+moodMainWidth/3,
			top: moodMargin+120,
			width: moodPicHeight,
			height: moodPicHeight,
			originX: 'center',
			originY: 'center',
			clipTo: function (ctx) {
				roundedRect(ctx, -moodPicHeight/2, -moodPicHeight/2, moodPicHeight, moodPicHeight, 15);
			}

	    });

	var border = new fabric.Rect({

	width: moodPicHeight+2,
	height: moodPicHeight+2,
    fill: false,
    stroke: '#fff',
    originX: 'center',
    originY: 'center',
    strokeWidth:3,
    left: moodMargin+moodMainWidth/3,
			top: moodMargin+120,
    rx: 15,
    ry: 15
	});
  canvasForMemories.add(border);
		// Add a name below the text
		// And group it with above image
		var personName = new fabric.Text(res[0], { 
			left: moodMargin+moodMainWidth/3,
			top: moodMargin+moodPicHeight+60,
			textDecoration: 'underline',
			width: (60),
			height: (60),
			originX: 'center',
			originY: 'center',
			fontFamily:'Segoe UI',
			fontSize: 45,
			fill:'#ffffff',
		});

  var simp_text = new fabric.Text("was feeling", { 

  	fill:'#ffffff',
  	left: moodMargin+moodMainWidth/3,
  	top: moodMargin+moodPicHeight+60+50,
  	fontFamily:'Segoe UI',
  	fontSize: 45,
  	originX: 'center',
  	originY: 'center',


  });



  var simp_text2 = new fabric.Text("because of", { 

  	fill:'#ffffff',
  	left: moodMargin+moodMainWidth/3,
  	top: moodMargin+moodPicHeight+60+50+120,
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
  reason_f.top = moodMargin+moodPicHeight+60+50+120+20;
  reason_f.left = moodMargin+moodMainWidth/3;


  var group2 = new fabric.Group([ simp_text,simp_text2, reason_f ], {

  });

  canvasForMemories.add(group2);



		var group = new fabric.Group([ proPic, personName ], {

		});

		canvasForMemories.add(group);

		group.animate('opacity', 1, {
			from: 0,
			onChange: canvasForMemories.renderAll.bind(canvasForMemories),
			duration: 1500,
			onComplete: function(){
				console.log("adsdasdasdasd");
				group.animate('angle', 0, {
					from: 0,
					onChange: canvasForMemories.renderAll.bind(canvasForMemories),
					duration: 4000,

					onComplete: function(){
						canvasForMemories.remove(group);
						canvasForMemories.remove(group2);
						canvasForMemories.remove(border);
					}
				});



			}

		});




	});
var people=currMoodItem.person;
var res = people.split(", ");
var l=res.length;
console.log(l);

  fabric.Image.fromURL(moodIcon[currMoodItem.mood], function(moodi) {
  // scale image down, and flip it, before adding it onto canvas
  moodi.scale(1).set({
  	left: moodMargin+moodMainWidth/3,
  	top: moodMargin+moodPicHeight+60+50+60,
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
				currMoodIndex++;
  				
  				canvasForMemories.remove(rect);
  				

  				showMoods();
  			}
  		});


  	}

  });


});








}






























