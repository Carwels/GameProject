function drawBackgroundLine() {
  ctx.beginPath();
  ctx.moveTo(0, 400);
  ctx.lineTo(600, 400);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "black";
  //Floor paint
  ctx.fillStyle = "rgba(28, 21, 25, 0.79)";
  ctx.fillRect(0, 400, 600, 200);
  ctx.stroke();
}
