

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
            if (this.activeShape === shape) {
                shape.outline()
            }
        });
    }

    handlePressed() {

        let shapePressed = false;
        this.shapes.forEach(shape => {
            if (shape.over()) {
                this.activeShape = shape; // Set the active shape
                shapePressed = true;
            }
            shape.pressed();
        });
        if (!shapePressed) {
            this.activeShape = null; // Unset active shape if canvas but not a shape was pressed
        }
    }
    
    handleReleased() {
        this.shapes.forEach(shape => shape.released());
    }
}
