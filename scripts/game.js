//First thing we get our canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

//3***drawScore in the canvas
function drawScore() {
  ctx.font = "50px sans-serif";
  ctx.fillStyle = "black";
  let scoreString = score.toString(); //<- First convert score into a string
  let xOffSet = (scoreString.length - 1) * 20; // To position score in the middle of the screen
  ctx.fillText(scoreString, 280 - xOffSet, 100); // x:280 - y:100
}


function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Canvas
  drawBackgroundLine();
  //Score
  drawScore();

  player.draw();
}


animate();
