import Collision from './Collision';

class CollidedBalls {
  constructor(ballOne, ballTwo) {
    this.ballOne = ballOne;
    this.ballTwo = ballTwo;
  }
  isCollided() {
    if (Collision.getDistance(this.ballOne, this.ballTwo) - this.ballOne.radius - this.ballTwo.radius < 0) {
      return true;
    }
    else {
      return false;
    }
  }
  getIds() {
    return [this.ballOne.id, this.ballTwo.id].sort();
  }
}

export default CollidedBalls;
