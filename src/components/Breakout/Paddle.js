export default (ctx, canvas, paddleProps) => {
  class Paddle {
    constructor(x) {
      this.x = x;
      this.y = canvas.height - paddleProps.height;
      this.height = paddleProps.height;
      this.width = paddleProps.width;
    }
    move() {
      ctx.beginPath();
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  let paddle = new Paddle(paddleProps.x);
  paddle.move();
  if (paddleProps.x <= 0) {
    paddleProps.x = 0;
  } else if (paddleProps.x + paddleProps.width  >= canvas.width) {
    paddleProps.x = canvas.width - paddleProps.width;
  }
};
