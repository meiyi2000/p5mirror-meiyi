var sound;

function setup() {
  createCanvas(400, 400);
  sound = loadSound("sound.mp3");
  
}

function mousePressed() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.play();
  }
}