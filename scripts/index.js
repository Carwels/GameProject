//First thing we get our canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const card = document.getElementById("card");
const cardScore = document.getElementById("card-score");

//Sound effect
let jumpEffect = new Audio(
  "./sound/jump.wav"
);
let gameStartEffect = new Audio(
  "./sound/ambient.mp3"
);


//New obstacle time to appear
let defaultTime = 1 * 1000; 
let enemySpeed = 6;
//Check if score > 10
let score = 0;
let scoreIncrease = 0;
//No score more than one point at a time
let canScore = true; 

function startGame() {
  player = new Player(60, 350, 50, "MediumTurquoise");
  arrayBlocks = [];
  score = 0;
  enemySpeed = 6;
  defaultTime = 1 * 1000;
  gameStartEffect.play();
}

function restartGame(button) {
  card.style.display = "none";
  button.blur();
  startGame();
  requestAnimationFrame(animate);
}

//3***drawScore in the canvas
function drawScore() {
  ctx.font = "italic 50px sans-serif";
  ctx.fillStyle = "white";
  //Convert to string to draw in the canvas
  let scoreString = score.toString();
  //Position of score in the screen
  let xOffSet = (scoreString.length + 10) * 20;
  // x:280 - y:100
  ctx.fillText(scoreString, 250 - xOffSet, 50);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min - 1)) + min;
}
//Length of time in miliseconds & Math.random so return 50 / 50 chance to return higher/min length of time from timeInterval
function randomNumberInterval(timeInterval) {
  let returnTime = timeInterval;
  if (Math.random() < 0.4) {
    returnTime += randomNumber(defaultTime / 3, defaultTime * 2);
  } else {
    returnTime -= randomNumber(defaultTime / 5, defaultTime / 2);
  }
  return returnTime;
}

//Pause animation when collide
let animationId = null;
//Function to update canvas graphics
function animate() {
  animationId = requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Canvas
  drawBackgroundLine();
  //Score
  drawScore();


  player.draw();
  increaseSpeed();

  //loop throught arrayBlocks and render every block object
  arrayBlocks.forEach((arrayBlock, index) => {
    //need to target index in the array 
    arrayBlock.slide();
    //Finish game when player and block meet
    if (squaresColliding(player, arrayBlock)) {
      cardScore.textContent = score;
      card.style.display = "block";
      //Called if returns true and collision is made with arrayBlock
      cancelAnimationFrame(animationId);

      gameStartEffect.pause();
    }

    if (touchBlock(player, arrayBlock) && canScore) {
      canScore = false;
      score++;
    }
    //If rightside is <= 0 remove from the array
    if (arrayBlock.x + arrayBlock.size <= 0) {
      //Wait canvas until next frame before doing splice
      setTimeout(() => {
        //Just want to remove 1 object
        arrayBlocks.splice(index, 1);
      }, 0);
    }
  });
}

animate();

setTimeout(() => {
  generateBlocks();
}, randomNumberInterval(defaultTime));
