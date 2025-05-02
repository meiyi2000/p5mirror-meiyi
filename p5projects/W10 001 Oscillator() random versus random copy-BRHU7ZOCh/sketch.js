let osc;

// Diatonic scale frequencies
let ratios = [1, 1.125, 1.125, 1.34, 1.5, 1.67, 1.875, 2];
// Base frequency
let BASE = 300;

function setup() {
  createCanvas(400, 400);
  
  // Create oscillator object
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(440);
  osc.start();
  osc.amp(1);
}

function draw() {
  background(220);
  
  // Pick a random note from the diatonic scale
  let f = BASE * random(ratios)
  osc.freq(f);
  
  // Outer space
  //osc.freq(random(50, 1000));
  
  // Fade in sound over 5 seconds
  osc.amp(1, 5);
}