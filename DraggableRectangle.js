
class DraggableRectangle extends Draggable {
    constructor(x, y, w, h, controls) {
      super(x, y)
      this.w = w
      this.h = h
      this.controls = controls
      cs(this.controls)
    }

    over() {
      // Transform mouse coordinates based on the current view
      let transformedMouseX = (mouseX - this.controls.view.x) / this.controls.view.zoom;
      let transformedMouseY = (mouseY - this.controls.view.y) / this.controls.view.zoom;

      return this.rollover = transformedMouseX > this.x && transformedMouseX < this.x + this.w && transformedMouseY > this.y && transformedMouseY < this.y + this.h;
    }

    show() {
      stroke(0);
      if (this.dragging) fill(50);
      else if (this.rollover) fill(100);
      else fill(175, 200);
      rect(this.x, this.y, this.w, this.h);
    }
}

