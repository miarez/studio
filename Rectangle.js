
class Rectangle extends Draggable {
    constructor(x, y, w, h, controls, name = null) {
      super(x, y)
      this.name = name
      this.w = w
      this.h = h
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

      return this.rollover = transformedMouseX > this.x && transformedMouseX < this.x + this.w && transformedMouseY > this.y && transformedMouseY < this.y + this.h;
    }

    show() {



      strokeWeight(this.strokeWeight);
      stroke(this.stroke.r, this.stroke.g, this.stroke.b);
      
      if (this.dragging) fill(50);
      else if (this.rollover) fill(100);
      else fill(this.fill.r, this.fill.g, this.fill.b);
      rect(this.x, this.y, this.w, this.h);

      rotate(0);
    }


    // shit show....
    show_rotated(){
      // Translate to the center of the rectangle
      translate(this.x + this.w / 2, this.y + this.h / 2);
      
      // Apply rotation
      rotate(this.rotationAngle); // this.rotationAngle should be defined in your class

      // Draw the rectangle centered on the new origin
      // rectMode(CENTER);
      rect(0, 0, this.w, this.h);
      
      // Reset translation and rotation
      // resetMatrix(); // Resets the transformation matrix for subsequent drawings
      translate(0, 0)
      rotate(0)
    }

    
}

