const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const getDistance = (x1, y1, x2, y2) => {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

const checkBoundary = (ball) => {
  let boundary = null;
  let x = ball.x;
  let y = ball.y;
  let radius = ball.radius;
  let xBoundary = canvas.width;
  let yBoundary = canvas.height;
  if ((x >= xBoundary - radius) || (x - radius <= 0)) {
    boundary = 'X-Limit';
  }
  if (y >= yBoundary - radius || y - radius <= 0) {
    boundary = 'Y-Limit';
  }
  return boundary;
}

const rotate = (ball, angle) => {
    const rotatedVelocities = {
        dx: ball.dx * Math.cos(angle) - ball.dy * Math.sin(angle),
        dy: ball.dx * Math.sin(angle) + ball.dy * Math.cos(angle)
    };
    return rotatedVelocities;
}

const resolveCollision = (particle, otherParticle) => {
    const xVelocityDiff = particle.dx - otherParticle.dx;
    const yVelocityDiff = particle.dy - otherParticle.dy;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle, angle);
        const u2 = rotate(otherParticle, angle);

        // Velocity after 1d collision equation
        const v1 = { dx: u1.dx * (m1 - m2) / (m1 + m2) + u2.dx * 2 * m2 / (m1 + m2), dy: u1.dy };
        const v2 = { dx: u2.dx * (m1 - m2) / (m1 + m2) + u1.dx * 2 * m2 / (m1 + m2), dy: u2.dy };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.dx = vFinal1.dx;
        particle.dy = vFinal1.dy;

        otherParticle.dx = vFinal2.dx;
        otherParticle.dy = vFinal2.dy;
    }
}

class Circle {
  constructor(x, y, radius) {
    this.mass = 1;
    this.x = x;
    this.y = y;
    this.dx = (Math.random() - 0.5) * 10;
    this.dy = (Math.random() - 0.5) * 10;
    this.radius = radius;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'purple';
    ctx.stroke();
  }
  updatePosition(allCircles) {
    for (let i = 0; i < allCircles.length; i += 1) {
      if (this === allCircles[i]) continue;
      if ((getDistance(this.x, this.y, allCircles[i].x, allCircles[i].y) - this.radius - allCircles[i].radius) < 0) {
        resolveCollision(this, allCircles[i]);
      }
    }
    const limit = checkBoundary(this);
    if (limit === 'X-Limit' && this.x < 50) {
      this.dx = Math.abs(this.dx);
    } else if (limit === 'X-Limit') {
      this.dx = -Math.abs(this.dx);
    }
    if (limit === 'Y-Limit' && this.y < 50) {
      this.dy = Math.abs(this.dy);
    } else if (limit === 'Y-Limit') {
      this.dy = -Math.abs(this.dy);
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
  updateRadius() {
    const limit = checkBoundary(this);
    if (this.radius <= 50 && !(limit === 'X-Limit' || limit === 'Y-Limit')) {
      this.radius += 1;
    }
    this.draw();
  }
}

let allCircles = [];
let growingCircle = [];
let holding = false;

const updateCircles = () => {
  requestAnimationFrame(updateCircles);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < allCircles.length; i += 1){
    allCircles[i].updatePosition(allCircles);
  }
  if (holding) {
    growingCircle[0].updateRadius();
  }
}

updateCircles();

canvas.addEventListener('mousedown', (clickEvent) => {
  holding = true;
  const radius = 1;
  const startX = clickEvent.offsetX;
  const startY = clickEvent.offsetY;
  growingCircle.push(new Circle(startX, startY, radius));
});

canvas.addEventListener('mouseup', (e) => {
  holding = false;
  allCircles.push(growingCircle[0]);
  growingCircle.pop();
});
