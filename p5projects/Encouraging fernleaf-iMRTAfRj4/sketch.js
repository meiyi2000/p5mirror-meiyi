let mic;
let fft;

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
  
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(220);
  console.log(mic.getLevel());
  // let level = mic.getLevel()*width;
  // ellipse(width/2, height/2,level);
  
  let waveform = fft.waveform();
  console.log(waveform);
  beginShape();
  for (let t = 0; t<waveform.length; t++){
    let y = waveform[t]*300+height/2;
    vertex(t,y);}endShape();
  
  let bin = fft.analyze();
  console.log(bin);

  for (let b =0; b<bin.length;b++){
    let y = waveform[t]*300 +height/2;
    line (b, height, b ,height - y);
  }
  
}