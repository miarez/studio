class Canvas {
    constructor(id, w, h) {
        this.element;
        this.shapes     = [];
        this.id         = id;
        this.w          = w;
        this.h          = h;
        this.fill       = 100;

        this.sketch = new p5((s) => {
            s.setup = () => {
                s.createCanvas(this.w, this.h).parent(id);
                this.element = s.canvas;
            };
            s.render = () => {
                s.background(this.fill);
                this.shapes.forEach(shape => {
                    shape.show(s);
                });
            };
            s.mousePressed = () => {
                this.handleMousePressed(s);
            };
            s.mouseReleased = () => {
                this.handleMouseReleased();
            };
            s.mouseDragged = () => {
                this.handleMouseDragged(s);
            };
        }, id);
    }

    show() {
        this.element.style.display = 'block';
        this.sketch.render();
    }

    hide() {
        this.element.style.display = 'none';
    }

    add_shape(shape) {
        this.shapes.push(shape);
        return this;
    }

    handleMousePressed(s) {
        this.shapes.forEach(shape => shape.onMousePressed(s, s.mouseX, s.mouseY));
        this.sketch.render()
    }

    handleMouseReleased() {
        this.shapes.forEach(shape => shape.onMouseReleased());
        this.sketch.render()
    }

    handleMouseDragged(s) {
        this.shapes.forEach(shape => shape.onMouseDragged(s, s.mouseX, s.mouseY));
        this.sketch.render()
    }
}