class Field {
	constructor() {
		this.list = [];

		//double click
		//get distance to items in this.list
		//if ev.target is circle remove it
		  //else if getDistance is true create new Circle 
		this.addEventListener('dblclick', () => {
    
		});


		//add circle to this
		this.addEventListener('circle-added', (e) => {
			this.list.push(e.detail.center);
		})

		//for moveable - mousedown and mouseup listeners
		// 
		this.addEventListener('mouseup', function() {
      // 
		})
	}
  
  generatePoint() {
  	//generate x,y
  	//if this.getDistance is ok with it.

  }

  generateColor(color1, color2) {
    //if no arguments, generate a hex color code 
  }

  getDistance(x, y) {
    //get distance from (x, y) + radius
    //and items in this.list
  }



}

class Circle {
	constructor([x, y], radius, color) {
	  this.center = [x, y];
	  this.addEventListener('mousedown', );

	  this.circleAdded = new customEvent('circle-added', {
	  	bubbles: true,
	  	detail: {
	  		center: this.center;
	  	}
	  })
	}
  

}