

class Rectangle extends Shape {
    constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
    }

    contains(px, py) {
        return px >= this.x && px <= this.x + this.width && py >= this.y && py <= this.y + this.height;
    }

    show(s) {
        s.fill(10, 200, 10);
        s.rect(this.x, this.y, this.width, this.height);
    }
}

