const Collision = {
  getDistance(ballOne, ballTwo){
    let xDistance = ballTwo.x - ballOne.x;
    let yDistance = ballTwo.y - ballOne.y;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  },
  rotate(ball, angle) {
      const rotatedVelocities = {
          dx: ball.dx * Math.cos(angle) - ball.dy * Math.sin(angle),
          dy: ball.dx * Math.sin(angle) + ball.dy * Math.cos(angle)
      };
      return rotatedVelocities;
  },
  resolveCollision(ballOne, ballTwo) {
      const xVelocityDiff = ballOne.dx - ballTwo.dx;
      const yVelocityDiff = ballOne.dy - ballTwo.dy;

      const xDist = ballTwo.x - ballOne.x;
      const yDist = ballTwo.y - ballOne.y;

      // Prevent accidental overlap of balls
      if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

          // Grab angle between the two colliding balls
          const angle = -Math.atan2(ballTwo.y - ballOne.y, ballTwo.x - ballOne.x);

          // Store mass in var for better readability in collision equation
          const m1 = ballOne.mass;
          const m2 = ballTwo.mass;

          // Velocity before equation
          const u1 = this.rotate(ballOne, angle);
          const u2 = this.rotate(ballTwo, angle);

          // Velocity after 1d collision equation
          const v1 = { dx: u1.dx * (m1 - m2) / (m1 + m2) + u2.dx * 2 * m2 / (m1 + m2), dy: u1.dy };
          const v2 = { dx: u2.dx * (m1 - m2) / (m1 + m2) + u1.dx * 2 * m2 / (m1 + m2), dy: u2.dy };

          // Final velocity after rotating axis back to original location
          const vFinal1 = this.rotate(v1, -angle);
          const vFinal2 = this.rotate(v2, -angle);

          // Swap ball velocities for realistic bounce effect
          ballOne.dx = vFinal1.dx;
          ballOne.dy = vFinal1.dy;

          ballTwo.dx = vFinal2.dx;
          ballTwo.dy = vFinal2.dy;
      }
  },
  checkCollision(ballOne, ballTwo) {
      if ((this.getDistance(ballOne, ballTwo) - ballOne.radius - ballTwo.radius) < 0) {
        this.resolveCollision(ballOne, ballTwo);
      }
  }
}
