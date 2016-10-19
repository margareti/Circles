

class Field {
	constructor(node) {
		this.list = [];
		this.radius = 50;
		this.moving = false;
		//this.list = testList;
    this.node = document.querySelector(node);
    this.clickCoords = [];

		this.node.addEventListener('dblclick', (ev) => {
      const circles = Array.from(this.node.children);
      if (circles.indexOf(ev.target) >= 0) {
      	console.log(circles.indexOf(ev.target));
      	this.node.removeChild(ev.target);
      	this.list.splice(circles.indexOf(ev.target), 1);

      } else {
      	const x = ev.x;
      	const y = ev.y;
      	if (!this.validatePoint([x, y])) return;
      	const newCircle = new Circle([x, y], this.radius, this.generateColor());
      	this.list.push(newCircle);
      	this.node.appendChild(this.renderCircle(newCircle));
      }
		});


		this.node.addEventListener('mousedown', (ev) => {
      const circles = Array.from(this.node.children);
      if (circles.indexOf(ev.target) >= 0) {
      	console.log([ev.x, ev.y]);
      	this.moving = true;
      	this.clickCoords = [ev.x, ev.y];
      }
		})
		this.node.addEventListener('mousemove', (ev) => {
			if (this.moving) {
				const x = ev.x - this.clickCoords[0];
				const y = ev.y - this.clickCoords[1];
				console.log([x, y]);

			}
		})
		this.node.addEventListener('mouseup', (ev) => {
			this.moving = false;
		})
	}
	init(numCircles, radius) {
		let start = numCircles;
		while (start) {
			const coords = this.generatePoints();
			const color = this.generateColor();
			this.list.push(new Circle(coords, radius, color));
			start--;
		}
		for (let el in this.list) {
			this.node.appendChild(this.renderCircle(this.list[el]));
			console.log(this.list[el])
		}
	}


	getRandomPoint(max) {
		return parseInt((Math.random() * (this.node[max] - (this.radius * 2))) + this.radius, 10);
	}

  generatePoints() {
    const x = this.getRandomPoint('offsetWidth');
    const y = this.getRandomPoint('offsetHeight');
    if (!this.validatePoint([x, y])) {
    	return this.generatePoints();
    }
    return [x, y];
  }

  generateColor(color1, color2) {
  	const color = [];
    let start = 0;
    while (start < 3) {
    	if (arguments.length === 0) {
    		let randomNum = Math.floor(Math.random() * 256).toString(16);
    		color.push(randomNum.length === 2 ? randomNum : '0' + randomNum);
    	} else {
    		color.push(Math.floor((color1[start] + color2[start]) / 2).toString(16));
    	}
    	
    	start++;
    }
    return '#' + color.join('');
  }

  decodeHex(string) {
  	const hex = string.split('');
  	const colors = [];
  	let temp = [];
  	for (const i = 1; i < 7; i ++) {
  		const isEven = i % 2 === 0
  		if (!isEven) {
  			temp = [];
  		}
  		temp.push(hex[i]);
  		if (isEven) {
  			colors.push(parseInt(temp.join(''), 16));
  		}
  	}
  	return colors;
  }

  getDistance(coord1, coord2) {
  	const x = Math.pow(coord2[0] - coord1[0], 2);
  	const y = Math.pow(coord2[1] - coord1[1], 2);
  	const result = Math.pow(x + y, 0.5);
  	return result;
  }

  validatePoint(coords) {
  	let count = 0;
  	let letDraw = true;
  	
    while (count < this.list.length ) {
  		const distance = this.getDistance(coords, [this.list[count].x, this.list[count].y]);
  		if (distance < this.radius) {
  			letDraw = false;
  			break;
  		}
  		count++;
  	}
  	return letDraw;
  }

  renderCircle(circle) {
  	const el = document.createElement('div');

		el.style.position = 'absolute';
		el.style.width = circle.radius + 'px';
		el.style.height = circle.radius + 'px';
		el.style.background = circle.color;
		el.style.borderRadius = '50%';
		el.style.left = (circle.x - (circle.radius / 2)) + 'px';
		el.style.top = (circle.y - (circle.radius / 2)) + 'px';
		return el;
  }
}

class Circle {
	constructor([x, y], radius, color) {
	  this.x = x;
	  this.y = y;
	  this.color = color;
	  this.radius = radius;
	}
}
n = new Field('.field');
n.init(10, n.radius)
//m = new Circle([250, 150], 50, '#000');


