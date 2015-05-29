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

// Function for wrapping text
function wrapCanvasText(t, canvas, maxW, maxH, justify) {

    if (typeof maxH === "undefined") {
        maxH = 0;
    }
    var words = t.text.split(" ");
    var formatted = '';

    // This works only with monospace fonts
    justify = justify || 'left';

    // clear newlines
    var sansBreaks = t.text.replace(/(\r\n|\n|\r)/gm, "");
    // calc line height
    var lineHeight = new fabric.Text(sansBreaks, {
        fontFamily: t.fontFamily,
        fontSize: t.fontSize
    }).height;

    // adjust for vertical offset
    var maxHAdjusted = maxH > 0 ? maxH - lineHeight : 0;
    var context = canvas.getContext("2d");


    context.font = t.fontSize + "px " + t.fontFamily;
    var currentLine = '';
    var breakLineCount = 0;

    n = 0;
    while (n < words.length) {
        var isNewLine = currentLine == "";
        var testOverlap = currentLine + ' ' + words[n];

        // are we over width?
        var w = context.measureText(testOverlap).width;

        if (w < maxW) { // if not, keep adding words
            if (currentLine != '') currentLine += ' ';
            currentLine += words[n];
            // formatted += words[n] + ' ';
        } else {

            // if this hits, we got a word that need to be hypenated
            if (isNewLine) {
                var wordOverlap = "";

                // test word length until its over maxW
                for (var i = 0; i < words[n].length; ++i) {

                    wordOverlap += words[n].charAt(i);
                    var withHypeh = wordOverlap + "-";

                    if (context.measureText(withHypeh).width >= maxW) {
                        // add hyphen when splitting a word
                        withHypeh = wordOverlap.substr(0, wordOverlap.length - 2) + "-";
                        // update current word with remainder
                        words[n] = words[n].substr(wordOverlap.length - 1, words[n].length);
                        formatted += withHypeh; // add hypenated word
                        break;
                    }
                }
            }
            while (justify == 'right' && context.measureText(' ' + currentLine).width < maxW)
            currentLine = ' ' + currentLine;

            while (justify == 'center' && context.measureText(' ' + currentLine + ' ').width < maxW)
            currentLine = ' ' + currentLine + ' ';

            formatted += currentLine + '\n';
            breakLineCount++;
            currentLine = "";

            continue; // restart cycle
        }
        if (maxHAdjusted > 0 && (breakLineCount * lineHeight) > maxHAdjusted) {
            // add ... at the end indicating text was cutoff
            formatted = formatted.substr(0, formatted.length - 3) + "...\n";
            currentLine = "";
            break;
        }
        n++;
    }

    if (currentLine != '') {
        while (justify == 'right' && context.measureText(' ' + currentLine).width < maxW)
        currentLine = ' ' + currentLine;

        while (justify == 'center' && context.measureText(' ' + currentLine + ' ').width < maxW)
        currentLine = ' ' + currentLine + ' ';

        formatted += currentLine + '\n';
        breakLineCount++;
        currentLine = "";
    }

    // get rid of empy newline at the end
    formatted = formatted.substr(0, formatted.length - 1);

    var ret = new fabric.Text(formatted, { // return new text-wrapped text obj
        left: t.left,
        top: t.top,
        fill: t.fill,
        fontFamily: t.fontFamily,
        fontSize: t.fontSize,
        originX: t.originX,
        originY: t.originY,
        angle: t.angle,
    });
    return ret;
}





// Diagonal animation with opacity
function cross_anime (name,x1,x2,y1,y2,t) {
  // body...

name.animate('left', x2, {
  from:x1,
  duration:t,
  onChange: canvasForMemories.renderAll.bind(canvasForMemories),
easing: fabric.util.ease.easeOutCirc,

});

     name.animate('opacity', 1, {
  from:0,
  onChange: canvasForMemories.renderAll.bind(canvasForMemories),
  duration: t,
easing: fabric.util.ease.easeOutCirc,
  });


name.animate('top', y2, {
  from:y1,
  duration:t,
  onChange: canvasForMemories.renderAll.bind(canvasForMemories),
  easing: fabric.util.ease.easeOutCirc,
});
}








