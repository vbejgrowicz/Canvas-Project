const algebra = require('algebra.js');
import CollidedBalls from './CollidedBalls';

const Collision = {
  roundtoTwoDec(num) {
    const str = num.toFixed(2);
    return parseFloat(str);
  },
  getDistance(ballOne, ballTwo){
    let xDistance = ballTwo.x - ballOne.x;
    // console.log(xDistance);
    let yDistance = ballTwo.y - ballOne.y;
    // console.log(yDistance);
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  },
  resolveCollision(ballOne, ballTwo) {
    const vx1i = ballOne.dx;
    const vx2i = ballTwo.dx;
    const vy1i = ballOne.dy;
    const vy2i = ballTwo.dy;
    // debugger;
    // console.log('One', ballOne.dx);
    // console.log('Two', ballTwo.dx);
    // Initial Velocitys = Final Velocitys
    //Elastic Collisions
    //v1i + v1f = v2i + v2f

    // X Direction
    const elasticEqX = algebra.parse(`${vx1i} + vx1f = ${vx2i} + vx2f`);
    const SolveForX1f = elasticEqX.solveFor("vx1f");
    // console.log(SolveForX1f.toString())

    //Momentum Equation
    //m1 * v1i + m2 * v2i = m1 * v1f + m2 * v2f
    const mx1i = ballOne.mass * ballOne.dx;
    const mx2i = ballTwo.mass * ballTwo.dx;
    const mxi = this.roundtoTwoDec(mx1i + mx2i);

    // console.log(`${mxi} = ${ballOne.mass} * ${SolveForX1f} + ${ballTwo.mass} * vx2f `)


    const momentumEqX = algebra.parse(`${mxi} = ${ballOne.mass} * ${SolveForX1f} + ${ballTwo.mass} * vx2f `);
    const SolveForX2f = momentumEqX.solveFor("vx2f");
    // console.log(SolveForX2f.toString())
    const vx2f = this.roundtoTwoDec(SolveForX2f.numer / SolveForX2f.denom);

    //Plug vx2f back into first Equation
    const vx2 = this.roundtoTwoDec(vx2i + vx2f);
    const elasticEqX1 = algebra.parse(`${vx1i} + vx1f = ${vx2}`);
    const ResultX1f = elasticEqX1.solveFor("vx1f");
    const vx1f = this.roundtoTwoDec(ResultX1f.numer / ResultX1f.denom);

    // Y Direction
    const elasticEqY = algebra.parse(`${vy1i} + vy1f = ${vy2i} + vy2f`);
    const SolveForY1f = elasticEqY.solveFor("vy1f");

    //Momentum Equation
    //m1 * v1i + m2 * v2i = m1 * v1f + m2 * v2f
    const my1i = ballOne.mass * ballOne.dy;
    const my2i = ballTwo.mass * ballTwo.dy;
    const myi = this.roundtoTwoDec(my1i + my2i);

    const momentumEqY = algebra.parse(`${myi} = ${ballOne.mass} * ${SolveForY1f} + ${ballTwo.mass} * vy2f `);
    const SolveForY2f = momentumEqY.solveFor("vy2f");
    const vy2f = this.roundtoTwoDec(SolveForY2f.numer / SolveForY2f.denom);

    //Plug vx2f back into first Equation
    const vy2 = this.roundtoTwoDec(vy2i + vy2f);
    const elasticEqY1 = algebra.parse(`${vy1i} + vy1f = ${vy2}`);
    const ResultY1f = elasticEqY1.solveFor("vy1f");
    const vy1f = this.roundtoTwoDec(ResultY1f.numer / ResultY1f.denom);
    // console.log(ballOne.dx, ballOne.dy)
    // console.log(ballTwo.dx, ballTwo.dy)
    
    ballOne.dx = Math.abs(vx1f) > 10 ? ((vx1f / Math.abs(vx1f)) * 10) : vx1f;
    ballOne.dy = Math.abs(vy1f) > 10 ? ((vy1f / Math.abs(vy1f)) * 10) : vy1f;
    ballTwo.dx = Math.abs(vx2f) > 10 ? ((vx2f / Math.abs(vx2f)) * 10) : vx2f;
    ballTwo.dy = Math.abs(vy2f) > 10 ? ((vy2f / Math.abs(vy2f)) * 10) : vy2f;

    // console.log(ballOne.dx, ballOne.dy, ballTwo.dx, ballTwo.dy)
    console.log(ballOne.dx);
    console.log(ballOne.dy);
    console.log(ballTwo.dx);
    console.log(ballTwo.dy);
    // console.log(vx1f, vx2f, vy1f, vy2f);
    // console.log(ballOne.dx, ballOne.dy)
    // console.log(ballTwo.dx, ballTwo.dy)
  },
  checkCollision(ballOne, ballTwo, currentCollisions) {
      if ((this.getDistance(ballOne, ballTwo) - ballOne.radius - ballTwo.radius) < 0) {
        currentCollisions.push(new CollidedBalls(ballOne, ballTwo));
        this.resolveCollision(ballOne, ballTwo);
      }
  }
}

export default Collision;
