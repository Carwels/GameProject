//First we want to draw the line where the player will be placed, since my canvas is 600x600 we start the line at y:400
function drawBackgroundLine() {
    ctx.beginPath();
    ctx.moveTo(0, 400)
    ctx.lineTo(600, 400)
    ctx.lineWidth = 2
    ctx.strokeStyle = "black"
    ctx.fillStyle = "grey" //<- with fillstyle and fillRect we can paint the floor
    ctx.fillRect(0, 400, 600, 200);
    ctx.stroke()
}

/*drawBackgroundLine() I called it here since it was first step, to see if the background was printed, I comment it now because i'm calling it at the game animation part*/