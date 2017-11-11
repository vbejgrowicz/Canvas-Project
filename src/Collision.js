const algebra = require('algebra.js');
import CollidedBalls from './CollidedBalls';

const Collision = {
  roundtoTwoDec(num) {
    const str = num.toFixed(2);
    return parseFloat(str);
  },
  getDistance(ballOne, ballTwo){
    let xDistance = ballTwo.x - ballOne.x;
    let yDistance = ballTwo.y - ballOne.y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  },
  resolveCollision(ballOne, ballTwo) {
    const vx1i = ballOne.dx;
    const vx2i = ballTwo.dx;
    const vy1i = ballOne.dy;
    const vy2i = ballTwo.dy;

    // Initial Velocitys = Final Velocitys
    //Elastic Collisions
    //v1i + v1f = v2i + v2f

    // X Direction
    const elasticEqSolvedforX1f = (`${vx2i} + vx2f - ${vx1i}`);

    //Momentum Equation
    //m1 * v1i + m2 * v2i = m1 * v1f + m2 * v2f
    const mx1i = ballOne.mass * ballOne.dx;
    const mx2i = ballTwo.mass * ballTwo.dx;
    const mxi = mx1i + mx2i;

    const momentumEqX = algebra.parse(`${mxi} = ${ballOne.mass} * (${vx2i} + vx2f - ${vx1i}) + ${ballTwo.mass} * vx2f`);
    const vx2fAns = momentumEqX.solveFor("vx2f");

    let vx2f = this.roundtoTwoDec(vx2fAns.numer / vx2fAns.denom);

    //Plug vx2f back into first Equation
    let vx1f = this.roundtoTwoDec(vx2i + vx2f - vx1i);

    // Y Direction
    const elasticEqSolvedforY1f = (`${vy2i} + vy2f - ${vy1i}`);

    //Momentum Equation
    //m1 * v1i + m2 * v2i = m1 * v1f + m2 * v2f
    const my1i = ballOne.mass * ballOne.dy;
    const my2i = ballTwo.mass * ballTwo.dy;
    const myi = my1i + my2i;

    const momentumEqY = algebra.parse(`${myi} = ${ballOne.mass} * (${vy2i} + vy2f - ${vy1i}) + ${ballTwo.mass} * vy2f`);
    const vy2fAns = momentumEqY.solveFor("vy2f");

    let vy2f = this.roundtoTwoDec(vy2fAns.numer / vy2fAns.denom);

    //Plug vx2f back into first Equation
    ballOne.dx = Math.abs(vx1f) > 10 ? ((vx1f / Math.abs(vx1f)) * 10) : vx1f;
    ballOne.dy = Math.abs(vy1f) > 10 ? ((vy1f / Math.abs(vy1f)) * 10) : vy1f;
    ballTwo.dx = Math.abs(vx2f) > 10 ? ((vx2f / Math.abs(vx2f)) * 10) : vx2f;
    ballTwo.dy = Math.abs(vy2f) > 10 ? ((vy2f / Math.abs(vy2f)) * 10) : vy2f;
    let vy1f = this.roundtoTwoDec(vy2i + vy2f - vy1i);

    //check for same direction
    if ((vx1f < 0 && vx2f < 0) || (vx1f > 0 && vx2f > 0) ) {
      if (ballOne.mass > ballTwo.mass) {
        vx1f = -vx1f;
      } else {
        vx2f = -vx2f;
      }
    }
    if ((vy1f < 0 && vy2f < 0) || (vy1f > 0 && vy2f > 0) ) {
      if (ballOne.mass > ballTwo.mass) {
        vy1f = -vy1f;
      } else {
        vy2f = -vy2f;
      }
    }
  },
  checkCollision(ballOne, ballTwo, currentCollisions) {
      if ((this.getDistance(ballOne, ballTwo) - ballOne.radius - ballTwo.radius) < 0) {
        currentCollisions.push(new CollidedBalls(ballOne, ballTwo));
        this.resolveCollision(ballOne, ballTwo);
      }
  }
}

export default Collision;
