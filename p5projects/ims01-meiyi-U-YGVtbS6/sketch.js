//IMS01-2025-Meiyi
//original:https://openprocessing.org/sketch/2506689
//Comment: The sketch has a semi-elipsed spine with many hairs waving whenever the mouse is pressed down and move. The hair will follow the direction of the mouse if mouse is moving. If mouse is pressed but not moving, the hair will stop and drop, the hair at where the mouse rest will stick out. while the mouse is not pressed, there's defaul demonstration of animated mouse movement with following hair movement, suggesting how this sketch should be interacted. There is inertia of the hair movement, which allows the hair to continue moving until it conpletly rest. I wonder how does the class works in this case. Does having a class make the modular hair easier/faster to generate?
/**
 * Created for the WCCChallenge "WIND"
 * 
 **/
class Spine {
	constructor ({n=10,separation=20,bendMax=PI/6}={}) {
		let node = [];
		for (let i =0; i<n;i++) node.push(createVector(i*separation,0));
		Object.assign(this,{n,separation,bendMax,node});
	}
	translate (v) {
		for (let p of this.node) p.add(v);
	}
	get perimeter() {
		return this.separation*this.n
	}
	relaxRight(i, u) {
		if (i+1 < this.n) { 
			let v = this.node[i+1].copy().sub(this.node[i]);
			// let u = this.node[i].copy().sub(this.node[i-1])
			let ang = u.angleBetween(v);
			if (ang < -this.bendMax) v.rotate(-ang-this.bendMax)
			else if (ang > this.bendMax) v.rotate(-ang+this.bendMax)
			v.setMag(this.separation);
			this.node[i+1] = this.node[i].copy().add(v);
			this.relaxRight(i+1, v)
		}
	}
	relaxLeft(i, u) {
		if (i > 0) { 
			let v = this.node[i-1].copy().sub(this.node[i]);
			//let u = this.node[i].copy().sub(this.node[i+1]);
			let ang = u.angleBetween(v);
			if (ang < -this.bendMax) v.rotate(-ang-this.bendMax)
			else if (ang > this.bendMax) v.rotate(-ang+this.bendMax)
			v.setMag(this.separation);
			this.node[i-1] = this.node[i].copy().add(v);
			this.relaxLeft(i-1,v)
		}
	}
	closest (p) {
		let {node,n} = this;
		let best_d = 1e10;
		let best_i = 0;
		//let p = createVector(x,y);
		for (let i = 0; i < n; i++) {
			let d = p.dist(node[i]);
			if (d<best_d) {
				best_d = d;
				best_i = i;
			}
		}
		return best_i;
	}
	setNode(i,p) {
		let {n,node} = this;
		let u;
		if (i > 0) {
			if (i+1 < n) {
				u = node[i+1].copy().sub(node[i-1]);
			}
			else {
				u = node[i].copy().sub(node[i-1]);
			}
		} 
		else {
			u = node[i+1].copy().sub(node[i]);
		}
		this.node[i] = p.copy();
		this.relaxRight(i,createVector(u.x,u.y));
		//this.relaxLeft(i,createVector(-u.x,-u.y));
	}
	draw() {
		const {n,node} = this;
		beginShape()
		for (let p of node) curveVertex (p.x,p.y);
		endShape();
	}
}

let hairs;
let D;
const nHairs = 60;
const nSegments = 10;
const g = 1;

function setup() {
	createCanvas(windowWidth, windowHeight);
	D = min(width, height);
	initHairs()
}

function initHairs() {
	let r = D * 0.1;
	let hairLen = D * 0.5;
	let sep = hairLen / nSegments;
	hairs = [];
	for (let i = 0; i < nHairs; i++) {
		let spine = new Spine({
			n: nSegments,
			separation: sep,
			bendMax: PI / 6
		});
		let v = createVector(r, 0).rotate(map(i, 0, nHairs - 1, 0, -PI));
		let p = createVector(width / 2, height / 2).add(v);
		v.setMag(sep);
		let q = p.copy().add(v);
		let node = p.copy();
		for (let j = 0; j < nSegments; j++) {
			spine.node[j] = node.copy();
			node.add(v)
		}
		hairs.push({
			p,
			q,
			spine
		})
	}
}

function moveHairs(v) {
	for (let {
			p,
			q,
			spine
		} of hairs) {
		for (let i = nSegments - 1; i > 1; i--) {
			let node = spine.node[i].copy();
			if (v) node.add(v)
			node.y += g;
			spine.setNode(i, node);
		}
		spine.setNode(0, p);
		spine.setNode(1, q);
	}
}

function drawArrow(p, v, sz) {
	let q = p.copy().add(v);
	let u = v.copy().setMag(sz);
	let a = radians(120);
	let b = radians(150)
	push();
	strokeJoin(ROUND)
	line(p.x, p.y, q.x, q.y);
	beginShape();
	for (let i = 0; i < 3; i++) {
		u.rotate(i == 0 ? b : a);
		q.add(u);
		vertex(q.x, q.y);
	}
	endShape(CLOSE)
	pop()
}

function draw() {
	background(220);
	const cntr = createVector(width / 2, height / 2);
	let p;
	let v;
	if (mouseIsPressed) {
		p = createVector(mouseX, mouseY);
	} else {
		let t = millis() / 5000
		let r = lerp(D / 6, D / 2, noise(t, 1));
		let a = lerp(-TAU, TAU, noise(t, 2));
		p = cntr.copy().add(createVector(0, -r).rotate(a));
	}

	if (p.dist(cntr) > D / 5) {
		v = createVector(width / 2, height / 2).sub(p);
		let s = map(v.mag(), D/2, 0, 0.2, 4) * g;
		v.setMag(s)
		fill('white')
		drawArrow(p, v.copy().setMag(s * 30), 20)
	}
	noFill();
	strokeWeight(2);
	moveHairs(v); moveHairs(v);//moveHairs(v);moveHairs(v);
	for (let {
			spine
		} of hairs) spine.draw()
}