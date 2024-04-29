class App {
    constructor() {
        this.canvases = [];
        this.currentCanvasIndex = 0;
    }
    
    addCanvas(canvas) {
        this.canvases.push(canvas);
    }


    removeCanvas(canvasId) {
        const index = this.canvases.findIndex(c => c.id === canvasId);
        if (index !== -1) {
            this.canvases[index].stop(); // Stop the loop before removing
            this.canvases.splice(index, 1);
        }
    }

    showCanvas(index) {
        this.canvases[this.currentCanvasIndex].hide(); // Hide the current canvas
        this.canvases[index].show(); // Show the new canvas
        this.currentCanvasIndex = index; // Update the current canvas index
    }

    add_shape(
        shape
    ){
        this.canvases[this.currentCanvasIndex].add_shape(shape)
        this.canvases[this.currentCanvasIndex].show()
    }
    
}