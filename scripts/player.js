class Player {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    //Jump configuration
    this.jumpHeight = 14; //<- frames/speed to jump
    this.shouldJump = false;
    this.jumpCounter = 0;
    //Spin animation
    this.spin = 0;
    //90 degree rotation completed in 32 frames
    this.spinRotate= 90 / 32;
  }
  //***6 STEP First rotation
  rotation() {
    //x & y center poiunt of player square
    let offsetXPosition = this.x + this.size / 2;
    let offsetYPosition = this.y + this.size / 2;

    ctx.translate(offsetXPosition, offsetYPosition);
   
    ctx.rotate((this.spin * Math.PI) / 180);
    //Convert to radians
    ctx.rotate((this.spinRotate * Math.PI) / 180);
    //Move back once iteration is completed
    ctx.translate(-offsetXPosition, -offsetYPosition);
    //Increase spin by values stored in spinRotate to update new rotation
    this.spin += this.spinRotate;
  }
  
  counterRotation() {
    let offsetXPosition = this.x + this.size / 2;
    let offsetYPosition = this.y + this.size / 2;
    ctx.translate(offsetXPosition, offsetYPosition);
    //Rotate it back from whatever value spin is
    ctx.rotate((-this.spin * Math.PI) / 180);
    ctx.translate(-offsetXPosition, -offsetYPosition);
  }

  jump() {
    //Jump animation have 32 frames, that way i can have the players first 14 frames for the jump + 14 frames to go down
    if (this.shouldJump) {
      //jump when set to true
      this.jumpCounter++;
      if (this.jumpCounter < 15) {
        //Jump up
        this.y -= this.jumpHeight;
      } else if (this.jumpCounter > 14 && this.jumpCounter < 19) {
        this.y += 0;
      } else if (this.jumpCounter < 33) {
        //Jump down
        this.y += this.jumpHeight;
      }
      this.rotation();
      //End the jumping
      if (this.jumpCounter >= 32) {
        this.counterRotation();
        this.spin = 0;
        //Set to false again when the frames are 32 >=
        this.shouldJump = false;
      }
    }
  }

  draw() {
    this.jump();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
    //counterRotation() called after fillRect so the rotation can be reset, and other elements are unchanged
    if (this.shouldJump) { this.counterRotation() }
  }
}
let player = new Player(150, 350, 50, "MediumTurquoise");

addEventListener("keydown", (event) => {
  if (event.code === "Space") { 
    //Can't press space again in midair
    if (!player.shouldJump) {
      jumpEffect.play();
      player.jumpCounter = 0;
      player.shouldJump = true;
      canScore = true;
    }
  }
});
