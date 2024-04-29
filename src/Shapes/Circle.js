class Circle extends Shape {
    constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
    }

    contains(px, py) {
        let d = Math.sqrt((px - this.x) ** 2 + (py - this.y) ** 2);
        return d <= this.radius;
    }

    show(s) {
        s.fill(10, 200, 10);
        s.ellipse(this.x, this.y, this.radius * 2);
    }
}