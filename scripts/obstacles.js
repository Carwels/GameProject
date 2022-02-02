class Obstacle {
  constructor(size, speed) {
    this.x = canvas.width + size; //canvas edge
    this.y = 355 - size;
    this.size = size;
    ctx.beginPath();
    this.color = "Gainsboro";
    this.slideSpeed = speed;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  slide() {
    this.draw();
    ctx.beginPath();
    //decrease x offset of the obstacle, so it moves to the left of the screen
    this.x -= this.slideSpeed;
  }
}

let arrayBlocks = [];

//Push new obstacle to the array
function generateBlocks() {
  let timeDelay = randomNumberInterval(defaultTime);
  arrayBlocks.push(new Obstacle(50, enemySpeed));
  //invoke again after defaultTime
  setTimeout(generateBlocks, timeDelay);
}

//If player and block collide return true
function squaresColliding(player, block) {
  //Create exact copy of class object passed into the function
  let side1 = Object.assign(
    Object.create(Object.getPrototypeOf(player)),
    player
  );
  let side2 = Object.assign(
    Object.create(Object.getPrototypeOf(block)),
   block);
  //Pixel check collision
  side2.size = side2.size - 10;
  side2.x = side2.x + 10;
  side2.y = side2.y + 10;
  //Boolean if collision has been made
  return !(
    //Side1 to the right of side2
    (
      side1.x > side2.x + side2.size ||
      //Side1 to the left of side2
      side1.x + side1.size < side2.x ||
      //Side1 below side2
      side1.y > side2.y + side2.size ||
      //Side1 above side2
      side1.y + side1.size < side2.y
    )
  );
}

function touchBlock(player, block) {
  return (
    player.x + player.size / 2 > block.x + block.size / 4 &&
    player.x + player.size / 2 < block.x + (block.size / 4) * 3
  );
}

//scoreIncrease checks when the player gets 10 >= points
function increaseSpeed() {
  if (scoreIncrease + 10 === score) {
    scoreIncrease = score;
    enemySpeed++;
    defaultTime >= 100 ? (defaultTime -= 100) : (defaultTime = defaultTime);
    //now need to update the speed of the blocks in the canvas
    arrayBlocks.forEach((block) => {
      block.slideSpeed = enemySpeed;
    });
  }
}
