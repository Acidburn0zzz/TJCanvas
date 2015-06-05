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


// var noOfFriends = friends.length;//no of friends
// var friendsNamePicArray = {};


// for (var i = 0; i < noOfFriends; i++) {	
// friends[i].friend_item.name=friends[i].friend_item.profile_image;
// console.log(friends[i].friend_item.profile_image);

// };



// console.log(friendsNamePicArray);





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

			width: width,
			height: height,
clipTo: function (ctx) {
roundedRect(ctx,-width/2,-height/2,width,height,15);
      }
		});
		// Add a name below the text
		// And group it with above image
		// var text = new fabric.Text(name, { 
		// 	left: myLeft, 
		//   	top: myTop + height + 10,
		// 	fontFamily: 'Comic Sans',
		// 	fontSize: 20,
		// 	fontStyle: 'italic',
		// 	shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
		// });

	var border = new fabric.Rect({

	width: width,
	height: height,
    fill: false,
    stroke: '#fff',
    originX: 'left',
    originY: 'top',
    strokeWidth:2,
    rx: 15,
    ry: 15
	});


		var group = new fabric.Group([ oImg, border ], {
	left: myLeft, 
	top: myTop,
		});

		canvas.add(group);

group.animate('left', myLeft, {
			from: 0,
		  	onChange: canvas.renderAll.bind(canvas),
		  	duration: 2000,
		  	easing: fabric.util.ease.easeOutBack,
		  	onComplete: function(){



var rect = new fabric.Rect({
		left: myLeft+10,
		top: myTop + height-10,
		fill: '#809eff',
		height: 30,
		rx: 15,
		ry:15,
		originX: 'left',
		originY: 'top',
		angle:-8,
	});
	canvasForMemories.add(rect);
	canvasForMemories.renderAll();
	rect.animate('height', 30, {
		from: 0,
		onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		duration: 500,
		easing: fabric.util.ease.easeInQuad,
	});
	rect.animate('width', 200, {
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
						from: 50,
						onChange: canvasForMemories.renderAll.bind(canvasForMemories),
						duration: 500,
						easing: fabric.util.ease.easeInQuad,

					});


				}
			});


		}
	});


	var rect2 = new fabric.Rect({
		left: myLeft+10,
		top: myTop + height-10,
		fill: '#ffce69',
		height: 30,
		rx: 15,
		ry:15,
		originX: 'left',
		originY: 'top',
		angle:-8,
	});
	canvasForMemories.add(rect2);

	rect2.animate('opacity', 1, {
		from: 1,
		onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		duration: 250,
		easing: fabric.util.ease.easeInQuad,
		onComplete: function(){
				rect2.animate('height', 30, {
		from: 0,
		onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		duration: 500,
		easing: fabric.util.ease.easeInQuad,
	});
			rect2.animate('width', 200, {
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
								from: 200,
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


var text = new fabric.Text(name, { 
		left: -400,
		top: myTop + height-5,
		originX: 'center',
		originY: 'center',
		fontFamily: 'Comic Sans',
		fontSize: 30,
		fill: '#ffffff',
		angle: -8,
		
	});
	canvasForMemories.add(text);

	text.animate('opacity', 1, {
		from: 1,
		onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		duration: 250,
		easing: fabric.util.ease.easeInQuad,
		onComplete: function(){


			text.animate('left', myLeft+100, {
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

								onComplete: function(){
																group.animate('left', natWidth+200, {
			from: myLeft,
		  	onChange: canvas.renderAll.bind(canvas),
		  	duration: 2000,
		  	easing: fabric.util.ease.easeOutBack,
		  	});	
								}

							});




						}




					});

				}


			});





		}



});




		  	}
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