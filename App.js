
class App {

    constructor(){
      
      this.currentMode = "selection"
      this.canvas
      this.artboard;
  
      this.controls = new Controls()
      this.exporter = new Exporter()
      
      this.shapeManager = new ShapeManager();
      this.ui = new UIManager(this.shapeManager)
  
      this.mainElement = document.querySelector(".main");
  
      this.listeners()
  
    }
  
    listeners(){
      
      window.mousePressed = function(e) {
  
        if (app.currentMode === "hand") {
          app.controls.mousePressed(e);
        } else if (app.currentMode === "selection") {
          app.shapeManager.handlePressed();
          app.ui.updateShapeDetails();  // Update the shape details display
        }
      };
  
      window.mouseDragged = function(e) {
        if (app.currentMode === "hand") {
          app.controls.mouseDragged(e);
        }
      };
  
      window.mouseReleased = function(e) {
        if (app.currentMode === "hand") {
          app.controls.mouseReleased(e);
        } else if (app.currentMode === "selection") {
          app.shapeManager.handleReleased();
        }
      };
  
      window.mouseWheel = function(e) {
        // if (currentMode === "hand") {
          app.controls.zoom(e)
        // }
      };
  
    }
  
    setup(){
      
      // this.shapeManager = new ShapeManager();
      this.canvas = window.createCanvas(this.mainElement.offsetWidth, this.mainElement.offsetHeight).parent("canvas");
      this.artboard = {x: window.width / 8, y: window.height / 8, w: window.width / 1.5, h: window.height / 1.5};  
      this.ui.updateShapeList();
    }
  
    
    add_rectangle(){
      this.shapeManager.addShape(new DraggableRectangle(width/2, height/2, 100, 50, this.controls));
    }
    add_circle(){
      this.shapeManager.addShape(new DraggableCircle(width/2, height/2, 30, this.controls));
    }
    add_polygon(){
      this.shapeManager.addShape(new DraggableCustomShape(width/2, height/2, [
        new p5.Vector(50, 0),
        new p5.Vector(25, 43.3),
        new p5.Vector(-25, 43.3),
        new p5.Vector(-50, 0),
        new p5.Vector(-25, -43.3),
        new p5.Vector(25, -43.3)
      ], this.controls));
    }
  
    draw(){
      window.background(100);
  
      window.translate(this.controls.view.x, this.controls.view.y);
      window.scale(this.controls.view.zoom);
  
      window.fill(255);
      window.rect(this.artboard.x, this.artboard.y, this.artboard.w, this.artboard.h);
  
      // to layers are in the wrong order...
      this.shapeManager.handleOver();
      this.shapeManager.handleUpdate();
      this.shapeManager.handleShow();
    }
  
  }
  