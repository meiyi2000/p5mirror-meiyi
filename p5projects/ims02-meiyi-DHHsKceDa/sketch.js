let my = {};
let vmouseX = 0.0;
let vmouseY = 0.0;

function bump(x, h, w) {
  return (h / w) * (sqrt(x ** 4 + w * w) - x * x);
}

function setup() {
  my.width = windowWidth;
  my.height = windowHeight;
  my.changeTime = 5.0;
  my.debug = 0;

  my.xpos = random(my.width);
  my.ypos = random(my.height);
  my.xspeed = 2;
  my.yspeed = 2;
  my.startTime = millis() / 1000.0;

  createCanvas(my.width, my.height);
  setup_fullScreenButton();
  noStroke();
}

function draw() {
  clear();

  // update mouse velocity
  const stiffness = 0.95;
  vmouseX = (mouseX - pmouseX) * (1 - stiffness) + vmouseX * stiffness;
  vmouseY = (mouseY - pmouseY) * (1 - stiffness) + vmouseY * stiffness;

  // draw displaced circle grid (FULL SCREEN)
  const touchRad = 100;
  const touchStrength = 10;
  const density = 6;

  for (let l = 1.0; l > 0.0; l -= 0.1) {
    let s = (6 + l * 2) * density;
    fill(255 - l * 100);
    for (let x = 0; x < width; x += 5 * density) {
      for (let y = 0; y < height; y += 5 * density) {
        let d = dist(mouseX, mouseY, x, y);
        let b = bump(d, touchStrength, touchRad * touchRad * (1 - l) + 1);
        circle(x + vmouseX * b, y + vmouseY * b, s);
      }
    }
  }

  // draw bouncing cross
  check_time();
  stroke(255);
  strokeWeight(1);
  line(0, my.ypos, width, my.ypos);
  line(my.xpos, 0, my.xpos, height);

  my.ypos += my.yspeed;
  if (my.ypos > height || my.ypos < 0) my.yspeed *= -1;

  my.xpos += my.xspeed;
  if (my.xpos > width || my.xpos < 0) my.xspeed *= -1;
}

function new_pos() {
  my.xpos = random(0, width);
  my.ypos = random(0, height);
}

function check_time() {
  let now = millis() / 1000;
  if (now - my.startTime > my.changeTime) {
    my.startTime = now;
    new_pos();
  }
}

function setup_fullScreenButton() {
  my.fullScreenButton = createButton("?=v7 Full Screen");
  my.fullScreenButton.mousePressed(fullScreen_action);
  my.fullScreenButton.style("font-size:42px");
}

function fullScreen_action() {
  my.fullScreenButton.remove();
  fullscreen(1);
  let delay = 3000;
  setTimeout(ui_present_window, delay);
}

function ui_present_window() {
  resizeCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
