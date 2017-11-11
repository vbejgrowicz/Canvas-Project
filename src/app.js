import '../style/style.css';
import Ball from './Ball';
import Materials from './Materials'

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const typeInput = document.getElementById('Material-Selector');

const App = (() => {
  let id = 0;
  let isHolding = false;
  let balls = [];
  let currentBall = [];
  let currentCollisions = [];
  let typeList = Object.keys(Materials);

  const startBall = (clickEvent) => {
    isHolding = true;
    const radius = 10;
    const startX = clickEvent.offsetX;
    const startY = clickEvent.offsetY;
    const selected = typeInput.options.selectedIndex;
    currentBall.push(new Ball(id, typeList[selected], startX, startY, radius));
  }

  const finishBall = (unclickEvent) => {
    isHolding = false;
    id += 1;
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
    currentCollisions = currentCollisions.filter(collided => (collided.isCollided()));
    // if (currentCollisions.length >= 1 ){
    //   debugger;
    // };
    balls.forEach((ball) => {
      ball.move(ctx, balls, currentCollisions);
    });
    if (isHolding) {
      currentBall[0].increaseSize(ctx);
    }
  }
  const setMaterialList = () => {
    typeList.forEach((material) => {
      const option = document.createElement("option");
      option.text = material;
      typeInput.add(option);
    });
  }
  return {
    init() {
      setupEventListeners();
      updateCanvas();
      setMaterialList();
    },
  };
})();

App.init();
