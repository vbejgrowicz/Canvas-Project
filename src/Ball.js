import Materials from './Materials';
import Boundary from './Boundary';
import Collision from './Collision';

class Ball {
  constructor(id, type, x, y, radius) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type;
    this.radius = radius;
    this.density = Materials[type].density
    this.mass;
    this.volume;
    this.color = Materials[type].color;
    this.dx = Math.floor(Math.random() * 5) + 3;
    this.dy = Math.floor(Math.random() * 5) + 3;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  move(ctx,balls, currentCollisions) {
    Boundary.checkBoundary(this);
    // console.log(currentCollisions);
    for (let i = 0; i < balls.length; i += 1) {
      if (this === balls[i]) continue;
      const currentIds = [this.id, balls[i].id].sort();
      const ballsAreCollided = !!currentCollisions.map((collisionObj) => {
        // console.log(collisionObj.getIds())
        return collisionObj.getIds();
      }).find(arr => arr.includes(this.id) && arr.includes(balls[i].id));
      // console.log(ballsAreCollided);
      if (ballsAreCollided) {
        continue;
      } else {
        Collision.checkCollision(this, balls[i], currentCollisions);
      }
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
    const massCalc = this.volume * this.density;
    const str = massCalc.toFixed(2);
    this.mass = parseFloat(str);
  }
  calcVolume() {
    // this.radius(m), calcRadius(cm)
    const calcRadius = this.radius / 100;
    const volumeCalc = 4/3 * Math.PI * Math.pow(calcRadius, 3);
    const str = volumeCalc.toFixed(2);
    this.volume = parseFloat(str);
  }
}

export default Ball;
