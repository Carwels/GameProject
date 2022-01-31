//2*** second thing is to create the player to appear in the canvas
class Player {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    //Jump configuration
    this.jumpHeight = 12; //<- frames/speed to jump
    this.shouldJump = false;
    this.jumpCounter = 0;
    //Spin animation
    this.spin = 0; //<- stores the current rotation of the player, since is not rotated by default, i need to set it to 0
    //Get a perfect 90 degree rotation
    this.spinIncrement = 90 / 32;
  }
  //First rotation
  rotation() {
    let offsetXPosition = this.x + this.size / 2;
    let offsetYPosition = this.y + this.size / 2;
    //The translate() method adds a translation transformation to the current matrix by moving the canvas and its origin x units horizontally and y units vertically on the grid
    ctx.translate(offsetXPosition, offsetYPosition);
    //The CanvasRenderingContext2D.rotate() method of the Canvas 2D API adds a rotation to the transformation matrix.
    ctx.rotate((this.spin * Math.PI) / 180);
    ctx.rotate((this.spinIncrement * Math.PI) / 180);
    ctx.translate(-offsetXPosition, -offsetYPosition); //<- we move it back once iteration is completed
    this.spin += this.spinIncrement;
  }
  //Counter rotation
  counterRotation() {
    let offsetXPosition = this.x + this.size / 2;
    let offsetYPosition = this.y + this.size / 2;
    ctx.translate(offsetXPosition, offsetYPosition);
    ctx.rotate((-this.spin * Math.PI) / 180);
    ctx.translate(-offsetXPosition, -offsetYPosition);
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
      this.rotation();
      //End the jumping
      if (this.jumpCounter >= 32) {
        this.counterRotation();
        this.spin = 0;
        this.shouldJump = false;
      }
    }
  }

  // The draw method is so that it will get the player class to render to the canvas
  draw() {
    this.jump(); // jump() needs to be called before the player is drawn to the canvas, that way the jump can be seen
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);

    if (this.shouldJump) {
      this.counterRotation();
    }
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
