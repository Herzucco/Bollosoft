function loop(){
  if(window.game.layouts !== undefined){
    var i = 0
    for(i; i < window.game.layouts.length; i++){
      window.game.layouts[i].update(window.game);
    }
  }
}

module.exports = loop;
