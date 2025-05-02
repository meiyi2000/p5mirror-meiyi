let osc,reverb;
let ratios = [0, 1, 1.125, 1.25, 1.5, 1.67, 2];
let BASE = 300;
let r = 0;
let f = BASE * ratios[r];

// Time variable for noise
let t = 0;

let sounds = [];
let x = 0;
let h = 0;
let beat = 60;
let sb = beat - 40;
  
function preload() {
  for (let s = 0; s < 7; s++) {
    sounds.push(loadSound('Sound/' + s + '.mp3'));
  }
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  osc = new p5.Oscillator();
  osc.setType("sine");
  osc.freq(f);
  osc.start();
  reverb = new p5.Reverb();
  osc.connect(reverb);
  h = height/sounds.length;
}

function draw() {
   background(0);
  x++;
  if (x > width) {
    x = 0;
  }

   let y = 0;
  //Flute
  if (frameCount % floor(beat*2) == 1) {
    sounds[2].play();
  }

  y += h;
  //Glass Bowl  
  if (frameCount % floor(beat*8) == 1) {
    sounds[0].play();
    sounds[0].rate(random(0,3));
  }

  y += h;
  // Gong
  if (frameCount % floor(beat*12) == 1) {
    sounds[1].play();
  }

    y += h;
  // Bamboo
  if (frameCount % 80 == 10) {
    sounds[3].play();
    sounds[3].rate(random(0,1));
  }
  
  y += h;
  //String
  if (frameCount % beat == sb) {
    sounds[5].play();
    sb--;
  }
  
  y += h;
  // Kalim
  if (frameCount % 100 == 20) {
    sounds[4].play();
  }
  
   y += h;
  // Uke
  if (frameCount % 40 == 10) {
    sounds[6].play();
    sounds[6].rate(random(0,1));
  }
  y+= h;
  if (frameCount % 80 == 10){
    oscPlay()
  }


}
function oscPlay(){
   t++;

  // Use sin to create a patterned melody
  // Do you hear the repetition?
  let mult = 2;
  // Do you still hear the repetition?
  if(random()< 0.5) mult = 3;
  r += sin(t)*mult;
  r = constrain(r, 0, ratios.length-1);

  f = BASE * ratios[floor(r)];
  osc.freq(f);
  reverb.process(osc, 3, 10); 
  
}
/* 
0 = glass bowl 
1 = gong 
2 = flute 
3 = Bamboo
4 = Kalimba
5 = String
6 = ukulele
*/
