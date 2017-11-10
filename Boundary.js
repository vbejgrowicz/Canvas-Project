const Boundary = {
  checkX(ball) {
    return ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0;
  },
  checkY(ball) {
    return (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0);
  },
  checkBoundary(ball) {
    if (this.checkX(ball)) {
      ball.dx = -ball.dx
    }
    if (this.checkY(ball)) {
      ball.dy = -ball.dy
    }
  },
  checkLimits(ball) {
    if (ball.radius >= 50 || this.checkX(ball) || this.checkY(ball)) {
      return false;
    } else {
      return true;
    }
  },
}

export default Boundary;
