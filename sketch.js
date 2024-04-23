

//########################


const cs = console.log;

let  currentMode = "selection"
let canvas, artboard;

const controls = new Controls()
const exporter = new Exporter()


window.mousePressed = function(e) {

    if (currentMode === "hand") {
      controls.mousePressed(e);
    } else if (currentMode === "selection") {
        shapeManager.handlePressed();
        ui.updateShapeDetails();  // Update the shape details display
    }
};
  
  window.mouseDragged = function(e) {
    if (currentMode === "hand") {
      controls.mouseDragged(e);
    }
};
  
  window.mouseReleased = function(e) {
    if (currentMode === "hand") {
      controls.mouseReleased(e);
    } else if (currentMode === "selection") {
        shapeManager.handleReleased();
    }
};

  window.mouseWheel = function(e) {
    if (currentMode === "hand") {
      controls.zoom(e)
    }
};




let shapeManager;

let ui = new UIManager()

function setup() {

    let mainElement = document.querySelector(".main");
    canvas = createCanvas(mainElement.offsetWidth, mainElement.offsetHeight).parent("canvas");

    artboard = {x: width / 8, y: height / 8, w: width / 1.5, h: height / 1.5};
  
    shapeManager = new ShapeManager();

    shapeManager.addShape(new DraggableRectangle(width/2, height/2, 100, 50, controls));
    shapeManager.addShape(new DraggableCircle(width/2, height/2, 30, controls));
    shapeManager.addShape(new DraggableCustomShape(width/2, height/2, [
        new p5.Vector(50, 0),
        new p5.Vector(25, 43.3),
        new p5.Vector(-25, 43.3),
        new p5.Vector(-50, 0),
        new p5.Vector(-25, -43.3),
        new p5.Vector(25, -43.3)
    ], controls));

    ui.updateShapeList();
}

function draw() {
    background(100);

    translate(controls.view.x, controls.view.y);
    scale(controls.view.zoom);

    fill(255);
    rect(artboard.x, artboard.y, artboard.w, artboard.h);

    // to layers are in the wrong order...
    shapeManager.handleOver();
    shapeManager.handleUpdate();
    shapeManager.handleShow();

}