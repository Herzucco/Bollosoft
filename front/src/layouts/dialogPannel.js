var Layout = require('./layout');
var Dialog = require('../dialogs/Dialog');

function DialogPannel(){
  Layout.call(this);

  this.dialog = new Dialog(this.group);
  this.dialog.load(window.game.texts['Prince Of Tunis']);

  this.enable();
}

DialogPannel.prototype = Object.create(Layout.prototype);
DialogPannel.prototype.constructor = DialogPannel;

DialogPannel.prototype.update = function DialogPannelUpdate(game){
  Layout.prototype.update.call(this, game);

  this.dialog.update();
}

module.exports = DialogPannel;
