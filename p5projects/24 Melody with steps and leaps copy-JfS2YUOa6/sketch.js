let osc;
// Western Diatonic Scale Ratios
//let ratios = [1, 1.125, 1.25, 1.34, 1.5, 1.67, 1.875, 2];
// Pentatonic Scale
let ratios = [1, 1.125, 1.25, 1.5, 1.67, 2];
// Arabic Scale
//let ratios = [1, 1.067, 1.25, 1.34, 1.5, 1.6, 1.875, 2];

let BASE = 300;
let r = 0;
let f = BASE * ratios[r];

// Time variable for noise
let t = 0;

function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator();
  osc.setType("sine");
  osc.freq(f);
  osc.start();
}

function draw() {}
  t++;

  if (random() < 0.3) {
    // // Select a random note index
    r = random(0, ratios.length);
    console.log("RANDOM");
  } else {
    // // Select a noisy note index
    r = noise(t) * ratios.length;
    console.log("NOISE");
  }

  f = BASE * ratios[floor(r)];
  osc.freq(f);
  background(220);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(floor(f), width / 2, height / 2);
}
