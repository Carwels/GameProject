//2*** second thing is to create the player to appear in the canvas
class Player {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    //Jump configuration
    this.jumpHeight = 12; //<- frames to go up while jumping
    this.shouldJump = false;
    this.jumpCounter = 0;
  }

  jump() {
    if (this.shouldJump) {
      this.jumpCounter++;
      if (this.jumpCounter < 15) {
        //Go up jump
        this.y -= this.jumpHeight;
      } else if (this.jumpCounter > 14 && this.jumpCounter < 19) {
        this.y += 0;
      } else if (this.jumpCounter < 33) {
        //Come back down from jump
        this.y += this.jumpHeight;
      }
      //End the jumping
      if (this.jumpCounter >= 32) {
        this.shouldJump = false;
      }
    }
  }

  // The draw method is so that it will get the player class to render to the canvas
  draw() {
    this.jump(); // jump() needs to be called before the player is drawn to the canvas, that way the jump can be seen
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

let player = new Player(150, 350, 50, "black");

addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (!player.shouldJump) {
      // This will prevent the user from double jumping while still in mid air
      player.jumpCounter = 0;
      player.shouldJump = true;
    }
  }
});
