let sound = [];
let count = 0;

function setup() {
  for (var i = 0; i < 10; i++) {
    sound.push(loadSound(i +'.mp3'));
  }
}

function mousePressed() {
  for (var j = 0; j < 10; j++) {
      if (sound[j].isPlaying()) {
        sound[j].stop();
        j++;
      }
      else  {  
        sound[j].play();
        
      }
    }
}