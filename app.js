const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const App = (() => {
  let isHolding = false;
  let balls = [];
  let currentBall = [];

  const startBall = (clickEvent) => {
    isHolding = true;
    const radius = 10;
    const startX = clickEvent.offsetX;
    const startY = clickEvent.offsetY;
    currentBall.push(new Ball(startX, startY, radius));
  }

  const finishBall = (unclickEvent) => {
    isHolding = false;
    balls.push(currentBall[0]);
    currentBall.pop();
    console.log(balls);
  }

  const setupEventListeners = () => {
    canvas.addEventListener('mousedown', e => startBall(e));
    canvas.addEventListener('mouseup', e => finishBall(e));
  }

  const updateCanvas = () => {
    requestAnimationFrame(updateCanvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach((ball) => {
      ball.move(balls);
    });
    if (isHolding) {
      currentBall[0].increaseSize();
    }
  }

  return {
    init() {
      setupEventListeners();
      updateCanvas();
    },
  };
})();

App.init();
