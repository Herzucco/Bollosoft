var Layout = require('./layout');
var roomBackground;

function Couch(){
  Layout.call(this);
  this.enable();

  roomBackground = game.add.sprite(0, 0, 'roomBackground');
  roomBackground.sendToBack();
}

Couch.prototype = Object.create(Layout.prototype);
Couch.prototype.constructor = Couch;
Couch.prototype.update = function CouchUpdate(game){
  Layout.prototype.update.call(this, game);
}

module.exports = Couch;
