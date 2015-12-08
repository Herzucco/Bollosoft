var Layout = require('./layout');
var rightBackground;

function Couch(){
  Layout.call(this);
  this.enable();

  rightBackground = game.add.sprite(960, 0, 'rightBackground');
  rightBackground.sendToBack();
}

Couch.prototype = Object.create(Layout.prototype);
Couch.prototype.constructor = Couch;
Couch.prototype.update = function CouchUpdate(game){
  Layout.prototype.update.call(this, game);
}

module.exports = Couch;
