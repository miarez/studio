class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dragging = false;
        this.dragOffsetX = 0;
        this.dragOffsetY = 0;
    }

    // Method to check if a point is within the shape
    contains(px, py) {
        // This method should be overridden by subclasses
    }

    // Start dragging the shape
    onMousePressed(s, mouseX, mouseY) {
        if (this.contains(mouseX, mouseY)) {
            this.dragging = true;
            this.dragOffsetX = this.x - mouseX;
            this.dragOffsetY = this.y - mouseY;
        }
    }

    // Stop dragging the shape
    onMouseReleased() {
        this.dragging = false;
    }

    // Update the shape's position if dragging
    onMouseDragged(s, mouseX, mouseY) {
        if (this.dragging) {
            this.x = mouseX + this.dragOffsetX;
            this.y = mouseY + this.dragOffsetY;
        }
        this.show(s); // Redraw the shape at new position
    }
}