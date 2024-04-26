

class App2 {


    constructor(){
        this.canvases = []
    }

    add_canvas(
        canvas
    ){

    }

    remove_canvas(
        canvas_id
    ){

    }

}

var s1 = function( sketch ) {
    sketch.setup = function() {
      let canvas1 = sketch.createCanvas(100, 100, sketch.WEBGL);
      canvas1.position(0,0);
    }
    sketch.draw = function() {
      //for canvas 1
      sketch.background(100);
      sketch.rotateX(sketch.frameCount * 0.01);
      sketch.rotateZ(sketch.frameCount * 0.01);
      sketch.cone(30, 50);
    }
  };

class Canvas {

    constructor(
        id,
        w,
        h
    ){
        this.w = width
        this.h = height

        this.canvas_ui_element      = document.createElement('canvas')
        this.canvas_ui_element.id   = id

        this.x;
        this.y;
    }

}




