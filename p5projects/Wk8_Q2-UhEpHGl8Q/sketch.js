let img;
function preload() {
  img = loadImage('cat.jpg');}
function setup() {
  createCanvas(img.width, img.height);
  img.loadPixels();
  for (let i = 0; i < img.width; i++){
    for (let j = 0; j < img.height; j++){
      let index = 4*(j*img.width + i);
      img.pixels[index+1]=255;
     
    }
  }
  img.updatePixels();
  image(img, 0, 0,img.width, img.height);
}