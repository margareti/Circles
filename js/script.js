
class Field {
  constructor(node) {
    this.list = [];
    this.radius = 50;
    this.moving = false;

    this.node = document.querySelector(node);
    this.clickCoords = [];

    this.movingEl;
    this.movingIdx;

    this.node.addEventListener('dblclick', (ev) => {
      const circles = Array.from(this.node.children);
      if (circles.indexOf(ev.target) >= 0) {
        this.purgeCircle(circles.indexOf(ev.target));
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
        this.movingEl = ev.target;
        this.clickCoords = [ev.x, ev.y];
        this.movingIdx = circles.indexOf(ev.target);
        this.moving = true;
      }
    });

    this.node.addEventListener('mouseup', (ev) => {
      if (this.moving) {
        this.moving = false;
        const x = ev.x - this.clickCoords[0];
        const y = ev.y - this.clickCoords[1];

        const newX = parseInt(this.movingEl.style.left, 10) + x;
        const newY = parseInt(this.movingEl.style.top, 10) + y;

        const intersection = this.getIntersection([ev.x, ev.y], this.radius / 2, this.movingIdx);
        if (intersection === false) {
          this.movingEl.style.left = `${newX}px`;
          this.movingEl.style.top = `${newY}px`;
          this.clickCoords = [];

          this.list[this.movingIdx].x = newX + (this.radius / 2);
          this.list[this.movingIdx].y = newY + (this.radius / 2);
        } else {
          const movingColorRGB = this.decodeHex(this.list[this.movingIdx].color);
          const intersColorRGB = this.decodeHex(this.list[intersection].color);
          const newColor = this.generateColor(movingColorRGB, intersColorRGB);
          this.movingEl.style.background = newColor;
          this.movingEl.style.left = `${newX}px`;
          this.movingEl.style.top = `${newY}px`;


          this.list[this.movingIdx].x = newX + (this.radius / 2);
          this.list[this.movingIdx].y = newY + (this.radius / 2);
          this.purgeCircle(intersection);
        }
      }
    });
  }

  purgeCircle(idx) {
    this.node.removeChild(this.node.children[idx]);
    this.list.splice(idx, 1);
  }

  newRadius(rad1, rad2) {
    const radius1 = this.list[rad1].radius;
    const radius2 = this.list[rad2].radius;

    return (radius1 + radius2) / 2;
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
        const randomNum = Math.floor(Math.random() * 256).toString(16);
        color.push(randomNum.length === 2 ? randomNum : `0${randomNum}`);
      } else {
        color.push(Math.floor((color1[start] + color2[start]) / 2).toString(16));
      }
      start++;
    }
    return `#${color.join('')}`;
  }

  decodeHex(string) {
    const hex = string.split('');
    const colors = [];
    let temp = [];
    for (let i = 1; i < 7; i ++) {
      const isEven = i % 2 === 0;
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

  getIntersection(coords, margin, escape = this.list.length) {
    let count = 0;
    let intersectIdx = false;
    while (count < this.list.length) {
      if (count !== escape) {
        const distance = this.getDistance(coords, [this.list[count].x, this.list[count].y]);

        if (distance < margin) {
          intersectIdx = count;
          break;
        }
      }
      count++;
    }
    return intersectIdx;
  }

  validatePoint(coords) {
    let count = 0;
    let letDraw = true;
    while (count < this.list.length) {
      if (count !== escape) {
        const distance = this.getDistance(coords, [this.list[count].x, this.list[count].y]);

        if (distance < this.radius) {
          letDraw = false;
          break;
        }
      }
      count++;
    }
    return letDraw;
  }

  renderCircle(circle) {
    const el = document.createElement('div');

    el.style.position = 'absolute';
    el.style.width = `${circle.radius}px`;
    el.style.height = `${circle.radius}px`;
    el.style.background = circle.color;
    el.style.borderRadius = '50%';
    el.style.left = `${(circle.x - (circle.radius / 2))}px`;
    el.style.top = `${(circle.y - (circle.radius / 2))}px`;
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
const n = new Field('.field');
n.init(10, n.radius);

