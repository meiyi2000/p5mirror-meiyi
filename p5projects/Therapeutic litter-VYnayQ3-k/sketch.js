let my = {};
let vmouseX = 0.0;
let vmouseY = 0.0;

let video;
let handpose;
let predictions = [];

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

  // Webcam setup
  video = createCapture(VIDEO);
  video.size(160, 120);
  video.hide();



  background(0); // initial black
}

function draw() {
  // semi-transparent background for trails
  fill(0, 0, 0, 20); 
  rect(0, 0, width, height);

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
