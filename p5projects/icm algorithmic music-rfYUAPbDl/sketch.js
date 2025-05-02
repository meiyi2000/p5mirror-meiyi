//0 = glassbowl
//1 = gong
//2 = flute

let sounds = [];
let x = 0;
let h = 0;
let beat = 60;
let sb = beat - 10;

function preload() {
  for (let s = 0; s < 7; s++) {
    sounds.push(loadSound('Sound/' + s + '.mp3'));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  h = height/sounds.length;
  noStroke();
}

function draw() {
  x++;
  if (x > width) {
    background('white');
    x = 0;
  }

  let y = 0;
  fill('black');
  if (frameCount % beat == 1) {
    sounds[2].play();
    rect(x, y, 5, 15);
  }

  y += h;
  //Mango drum  
  if (frameCount % floor(beat / 2) == 1) {
    sounds[0].play();
    rect(x, y, 5, 15);
  }

  y += h;
  // Pineapple
  if (frameCount % floor(beat / 3) == 1) {
    sounds[1].play();
    rect(x, y, 5, 15);
  }

  y += h;
  //Syncopated drum
  if (frameCount % beat == sb) {
    sounds[5].play();
    rect(x, y, 5, 15);
    sb--;
  }
  
  y += h;
  // Phased drum
  if (frameCount % 50 == 1) {
    sounds[4].play();
    rect(x, y, 5, 15);
  }

}