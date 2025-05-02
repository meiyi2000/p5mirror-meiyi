// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com


class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 20);
    this.velocity = p5.Vector.random2D();
    //this.velocity.mult(random(2, 5));
    this.lifespan = 100.0;
    // this.icon = '💖';
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
    text(this.icon, this.position.x, this.position.y);
   
  noStroke();
  fill(random(100,255),random(100,255),random(100,255),80);
  rect(this.position.x, this.position.y, 40, 30);

     
  }

  // Is the particle still useful?
  isDead() {
    return this.lifespan < 0.0;
  }
  
}
