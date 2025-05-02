let startTime;
let waveColor;
let waveType;

function setup() {
  createCanvas(800, 400);
  startTime = millis(); // Record the starting time
  waveColor = color(0); // Default color is black
  waveType = 'sine'; // Default wave type is sine
}

function draw() {
  background(255);
  stroke(waveColor);
  noFill();

  let elapsedSeconds = (millis() - startTime) / 1000; // Calculate elapsed time in seconds
  let baseFrequency = 2; // Base frequency for wave cycles across the width
  let baseAmplitude = 100; // Base amplitude for wave height

  // Draw the selected wave type with randomization
  beginShape();
  for (let x = 0; x < width; x++) {
    let frequency = baseFrequency + random(-0.5, 0.5); // Small random variation in frequency
    let amplitude = baseAmplitude + random(-20, 20); // Small random variation in amplitude

    let angle = frequency * ((x / width) * TWO_PI) + elapsedSeconds;
    let y;

    // Determine wave type based on user input
    if (waveType === 'sine') {
      y = height / 2 + sin(angle) * amplitude;
    } else if (waveType === 'cosine') {
      y = height / 2 + cos(angle) * amplitude;
    } else if (waveType === 'tangent') {
      y = height / 2 + tan(angle) * 20; // Scaled down to avoid overflow
    }

    // Randomly offset each point in the y-direction for extra "wiggle"
    y += random(-10, 10);

    vertex(x, y);
  }
  endShape();
}

function keyPressed() {
  // Change wave type based on key
  if (keyCode === UP_ARROW) {
    waveType = 'sine';
  } else if (keyCode === DOWN_ARROW) {
    waveType = 'cosine';
  } else if (keyCode === LEFT_CONTROL) {
    waveType = 'tangent';
  }
  
  // Change wave color based on key
  if (keyCode === LEFT_ARROW) {
    waveColor = color(255, 0, 0); // Red
  } else if (keyCode === RIGHT_ARROW) {
    waveColor = color(0, 0, 255); // Blue
  } else if (keyCode === RIGHT_CONTROL) {
    waveColor = color(255, 255, 0); // Yellow
  }
}

function keyReleased() {
  // Reset to default wave and color when any key is released
  waveType = 'sine'; // Default wave type
  waveColor = color(0); // Default color (black)
}
