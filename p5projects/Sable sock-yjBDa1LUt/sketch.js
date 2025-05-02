let my = {};
let vmouseX = 0.0;
let vmouseY = 0.0;

// let video;
// let handpose;
let predictions = [];
let particles = [];

// function bump(x, h, w) {
//   return (h / w) * (sqrt(x ** 4 + w * w) - x * x);
// }

function setup() {
  my.width = windowWidth;
  my.height = windowHeight;
  // my.changeTime = 5.0;

  my.xpos = random(my.width);
  my.ypos = random(my.height);
  my.xspeed = 2;
  my.yspeed = 2;
  // my.startTime = millis() / 1000.0;

  createCanvas(my.width, my.height);
  // colorMode(HSB, 255);
  noStroke();
  // setup_fullScreenButton();

//   video = createCapture(VIDEO);
//   video.size(160, 120);
//   video.hide();

  // handpose = ml5.handpose(video, () => {
  //   console.log("🤖 Handpose model ready!");
  // });
  // handpose.on("predict", (results) => {
  //   predictions = results;
  // });

  background(0);
}

function draw() {
  fill(0, 0, 0, 20);
  rect(0, 0, width, height);

  const stiffness = 0.95;
  // let finger = getIndexFingerTip();
  // let fx = width / 2;
  // let fy = height / 2;

  // if (finger) {
    // fx = map(finger[0], 0, video.width, 0, width);
    // fy = map(finger[1], 0, video.height, 0, height);
    // vmouseX = (fx - width / 2) * (1 - stiffness) + vmouseX * stiffness;
    // vmouseY = (fy - height / 2) * (1 - stiffness) + vmouseY * stiffness;

    fill(255); // debug dot on finger
    circle(my.xpos, my.ypos, 10);
  // }

  // 💥 Always spawn visible particles for testing
  for (let i = 0; i < 4; i++) {
    particles.push(new Particle(my.xpos, my.ypos));
  }

  // Webcam grid distortion
//   video.loadPixels();
//   const stepSize = 10;
//   const baseSize = 10;
//   const touchRad = 100;
//   const touchStrength = 10;

//   for (let l = 1.0; l > 0.0; l -= 0.3) {
//     let s = baseSize + l * 8;
//     for (let x = 0; x < width; x += stepSize) {
//       for (let y = 0; y < height; y += stepSize) {
//         let camX = floor(map(x, 0, width, 0, video.width));
//         let camY = floor(map(y, 0, height, 0, video.height));
//         let index = (camX + camY * video.width) * 4;

//         let r = video.pixels[index];
//         let g = video.pixels[index + 1];
//         let b = video.pixels[index + 2];

//         let h = (r - g + b) % 255;
//         fill((h + l * 100) % 200, 200, 200, 60 + l * 80);

//         let d = dist(width / 2 + vmouseX, height / 2 + vmouseY, x, y);
        // let bval = bump(d, touchStrength, touchRad * touchRad * (1 - l) + 1);

        // circle(x + vmouseX * bval, y + vmouseY * bval, s);

  

  // Bouncing white cross
  stroke(255);
  line(0, my.ypos, width, my.ypos);
  line(my.xpos, 0, my.xpos, height);
  noStroke();
  fill(255,0,0);
  ellipse(my.xpos,my.ypos,10);
  noStroke();

  my.ypos += my.yspeed;
  //if the point bounce back when touched edges 
  if (my.ypos > height || my.ypos < 0) my.yspeed *= -1;
  my.xpos += my.xspeed;
  if (my.xpos > width || my.xpos < 0) my.xspeed *= -1;

  // Draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

// function getIndexFingerTip() {
//   if (predictions.length > 0) {
//     let hand = predictions[0];
//     if (hand.annotations && hand.annotations.indexFinger) {
//       return hand.annotations.indexFinger[3];
//     }
//   }
//   return null;
// }

class Particle {
  constructor(x, y) {
    this.pos = createVector(x + random(-10, 10), y + random(-10, 10));
    this.vel = p5.Vector.random2D().mult(random(1, 3));
    this.acc = createVector(0, 0.01);
    this.lifespan = 255;
    this.hue = random(160, 250);
    this.size = random(8, 20); // larger for visibility
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.lifespan -= 3;
  }

  show() {
    fill(this.hue, 120, 255, this.lifespan);
    circle(this.pos.x, this.pos.y, this.size);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

// function new_pos() {
//   my.xpos = random(0, width);
//   my.ypos = random(0, height);
// }

// function check_time() {
//   let now = millis() / 1000;
//   if (now - my.startTime > my.changeTime) {
//     my.startTime = now;
//     new_pos();
//   }
// }

// function setup_fullScreenButton() {
//   my.fullScreenButton = createButton("Full Screen");
//   my.fullScreenButton.mousePressed(fullScreen_action);
//   my.fullScreenButton.style("font-size:24px; position:absolute; top:20px; left:20px;");
// }

// function fullScreen_action() {
//   my.fullScreenButton.remove();
//   fullscreen(true);
//   setTimeout(() => {
//     resizeCanvas(windowWidth, windowHeight);
//   }, 1000);
// }

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
