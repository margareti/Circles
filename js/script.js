const testList = [
	{x: 100, y: 100},
	{x: 500, y: 500},
	{x: 30, y: 30}
]

class Field {
	constructor(node) {
		this.list = [];
		this.radius = 10;

		this.list = testList;
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
  generatePoint(radius, coord, list) {
  	let point = parseInt((Math.random() * (this.node.offsetWidth - (radius * 2))) + radius);
  	let count = 0; console.log(point);
  	while (count < list.length) {
  		const rightOffset = (list[count][coord] + radius) < (point - radius);
  		const leftOffset = (list[count][coord] - radius) > (point + radius);
  		if (!rightOffset && !leftOffset) {
  			point = false;
  			break;
  		}
  		count++;
  	}
  	if (!point) {
  		console.log('point invalid')
  		return this.generatePoint(radius, coord, list);
  	}
  	return point;
  }

  generatePoints() {
  	//generate x,y
  	//if this.getDistance is ok with it.
    const x = this.generatePoint(this.radius, 'x', this.list);
    const y = this.generatePoint(this.radius, 'y', this.list);
    return [x, y];

  }

  generateColor(color1, color2) {
    //if no arguments, generate a hex color code 
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  getDistance(x, y, radius) {
    //get distance from (x, y) + radius
    //and items in this.list
  }

}

class Circle {
	constructor([x, y], radius, color) {
	  this.center = [x, y];
	  this.addEventListener('mousedown', () => {

	  });

	  this.circleAdded = new customEvent('circle-added', {
	  	bubbles: true,
	  	detail: {
	  		center: this.center,
	  	}
	  })
	}
}


