class Draggable {
    constructor(x, y) {
      this.dragging = false; // Is the object being dragged?
      this.rollover = false; // Is the mouse over the object?
      this.x = x;
      this.y = y;
      this.offsetX = 0;
      this.offsetY = 0;

      this.isBeingResized = false
      this.minimumWidth   = 5
      this.minimumHeight  = 5
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
      } else if(this.isBeingResized){
        this.w = Math.max(this.minimumWidth, mouseX + this.offsetX);
        this.h = Math.max(this.minimumHeight, mouseY + this.offsetY);
      }
    }

    // Show the shape (needs to be implemented in derived classes)
    show() {
      throw new Error('Method "show()" must be implemented');
    }

    // Mouse pressed on the shape
    pressed() {
      if (this.over()) {

        if(this.mouseIsOverResizeBox()){
          this.isBeingResized = true
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