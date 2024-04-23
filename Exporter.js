class Exporter {

    png(){
      let art = get(artboard.x, artboard.y, artboard.w, artboard.h)
      save(art, 'myCanvas', 'png')
    }
  
    svg(){
      window.save("mySVG.svg")
    }
    
  }
  