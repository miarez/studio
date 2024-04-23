
class DraggableCircle extends Draggable {
    constructor(x, y, r, controls) {
      super(x, y);
      this.r = r;  // radius
      this.controls = controls
    }

    over() {
      // Transform mouse coordinates based on the current view
      let transformedMouseX = (mouseX - this.controls.view.x) / this.controls.view.zoom;
      let transformedMouseY = (mouseY - this.controls.view.y) / this.controls.view.zoom;

      let d = dist(transformedMouseX, transformedMouseY, this.x, this.y);
      return this.rollover = d < this.r;
  }

    show() {
      stroke(0);
      if (this.dragging) fill(50);
      else if (this.rollover) fill(100);
      else fill(175, 200);
      ellipse(this.x, this.y, this.r * 2);
    }
}
