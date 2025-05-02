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
      
      //Erase line
      for (let line= img.height/2-5; line<img.height/2+5;line++){
        let index1 = 4*(line*img.width+i)
          img.pixels[index1]=0;
          img.pixels[index1+1]=0;
          img.pixels[index1+2]=0;
          
        }
      
      
      //Blue line 
      for (let b=img.width/2-5;b <img.width/2+5; b++){
      let index2 = 4*(b+img.width*j)
      img.pixels[index2]=0;
      img.pixels[index2+1]=0;
      img.pixels[index2+2]=255;
        
      }
      
      
      

     
    }
  }
  img.updatePixels();
  image(img, 0, 0);
}