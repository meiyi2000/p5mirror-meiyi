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
