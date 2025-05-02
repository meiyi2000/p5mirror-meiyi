let burger;
let chicken;
let coke;
let fries;
let nugget;
let pie;
let speed = 1;

function preload(){
  burger = loadImage('burger.jpg');
  chicken = loadImage('chicken.jpg');
  coke = loadImage('coke.jpg');
  fries = loadImage('fries.jpg');
  nugget = loadImage('nugget.jpg');
  pie = loadImage('pie.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //colorMode(HSB, 360, 100, 100);
}

function draw() {
  updatePixel(burger, width/3+1, height/2+1); 
  image(burger,0,0);

  updatePixel(chicken, width/3+1, height/2+1);
  image(chicken,width/3,0);
  
  updatePixel(coke, width/3, height/2+1);
  image(coke,(width/3)*2,0);
  
  updatePixel(fries, width/3+1, height/2);
  image(fries,0,height/2);
  
  updatePixel(nugget, width/3+1, height/2); 
  image(nugget,width/3, height/2);
  
  updatePixel(pie, width/3, height/2); 
  image(pie,(width/3)*2, height/2);
  
}

function updatePixel(img, resizeX, resizeY) {
  img.loadPixels(); 
  img.resize(resizeX,resizeY);
  for (let i =0; i<img.pixels.length; i+=4){
    img.pixels[i] -=tan(20);
    img.pixels[i+1] +=cos(10);
    img.pixels[i+2] -=tan(20);
    //img.pixels[i+3] --;
    if (img.pixels[i] == 0) {
      img.pixels[i]=255;
    }
    if (img.pixels[i+1] == 255) {
      img.pixels[i+1]=0;
    }
    if (img.pixels[i+2] == 0) {
      img.pixels[i+2]=255;
    }
  }
  img.updatePixels();   
}

