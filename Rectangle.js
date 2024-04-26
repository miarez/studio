
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
      this.active = false
      this.resizeHandleSize = 15;

    }

    over() {
      // Transform mouse coordinates based on the current view
      let transformedMouseX = (mouseX - this.controls.view.x) / this.controls.view.zoom;
      let transformedMouseY = (mouseY - this.controls.view.y) / this.controls.view.zoom;

      return this.rollover = transformedMouseX > this.x && transformedMouseX < this.x + this.w && transformedMouseY > this.y && transformedMouseY < this.y + this.h;
    }



    outline(){
      stroke(0, 0, 255);
      strokeWeight(2);
      rect(this.x - 3, this.y - 3, this.w + 6, this.h + 6);
      noFill();
    }

    outline_over(){
      stroke(0, 255, 0);
      strokeWeight(2);
      rect(this.x - 3, this.y - 3, this.w + 6, this.h + 6);
      noFill();
    }

    show() {

      strokeWeight(this.strokeWeight);
      stroke(this.stroke.r, this.stroke.g, this.stroke.b);
     

      if(this.active){
        this.outline()
        this.render_resize_handle()
      }
      else if (this.rollover) {
        this.outline_over()
        this.render_resize_handle()
      }
      else {
        fill(this.fill.r, this.fill.g, this.fill.b);
        rect(this.x, this.y, this.w, this.h);        
      }


    }

    mouseIsOverResizeBox() {
      let transformedMouseX = (mouseX - this.controls.view.x) / this.controls.view.zoom;
      let transformedMouseY = (mouseY - this.controls.view.y) / this.controls.view.zoom;

      return (
        transformedMouseX > this.x+this.w-this.resizeHandleSize 
          && 
        transformedMouseY >this.y+this.h-this.resizeHandleSize 
          && 
        transformedMouseX < this.x+this.w 
          && 
        transformedMouseY < this.y + this.h
      );
    }



    render_resize_handle(){
      var handleX1 = this.x+this.w-this.resizeHandleSize;
      var handleY1 = this.y+this.h-this.resizeHandleSize;
      var handleX2 = this.x + this.w;
      var handleY2 = this.y + this.h;
      noStroke();
      fill('grey');
      beginShape();
      vertex(handleX1, handleY1 + this.resizeHandleSize);
      vertex(handleX2, handleY1);
      vertex(handleX2, handleY2);
      endShape(CLOSE);
      stroke('black');
      line(handleX1, handleY1 + this.resizeHandleSize, handleX2, handleY1);
      line(handleX1+5, handleY1 + this.resizeHandleSize, handleX2, handleY1+5);
      line(handleX1+10, handleY1 + this.resizeHandleSize, handleX2, handleY1+10);
    }


    // shit show....
    show_rotated(){

      this.rotationAngle = 45

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

