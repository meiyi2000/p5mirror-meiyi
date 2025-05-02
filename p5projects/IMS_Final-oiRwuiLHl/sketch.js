// Hand Pose Particle Emitters  
// https://youtu.be/vfNHdVbE-l4
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let my = {};
let vmouseX = 0.0;
let vmouseY = 0.0;

let video;
let handPose;
let connections;
let hands = [];
let emitters = [];
let predictions = [];

function preload() {
  // Load HandPose model
  handPose = ml5.handPose();
}

function bump(x, h, w) {
  return (h / w) * (sqrt(x ** 4 + w * w) - x * x);
}


function mousePressed() {
  // Log detected hand data to the console
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
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

  background(0);
}

function draw() {
  clear();
  fill(0, 0, 0, 20); 
  rect(0, 0, width, height);
  image(video, 0, 0);
  blendMode(ADD);

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
