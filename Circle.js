class Circle extends Draggable {
    constructor(x, y, r, controls, name = null) {
      super(x, y);
      this.name = name
      this.r = r;  // radius
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

      let d = dist(transformedMouseX, transformedMouseY, this.x, this.y);
      return this.rollover = d < this.r;
   }

    show() {
      strokeWeight(this.strokeWeight);
      stroke(this.stroke.r, this.stroke.g, this.stroke.b);

      if (this.dragging) fill(50);
      else if (this.rollover) fill(100);
      else fill(this.fill.r, this.fill.g, this.fill.b);
      ellipse(this.x, this.y, this.r * 2);
    }

    outline(){
      stroke(0, 0, 255);
      strokeWeight(2);
      ellipse(this.x, this.y, this.r * 2 + 6);
      noFill();
    }

}
