const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Circle {
  constructor(x, y, radius) {
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
  updatePosition() {
    if (this.x > canvas.width - this.radius || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y > canvas.height - this.radius || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
  updateRadius() {
  this.radius +=1;
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
    allCircles[i].updatePosition();
  }
  if (holding) {
    growingCircle[0].updateRadius();
  }
}

updateCircles();

canvas.addEventListener('mousedown', (clickEvent) => {
  holding = true;
  const startX = clickEvent.x;
  const startY = clickEvent.y;
  const radius = 1;
  growingCircle.push(new Circle(startX, startY, radius));
});

canvas.addEventListener('mouseup', (e) => {
  holding = false;
  allCircles.push(growingCircle[0]);
  growingCircle.pop();
});
