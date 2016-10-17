const testList = [
	{x: 100, y: 100},
	{x: 500, y: 500},
	{x: 30, y: 30}
]

class Field {
	constructor(node) {
		this.list = [];
		this.radius = 50;

		//this.list = testList;
    this.node = document.querySelector(node);
		//double click
		//get distance to items in this.list
		//if ev.target is circle remove it
		  //else if getDistance is true create new Circle 
		this.node.addEventListener('dblclick', () => {
      
		});


		//add circle to this
		this.node.addEventListener('circle-added', (e) => {
			this.list.push(e.detail.center);
		})

		//for moveable - mousedown and mouseup listeners
		// 
		this.node.addEventListener('mouseup', function() {
      // 
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

  generatePoint(radius, coord, list) {
  	let point = parseInt((Math.random() * (this.node.offsetWidth - (radius * 2))) + radius, 10);
  	if (!this.getDistance(point, radius, coord, list)) {

  		console.log('too close');
  	  return this.generatePoint(radius, coord, list);
  	}
  	
  	console.log('point ' + point + ' accepted');
  	return point;
  }

  generatePoints() {
    const x = this.generatePoint(this.radius, 'x', this.list);
    const y = this.generatePoint(this.radius, 'y', this.list);
    return [x, y];
  }

  generateColor(color1, color2) {
    //if no arguments, generate a hex color code 
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  getDistance(point, radius, coord, list) {
  	let count = 0;
  	let letDraw = true;
  	
    while (count < list.length ) {
  		const noRightOffset = (list[count][coord] + radius) > (point - radius);

  		const noLeftOffset = (list[count][coord] - radius) < (point + radius);

  		if (noRightOffset && noLeftOffset) {
  			// console.log('r ', noRightOffset);
  		 //  console.log('l ', noLeftOffset)
  		  console.log('distance ', list)
  			console.log('point ', point);
  			console.log('comparing against ' + list[count][coord]);
  			// console.log('listEl + radius ', + list[count][coord] + radius)
  			// console.log('listEl - radius ', + list[count][coord] - radius)
  			// console.log('point- ', point - radius);
  			// console.log('point+ ', point + radius);
	  		// console.log('listEl + radius VS point - radius ', (list[count][coord] + radius) + ' ' + (point - radius));
	  		// console.log('listEl - radius VS point + radius ', (list[count][coord] - radius) + ' ' + (point + radius))
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
	  // return this.render();
	  // this.addEventListener('mousedown', () => {

	  // });

	  // this.circleAdded = new customEvent('circle-added', {
	  // 	bubbles: true,
	  // 	detail: {
	  // 		center: this.center,
	  // 	}
	  // })
	}
}
n = new Field('.field');
n.init(5, n.radius)
//m = new Circle([250, 150], 50, '#000');


