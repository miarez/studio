class Draggable {
  constructor(x, y) {
    this.dragging = false;
    this.rollover = false;
    this.x = x;
    this.y = y;
    this.w = 50; // initial width
    this.h = 50; // initial height
    this.offsetX = 0;
    this.offsetY = 0;

    this.isBeingResized = false;
    this.initialWidth = 0;
    this.initialHeight = 0;
    this.minimumWidth = 5;
    this.minimumHeight = 5;
}


    // Method to detect if the mouse is over the shape
    over() {
      throw new Error('Method "over()" must be implemented');
    }

    // Update the position if being dragged
    update() {
      if (this.dragging) {
          this.x = mouseX + this.offsetX;
          this.y = mouseY + this.offsetY;
      } else if (this.isBeingResized) {
        let transformedMouseX = (mouseX - this.controls.view.x) / this.controls.view.zoom;
        let transformedMouseY = (mouseY - this.controls.view.y) / this.controls.view.zoom;
  
          // Calculate new dimensions based on initial dimensions and mouse movement
          this.w = Math.max(this.initialWidth + (transformedMouseX - (this.x + this.initialWidth)), this.minimumWidth);
          this.h = Math.max(this.initialHeight + (transformedMouseY - (this.y + this.initialHeight)), this.minimumHeight);
      }
  }

    // Show the shape (needs to be implemented in derived classes)
    show() {
      throw new Error('Method "show()" must be implemented');
    }

    pressed() {
      if (this.over()) {
          if (this.mouseIsOverResizeBox()) {
              this.isBeingResized = true;
              // Record initial dimensions when resize starts
              this.initialWidth = this.w;
              this.initialHeight = this.h;
          } else {
              this.dragging = true;
          }
          this.offsetX = this.x - mouseX;
          this.offsetY = this.y - mouseY;
      }
  }

    // Mouse released
    released() {
      this.dragging = false;
      this.isBeingResized = false
    }
}