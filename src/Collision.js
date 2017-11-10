const Collision = {
  getDistance(ballOne, ballTwo){
    let xDistance = ballTwo.x - ballOne.x;
    let yDistance = ballTwo.y - ballOne.y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  },
  resolveCollision(ballOne, ballTwo) {

  },
  checkCollision(ballOne, ballTwo) {
      if ((this.getDistance(ballOne, ballTwo) - ballOne.radius - ballTwo.radius) < 0) {
        this.resolveCollision(ballOne, ballTwo);
      }
  }
}

export default Collision;
