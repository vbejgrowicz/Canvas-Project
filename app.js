const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    // this.dx = (Math.random() - 0.5) * 10;
    // this.dy = (Math.random() - 0.5) * 10;
    this.radius = radius;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = 'purple';
    ctx.stroke();
  }
}

let allCircles = [];

const createCircle = () => {
  requestAnimationFrame(createCircle);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < allCircles.length; i += 1){
    allCircles[i].draw();
  }
}

createCircle();

canvas.addEventListener('mousedown', (clickEvent) => {
  const startX = clickEvent.x;
  const startY = clickEvent.y;
  const radius = 20;
  allCircles.push(new Circle(startX, startY, radius));
});
