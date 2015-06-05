console.log("sidepicture js loaded");

// Screen sizes
var picArray = new Array(8);
var sidePicItemHeight = ($(window).height())/5;
var sidePicItemWidth = sidePicItemHeight;
var picSpace = ($(window).height())/25;
var pic1Start = picSpace;

var gapOnRight = picSpace;

for(var i = 0; i < picArray.length; i++){
	picArray[i]="file:///Users/Anubhav/Desktop/untitled%20folder%202/"+i+".jpg";
	console.log(picArray[i]);
}


function showSidePictures (){
	var imgLeft=natWidth+200;
	console.log('called');
	for (var a=[],i=0;i<picArray.length;++i) {
		a[i]=i;
	}
	a = shuffle(a);
	console.log(picArray);
	fabric.Image.fromURL(picArray[a[0]], function(Img1) {
		Img1.scale(1.0).set({
			top:pic1Start,
			height:sidePicItemHeight,
			left:imgLeft,
			width:sidePicItemHeight,
			clipTo: function (ctx) {
				roundedRect(ctx,-sidePicItemHeight/2,-sidePicItemHeight/2,sidePicItemHeight,sidePicItemHeight,15);
			}
		});
		canvasForMemories.add(Img1);

		Img1.animate('opacity', 1, {
			from: 1,
			onChange: canvasForMemories.renderAll.bind(canvasForMemories),
			duration: 1,
			easing: fabric.util.ease.easeInQuad,
			onComplete: function(){
				Img1.animate('left',natWidth - (gapOnRight + sidePicItemHeight), {
					from: natWidth+200,
					onChange: canvasForMemories.renderAll.bind(canvasForMemories),
					duration: 1500,
					easing: fabric.util.ease.easeOutBack,
					onComplete: function(){

						Img1.animate('opacity', 1, {
							from: 1,
							onChange: canvasForMemories.renderAll.bind(canvasForMemories),
							duration: 5000,
							easing: fabric.util.ease.easeInQuad,
							onComplete: function(){
								Img1.animate('left', natWidth+200, {
									from: natWidth - (gapOnRight + sidePicItemHeight),
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
	});


fabric.Image.fromURL(picArray[a[1]], function(Img2) {
	Img2.scale(1.0).set({
		top:pic1Start+picSpace+sidePicItemHeight,
		height:sidePicItemHeight,
		left:imgLeft,
		width:sidePicItemHeight,
		clipTo: function (ctx) {
			roundedRect(ctx,-sidePicItemHeight/2,-sidePicItemHeight/2,sidePicItemHeight,sidePicItemHeight,15);
		}
	});
	canvasForMemories.add(Img2);
	Img2.animate('opacity', 1, {
		from: 1,
		onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		duration: 200,
		easing: fabric.util.ease.easeInQuad,
		onComplete: function(){
			Img2.animate('left',natWidth-(gapOnRight + sidePicItemHeight) , {
				from: natWidth+200,
				onChange: canvasForMemories.renderAll.bind(canvasForMemories),
				duration: 1500,
				easing: fabric.util.ease.easeOutBack,
				onComplete: function(){

					Img2.animate('opacity', 1, {
						from: 1,
						onChange: canvasForMemories.renderAll.bind(canvasForMemories),
						duration: 5000,
						easing: fabric.util.ease.easeInQuad,
						onComplete: function(){
							Img2.animate('left', natWidth+200, {
								from: natWidth - (gapOnRight + sidePicItemHeight),
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
});

fabric.Image.fromURL(picArray[a[2]], function(Img3) {
	Img3.scale(1.0).set({
		top:pic1Start+picSpace*2+sidePicItemHeight*2,
		height:sidePicItemHeight,
		left:imgLeft,
		width:sidePicItemHeight,
		clipTo: function (ctx) {
			roundedRect(ctx,-sidePicItemHeight/2,-sidePicItemHeight/2,sidePicItemHeight,sidePicItemHeight,15);
		}
	});
	canvasForMemories.add(Img3);
	Img3.animate('opacity', 1, {
		from: 1,
		onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		duration: 400,
		easing: fabric.util.ease.easeInQuad,
		onComplete: function(){
			Img3.animate('left',natWidth-(gapOnRight + sidePicItemHeight) , {
				from: natWidth+200,
				onChange: canvasForMemories.renderAll.bind(canvasForMemories),
				duration: 1500,
				easing: fabric.util.ease.easeOutBack,
				onComplete: function(){

					Img3.animate('opacity', 1, {
						from: 1,
						onChange: canvasForMemories.renderAll.bind(canvasForMemories),
						duration: 5000,
						easing: fabric.util.ease.easeInQuad,
						onComplete: function(){
							Img3.animate('left', natWidth+200, {
								from: natWidth - (gapOnRight + sidePicItemHeight),
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
});
fabric.Image.fromURL(picArray[a[3]], function(Img4) {
	Img4.scale(1.0).set({
		top:pic1Start+picSpace*3+sidePicItemHeight*3,
		left:imgLeft,
		height:sidePicItemHeight,
		width:sidePicItemHeight,
		clipTo: function (ctx) {
			roundedRect(ctx,-sidePicItemHeight/2,-sidePicItemHeight/2,sidePicItemHeight,sidePicItemHeight,15);
		}
	});
	canvasForMemories.add(Img4);

	Img4.animate('opacity', 1, {
		from: 1,
		onChange: canvasForMemories.renderAll.bind(canvasForMemories),
		duration: 600,
		easing: fabric.util.ease.easeInQuad,
		onComplete: function(){
			Img4.animate('left',natWidth-(gapOnRight + sidePicItemHeight) , {
				from: natWidth+200,
				onChange: canvasForMemories.renderAll.bind(canvasForMemories),
				duration: 1500,
				easing: fabric.util.ease.easeOutBack,
				onComplete: function(){

					Img4.animate('opacity', 1, {
						from: 1,
						onChange: canvasForMemories.renderAll.bind(canvasForMemories),
						duration: 5000,
						easing: fabric.util.ease.easeInQuad,
						onComplete: function(){
							Img4.animate('left', natWidth+200, {
								from: natWidth - (gapOnRight + sidePicItemHeight),
								onChange: canvasForMemories.renderAll.bind(canvasForMemories),
								duration: 500,
								easing: fabric.util.ease.easeInQuad,
								onComplete: function(){
									showSidePictures();
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

