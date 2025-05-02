// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose
// https://editor.p5js.org/codingtrain/sketches/o5wnL6esQ

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
// Hand Pose Particle Emitters  
// https://youtu.be/vfNHdVbE-l4
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose


let video;
let connections;
let hands = [];
let emitters = [];

let my = {};
let vmouseX = 0.0;
let vmouseY = 0.0;

let handPose;
let predictions = [];


function preload() {
  // Load HandPose model
  handPose = ml5.handPose();
}

function mousePressed() {
  // Log detected hand data to the console
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function bump(x, h, w) {
  return (h / w) * (sqrt(x ** 4 + w * w) - x * x);
}


function setup() {
  my.width = windowWidth;
  my.height = windowHeight;
  my.changeTime = 5.0;

  my.xpos = random(my.width);
  my.ypos = random(my.height);
  my.xspeed = 2;
  my.yspeed = 2;
  my.startTime = millis() / 1000.0;

  createCanvas(my.width, my.height);
  colorMode(HSB, 255);
  noStroke();
  setup_fullScreenButton();
  video = createCapture(VIDEO);
  video.hide();
  // Start detecting hands
  handPose.detectStart(video, gotHands);

  // Create particle emitters for each hand keypoint
  for (let i = 0; i < 21 * 2; i++) {
    emitters.push(new Emitter(width / 2, height / 2));
  }
  

  // Webcam setup


  background(0);
}

function draw() {
  clear();
  image(video, 0, 0);
  
  // Load webcam pixels
  video.loadPixels();

  const stepSize = 10;
  const baseSize = 10;
  const touchRad = 100;
  const touchStrength = 10;

  for (let l = 1.0; l > 0.0; l -= 0.3) {
    let s = baseSize + l * 8;
    for (let x = 0; x < width; x += stepSize) {
      for (let y = 0; y < height; y += stepSize) {
        let camX = floor(map(x, 0, width, 0, video.width));
        let camY = floor(map(y, 0, height, 0, video.height));
        let index = (camX + camY * video.width) * 4;

        let r = video.pixels[index];
        let g = video.pixels[index+1];
        let b = video.pixels[index+2];

        // colorful mapping using hue shift
        let h = (r - g + b) % 255;
        fill((h + l * 100) % 200, 200, 200, 60 + l * 80);

        let d = dist(width / 2 + vmouseX, height / 2 + vmouseY, x, y);
        let bval = bump(d, touchStrength, touchRad * touchRad * (1 - l) + 1);

        circle(x + vmouseX * bval, y + vmouseY * bval, s);
      }
    }
  }
   if (hands.length > 0) {
    let counter = 0;

    // Update emitter positions based on detected keypoints
    for (let hand of hands) {
      for (let i = 0; i < hand.keypoints.length; i++) {
        let keypoint = hand.keypoints[i];
        let emitter = emitters[counter];
        emitter.origin.x = keypoint.x;
        emitter.origin.y = keypoint.y;
        emitter.addParticle();
      }
    }
  }

  // Run all particle emitters
  for (let emitter of emitters) {
    emitter.run();
  }
}
function setup_fullScreenButton() {
  my.fullScreenButton = createButton("Full Screen");
  my.fullScreenButton.mousePressed(fullScreen_action);
  my.fullScreenButton.style("font-size:24px; position:absolute; top:20px; left:20px;");
}

function fullScreen_action() {
  my.fullScreenButton.remove();
  fullscreen(true);
  setTimeout(() => {
    resizeCanvas(windowWidth, windowHeight);
  }, 1000);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}