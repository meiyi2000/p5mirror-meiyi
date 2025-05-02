

// Code that describes the starting position of a shape that will move
let x = 50;
let y = 20;


function setup() {
  // Code to create a 400x400 canvas
createCanvas(400, 400);
  // Code to draw a gray background
background(220);
}

function draw() {
  // Code that changes the position of the shape over time
x++;

// Code to draw the shape
rect(x, y, 50, 50);

// Code that describes mouse interaction
if(mouseX > x && mouseX < x + 50) {
  x = mouseX;
}
}