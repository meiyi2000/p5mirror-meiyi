let pale = ['#7FFF00','#FF00FF','#0000CC',]
function setup() {
	createCanvas(400, 400);
	let seg = 10;
	let w = width / seg;
	background('#FF5212');
	noStroke();
	for (let i = 0; i < seg; i++) {
		for (let j = 0; j < seg; j++) {
          sk = (i+j)%3
          
          fill(pale[sk])
			let x = i * w + w / 2;
			let y = j * w + w / 2;
			form(x, y, w);
		}
	}
}

function draw() {

}

function form(x, y, w) {
	push();
	translate(x, y);
	scale(pm(), pm());
	rotate(int(random(2)) * HALF_PI);
	arc(-w / 2, -w / 2, w, w, 0, PI / 2);
	arc(w / 4, w / 2, w / 2, w / 2, PI, TAU);
	pop();
}

function pm() {
	return (int(random(2)) * 2) - 1;
}