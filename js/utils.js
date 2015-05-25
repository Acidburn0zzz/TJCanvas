console.log("utils.js loaded");

function getScreenSizes(){
	var wh = $(window).height();   // returns height of browser viewport
	var dh = $(document).height(); // returns height of HTML document
	var ww = $(window).width();   // returns width of browser viewport
	var dw = $(document).width();
	console.log("window" , ww, "and" , wh, "document" , dw, "and" , dh);

	var body = document.body,
     html = document.documentElement;

	var height = Math.max( body.scrollHeight, body.offsetHeight, 
	                       html.clientHeight, html.scrollHeight, html.offsetHeight );
	console.log(height);
}