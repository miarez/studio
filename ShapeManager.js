

class ShapeManager {
    constructor() {
        this.shapes = []; // An array to store all draggable shapes
        this.activeShape = null; // Store the currently active shape
    }

    addShape(shape) {
        shape.name = 'shape-' + this.shapes.length
        this.shapes.push(shape); // Add a new shape to the list
    }

    handleOver() {
        this.shapes.forEach(shape => shape.over());
    }

    handleUpdate() {
        this.shapes.forEach(shape => shape.update());
    }

    handleShow() {
        this.shapes.forEach(shape => {
            shape.show();
            // Draw an additional border if this is the active shape
            if (this.activeShape === shape) {
                stroke(0, 0, 255);
                strokeWeight(2);
                if (shape instanceof Rectangle) {
                    rect(shape.x - 3, shape.y - 3, shape.w + 6, shape.h + 6);
                } else if (shape instanceof Circle) {
                    ellipse(shape.x, shape.y, shape.r * 2 + 6);
                } else if (shape instanceof Polygon) {
                    beginShape();
                    shape.points.forEach(p => vertex(p.x + shape.x, p.y + shape.y));
                    endShape(CLOSE);
                }
                noFill();
            }
        });
        strokeWeight(1); // Reset stroke weight for other drawing
        stroke(0); // Reset stroke color to black
    }

    handlePressed() {
        if(!this.clickedOnCanvas()) return
        let shapePressed = false;
        this.shapes.forEach(shape => {
            if (shape.over()) {
                this.activeShape = shape; // Set the active shape
                shapePressed = true;
            }
            shape.pressed();
        });
        if (!shapePressed && this.clickedOnCanvas()) {
            this.activeShape = null; // Unset active shape if canvas but not a shape was pressed
        }
    }
    
    clickedOnCanvas() {
        return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
    }

    handleReleased() {
        this.shapes.forEach(shape => shape.released());
    }
}
