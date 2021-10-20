export default function WallCollision(
  ballObj,
  canvas,
  paddleProps,
  playing,
) {
  if (ballObj.y + ballObj.rad > canvas.height) {
    playing = false;
  }
  if (ballObj.y - ballObj.rad < 0) {
    ballObj.dy *= -1;
  }

  if (ballObj.x + ballObj.rad >= canvas.width || ballObj.x - ballObj.rad <= 0) {
    ballObj.dx *= -1;
  }
  return playing;
}
