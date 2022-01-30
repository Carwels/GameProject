//First thing we get our canvas
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

function animation() {
    requestAnimationFrame(animation)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //canvas
    drawBackgroundLine()

    player.draw()
}

animation()

