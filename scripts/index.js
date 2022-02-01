//First thing we get our canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const card = document.getElementById("card");
const cardScore = document.getElementById("card-score");
//Sound effect
let jumpEffect = new Audio(
  "/sound/mixkit-player-jumping-in-a-video-game-2043.wav"
);
let gameStartEffect = new Audio(
  "/sound/SLOWER-TEMPO2019-12-11_-_Retro_Platforming_-_David_Fesliyan.mp3"
);

let score = 0;
//New obstacle time to appear
let presetTime = 1 * 1000; 
let enemySpeed = 5;
//Check if score > 10
let scoreIncrement = 0;
//No score more than one point at a time
let canScore = true; 

function startGame() {
  player = new Player(150, 350, 50, "MediumTurquoise");
  arrayBlocks = [];
  score = 0;
  enemySpeed = 5;
  presetTime = 1000;
}

function restartGame(button) {
  card.style.display = "none";
  button.blur();
  startGame();
  requestAnimationFrame(animate);
}

//3***drawScore in the canvas
function drawScore() {
  ctx.font = "50px sans-serif";
  ctx.fillStyle = "black";
  //Convert to string to draw in the canvas
  let scoreString = score.toString();
  //Position of score in the screen
  let xOffSet = (scoreString.length - 1) * 20;
  // x:280 - y:100
  ctx.fillText(scoreString, 280 - xOffSet, 100);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min - 1)) + min;
}

function randomNumberInterval(timeInterval) {
  let returnTime = timeInterval;
  if (Math.random() < 0.5) {
    returnTime += getRandomNumber(presetTime / 3, presetTime * 2);
  } else {
    returnTime -= getRandomNumber(presetTime / 5, presetTime / 2);
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
  gameStartEffect.play();

  player.draw();
  shouldIncreaseSpeed();

  //loop throught arrayBlocks and render every block object
  arrayBlocks.forEach((arrayBlock, index) => {
    //need to target index in the array
    arrayBlock.slide();
    //Finish game when player and block meet
    if (squaresColliding(player, arrayBlock)) {
      cardScore.textContent = score;
      card.style.display = "block";
      
      cancelAnimationFrame(animationId);

      gameStartEffect.pause();
    }

    if (touchBlock(player, arrayBlock) && canScore) {
      canScore = false;
      score++;
    }
    //If rightside is <= 0 remove from the array
    if (arrayBlock.x + arrayBlock.size <= 0) {
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
}, randomNumberInterval(presetTime));
