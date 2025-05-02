// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


// A simple Particle class

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = p5.Vector.random2D();
    //this.velocity.mult(random(2, 5));
    this.lifespan = 255.0;
    this.icon = "🖤";
  }

  run() {
    // let gravity = createVector(0, 0.05);
    // this.applyForce(gravity);
    this.update();
    this.show();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 8;
    this.acceleration.mult(0);
  }

  // Method to display
  show() {
    textSize(12);
    textAlign(CENTER);
    noStroke();
    fill(255, this.lifespan);
    ellipse(this.position.x, this.position.y, 8, 8);
    // text(this.icon, this.position.x, this.position.y);
  }

  // Is the particle still useful?
  isDead() {
    return this.lifespan < 0.0;
  }
}
