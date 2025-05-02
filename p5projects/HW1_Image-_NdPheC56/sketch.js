function setup() {
  createCanvas(500, 400);
  background(0,255,255); //cyan background
}

function draw() {
  //red line
  stroke(255,0,0);
  strokeWeight(35);
  line(0,0, 500, 400);
  
  //green ellipse
  fill(50, 205, 50);
  noStroke();
  ellipse(250, 200, 250, 195);
  
  //blue square
  fill(0, 0, 139);
  square(340, 165, 35);


  
}