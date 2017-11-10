import Materials from './Materials';
import Boundary from './Boundary';
import Collision from './Collision';

class Ball {
  constructor(type, x, y, radius) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.radius = radius;
    this.density = Materials[type].density
    this.mass;
    this.volume;
    this.color = Materials[type].color;
    this.dx = Math.floor(Math.random() * 10);
    this.dy = Math.floor(Math.random() * 10);
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
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
    this.calcMass();
    this.calcVolume();
    this.draw(ctx);
  }
  calcMass() {
    // mass(g) = cm3 * g/cm3
    this.mass = Math.round(this.volume * this.density);
  }
  calcVolume() {
    // this.radius(m), calcRadius(cm)
    const calcRadius = this.radius / 100;
    this.volume = Math.round(4/3 * Math.PI * Math.pow(calcRadius, 3));
  }
}

export default Ball;
