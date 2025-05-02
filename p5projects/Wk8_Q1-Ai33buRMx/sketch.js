function setup() {
  createCanvas(200, 200);
}

function draw() {
  for(let i = 0; i<200; i++){
    for(let j = 0; j <200; j++){
      point(i,j);
      stroke(255,0,0)
    }
  }
}