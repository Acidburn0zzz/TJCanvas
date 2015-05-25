console.log("stage2 js lodaed");

var headingTop = 75;   // the heading area
var workableHeight;   // the entire area minus the heading area for the buddies to show

function createStage2(canvas, friends){
	// clear all objects added for stage 1
	canvas.clear();

	// set canavs background image 
	canvas.setBackgroundImage('./img/buddy_bg.jpg', canvas.renderAll.bind(canvas), {
	  opacity: 0.5,
	  width : canvas.width,
	  height: canvas.height,
	  originX: 'left',
	  originY: 'top'
	});

	AddHeading(canvas);
	showAllBuddies(canvas, friends);
}

// Adds buddies ( image + name ) depending upon the number of buddies
// count = number of buddies
// friends = JSON object having all info about friends
function showAllBuddies(canvas, friends){
	var buddyPicWidth = 150;
	var buddyPicHeight = 150;
	var count = friends.length;

	if(count<5){
		for(i=0; i<count; i++){
			// calculate correct position to place
			var myLeft = ((canvas.width/count)/2) - buddyPicWidth/2 + (i*(canvas.width/count));
			var myTop = (workableHeight/2) - buddyPicHeight/2 + headingTop;
			addBuddy(canvas, myLeft, myTop, buddyPicWidth, buddyPicHeight, friends[i].friend_item.profile_image, friends[i].friend_item.name);
		}
	}
	else
	{
		for(i=0; i<4; i++){
			// calculate correct position to place
			var myLeft = ((canvas.width/4)/2) - buddyPicWidth/2 + (i*(canvas.width/4));
			var myTop = (workableHeight/4) - buddyPicHeight/2 + headingTop;
			addBuddy(canvas, myLeft, myTop, buddyPicWidth, buddyPicHeight, friends[i].friend_item.profile_image, friends[i].friend_item.name);

			console.log(workableHeight, " headingTop = " ,headingTop, "myTop = " , myTop);
		}	

		count = count - 4 ;
		for(i=0; i<count; i++){
			// calculate correct position to place
			var myLeft = ((canvas.width/count)/2) - buddyPicWidth/2 + (i*(canvas.width/count));
			var myTop = ((workableHeight/4))*3 - buddyPicHeight/2 + headingTop;
			addBuddy(canvas, myLeft, myTop, buddyPicWidth, buddyPicHeight, friends[i].friend_item.profile_image, friends[i].friend_item.name);
		}	
	}
}


function addBuddy(canvas, myLeft, myTop, width, height, picURL, name){

	console.log(myLeft, "----",myTop);
	// get the URL and make a circular image
	fabric.Image.fromURL(picURL, function(oImg) {
		oImg.scale(1.0).set({
			left: myLeft, 
		  	top: myTop,
			width: width,
			height: height,
	        clipTo: function (ctx) {
	        	// context.arc(x, y, r, sAngle, eAngle, counterclockwise);
	            ctx.arc(0, 0, width/2, 0, Math.PI * 2, true);
	          }
		});

		// Add a name below the text
		// And group it with above image
		var text = new fabric.Text(name, { 
			left: myLeft, 
		  	top: myTop + height + 10,
			fontFamily: 'Comic Sans',
			fontSize: 20,
			fontStyle: 'italic',
			shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
		});

		var group = new fabric.Group([ oImg, text ], {
		 
		});

		canvas.add(group);

		// Add animation
		group.animate('left', myLeft, {
			from: 0,
		  	onChange: canvas.renderAll.bind(canvas),
		  	duration: 2000,
		  	easing: fabric.util.ease.easeOutBounce
		});
	});
}

// To add "Memory Creator" as Heading on Stage 2
function AddHeading(canvas){

	// set workableHeight globally
	workableHeight = (canvas.height - headingTop);
	console.log(canvas.height, "workable  =", workableHeight, " headingTop = ", headingTop);

	var text = new fabric.Text('Memory Creators', { 
			top: headingTop,
			fontFamily: 'Comic Sans',
			fontSize: 30,
			fontWeight: 'bold',
			fontStyle: 'italic',
			shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
		});

	canvas.add(text);
	text.centerH();
}