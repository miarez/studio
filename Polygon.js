class Polygon extends Draggable {
    constructor(x, y, points, controls, name = null) {
      super(x, y);
      this.name = name
      this.points = points;  // Array of p5.Vector
      this.controls = controls
      this.stroke = {
        r : 200,
        g : 200,
        b : 200
      }
      this.strokeWeight = 1;
      this.fill = {
        r : 200,
        g : 200,
        b : 200
      }
    }

    over() {
        // Transform mouse coordinates based on the current view
        let transformedMouseX = (mouseX - this.controls.view.x) / this.controls.view.zoom;
        let transformedMouseY = (mouseY - this.controls.view.y) / this.controls.view.zoom;

        // Use ray-casting algorithm to test if the point is inside the polygon
        let inside = false;
        for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
            let xi = this.x + this.points[i].x, yi = this.y + this.points[i].y;
            let xj = this.x + this.points[j].x, yj = this.y + this.points[j].y;

            let intersect = ((yi > transformedMouseY) != (yj > transformedMouseY))
                && (transformedMouseX < (xj - xi) * (transformedMouseY - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return this.rollover = inside;
  }

    show() {
      strokeWeight(this.strokeWeight);
      stroke(this.stroke.r, this.stroke.g, this.stroke.b);

      if (this.dragging) fill(50);
      else if (this.rollover) fill(100);
      else fill(this.fill.r, this.fill.g, this.fill.b);
      beginShape();
      this.points.forEach(p => vertex(p.x + this.x, p.y + this.y));
      endShape(CLOSE);
    }
}
