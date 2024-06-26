
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
  

  
    }
  
    listeners() {
      // Get the actual canvas DOM element
      const canvasElement = this.canvas.elt;

      canvasElement.addEventListener('mousedown', (e) => {
          if (this.currentMode === "hand") {
              this.controls.mousePressed(e);
          } else if (this.currentMode === "selection") {
              this.shapeManager.handlePressed();
              this.ui.updateShapeDetails();  // Update the shape details display
          }
          e.stopPropagation();  // Prevent event from propagating to other elements
      });

      canvasElement.addEventListener('mousemove', (e) => {
          if (this.currentMode === "hand") {
              this.controls.mouseDragged(e);
          }
      });

      canvasElement.addEventListener('mouseup', (e) => {
          if (this.currentMode === "hand") {
              this.controls.mouseReleased(e);
          } else if (this.currentMode === "selection") {
              this.shapeManager.handleReleased();
          }
      });

      canvasElement.addEventListener('wheel', (e) => {
          this.controls.zoom(e);
          e.preventDefault();  // Prevent scrolling the page when zooming on the canvas
      });
  }
  
    setup(){    
      this.canvas = window.createCanvas(this.mainElement.offsetWidth, this.mainElement.offsetHeight).parent("canvas");
      this.artboard = {x: window.width / 8, y: window.height / 8, w: window.width / 1.5, h: window.height / 1.5};  
      this.ui.updateShapeList();
      this.listeners()
    }
  
    
    add_rectangle(){
      this.shapeManager.addShape(new Rectangle(width/2, height/2, 100, 50, this.controls));
      this.ui.updateShapeList()
    }
    add_circle(){
      this.shapeManager.addShape(new Circle(width/2, height/2, 30, this.controls));
      this.ui.updateShapeList()      
    }
    add_polygon(){
      this.shapeManager.addShape(new Polygon(width/2, height/2, [
        new p5.Vector(50, 0),
        new p5.Vector(25, 43.3),
        new p5.Vector(-25, 43.3),
        new p5.Vector(-50, 0),
        new p5.Vector(-25, -43.3),
        new p5.Vector(25, -43.3)
      ], this.controls));
      this.ui.updateShapeList()      
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



    
    
    // load(){
    //   let name = prompt("Shape Name")
    //   let response = localStorage.getItem(name)
    //   this.shapeManager.shapes = response
    //   cs(response)
    //   cs('heereeeeee')
    // }

    // save(){

    //   cs(this.shapeManager.shapes)

    //   localStorage.setItem(name, this.shapeManager.shapes)

    // }
   save() {
      let name = prompt("Shape Name") 
      const serializedData = JSON.stringify(this.shapeManager.shapes, (key, value) => {
          if (key === "") return value; // Return the entire object if the key is empty (initial call).
          if (typeof value === "object" && value !== null) {
              return { ...value, _classType: value.constructor.name };
          }
          return value;
      });
      localStorage.setItem(name, serializedData);
   }
   
   load() {

    const data = localStorage.getItem(prompt("Shape Name"));
    if (!data) return null;

    this.shapeManager.shapes = JSON.parse(data, (key, value) => {
        if (value && typeof value === "object" && "_classType" in value) {
            switch (value._classType) {
                case "Rectangle":
                    return Object.assign(new Rectangle(), value);
                case "Circle":
                    return Object.assign(new Circle(), value);
                default:
                    return value;
            }
        }
        return value;
    });
}

  
  
  }
  