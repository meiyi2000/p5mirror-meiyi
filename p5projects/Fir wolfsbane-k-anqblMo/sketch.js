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
  burger.loadPixels();
  burger.resize(windowWidth/3,windowHeight/2);
  for (let i =0; i<burger.pixels.length; i+=4){
    //if (burger.pixels[i] > 255) speed *=(-1);
    //burger.pixels[i] += speed;
    burger.pixels[i+1] += speed;
    burger.pixels[i+2] += speed;
    burger.pixels[i+3] -= speed;
    // if(burger.pixels[i]== 255){
    //   speed = speed*-1;
    // }
  }
  
  burger.updatePixels();  
  image(burger,0,0);
  
//  chicken.loadPixels();
  chicken.resize(windowWidth/3,windowHeight/2);
  image(chicken,windowWidth/3,0);
  
 // coke.loadPixels();
  coke.resize(windowWidth/3,windowHeight/2);
  image(coke,(windowWidth/3)*2,0);
  
  //fries.loadPixels();
  fries.resize(windowWidth/3,windowHeight/2);
  image(fries,0,windowHeight/2);
  
  nugget.resize(windowWidth/3,windowHeight/2);
  image(nugget,windowWidth/3,windowHeight/2);
  
  pie.resize(windowWidth/3,windowHeight/2);
  image(pie,(windowWidth/3)*2,windowHeight/2);
  
  for (let i = 0; i < width; i++) {
    for (let j = 0; j<height; j++) {
      //let pixel = get(i,j);
//       pixel[0] = pixel[0]--;
//       pixel[1] = pixel[1]--;
      
    }
  }
}