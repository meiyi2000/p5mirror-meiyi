let pale = ['#FF00FF','#0000CC','#FF5212','#7FFF00']
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  for(let sk = 0; sk<100; sk++){
  translate(width*0.8,height*0.5);
    rotate(10);
    skk = sk % 4
    stroke(pale[skk]);
    star(5*skk,5*skk,30,50,5);
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);}