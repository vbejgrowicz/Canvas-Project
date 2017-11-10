import Materials from './Materials';
import Boundary from './Boundary';
import Collision from './Collision';

class Ball {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.mass = 1;
    this.dx = (Math.random() - 0.5) * 10;
    this.dy = (Math.random() - 0.5) * 10;
    this.radius = radius;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'purple';
    ctx.stroke();
  }
  move(ctx,balls) {
    Boundary.checkBoundary(this);
    for (let i = 0; i < balls.length; i += 1) {
      if (this === balls[i]) continue;
      Collision.checkCollision(this, balls[i]);
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw(ctx);
  }
  increaseSize(ctx) {
    if (Boundary.checkLimits(this)) {
      this.radius += 1;
    }
    this.draw(ctx);
  }
}

export default Ball;
