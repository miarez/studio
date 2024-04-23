
class DraggableCustomShape extends Draggable {
    constructor(x, y, points, controls) {
      super(x, y);
      this.points = points;  // Array of p5.Vector
      this.controls = controls
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
      stroke(0);
      if (this.dragging) fill(50);
      else if (this.rollover) fill(100);
      else fill(175, 200);
      beginShape();
      this.points.forEach(p => vertex(p.x + this.x, p.y + this.y));
      endShape(CLOSE);
    }
}
