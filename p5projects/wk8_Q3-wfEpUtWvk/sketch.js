let camera;

function setup() {
  createCanvas(640, 480);
  camera = createCapture(VIDEO);
  camera.hide();
}

function draw() {
  camera.loadPixels();
  for (let x = 0; x<640; x+=20){
    for(let y = 0; y<480; y+=20){
      let index = 4*(x + y * width);
      let c = color(camera.pixels[index],camera.pixels[index+1], camera.pixels[index+2])
    if(brightness(c)> 50){
      fill(255,255,255);
    }else{
      fill(0,0,0);
    }
   rect(x,y,20,20)
    }
  }

}