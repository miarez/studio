class Controls {

    constructor(){
        this.view     = {x: 0, y: 0, zoom: 1}
        this.viewPos  = {prevX: null, prevY: null, isDragging: false}
        this.minZoom  = 0
        this.maxZoom  = 2
    }


    mousePressed(e) {
        cs(this)
        this.viewPos.isDragging = true;
        this.viewPos.prevX = e.clientX;
        this.viewPos.prevY = e.clientY;
      }

  
    mouseDragged(e) {
      const {prevX, prevY, isDragging} = this.viewPos;
      if (!isDragging) return;

      const pos = {x: e.clientX, y: e.clientY};
      const dx = pos.x - prevX;
      const dy = pos.y - prevY;

      if (prevX || prevY) {
        this.view.x += dx;
        this.view.y += dy;
        this.viewPos.prevX = pos.x;
        this.viewPos.prevY = pos.y;
      }
    }

    mouseReleased(e) {
      this.viewPos.isDragging = false;
      this.viewPos.prevX = null;
      this.viewPos.prevY = null;
    }
  
    zoom(e) {
        const {x, y, deltaY} = e;
        const direction = deltaY > 0 ? -1 : 1;
        const factor = 0.05;
        const zoom = direction * factor;
  
        const wx = (x - this.view.x) / (width * this.view.zoom);
        const wy = (y - this.view.y) / (height * this.view.zoom);
  
        if ((this.view.zoom + zoom >= this.minZoom) && (this.view.zoom + zoom <= this.maxZoom)) {
          this.view.x -= wx * width * zoom;
          this.view.y -= wy * height * zoom;
          this.view.zoom += zoom;
        }
      }

      reset(){
        this.view.zoom = 1;
        this.view.x = 0;
        this.view.y = 0;  
    }
    
  }