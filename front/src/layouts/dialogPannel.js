var Layout = require('./layout');
var Dialog = require('../dialogs/Dialog');

function DialogPannel(){
  Layout.call(this);

  this.dialog = new Dialog(this.group);
  this.dialog.load(window.game.texts['Prince Of Tunis']);

  var that = this;
  window.game.events.on('choiceEnd', function(choice){
    that.final(choice);
  });

  this.enable();
}

DialogPannel.prototype = Object.create(Layout.prototype);
DialogPannel.prototype.constructor = DialogPannel;

DialogPannel.prototype.update = function DialogPannelUpdate(game){
  Layout.prototype.update.call(this, game);

  this.dialog.update();
}

DialogPannel.prototype.final = function DialogPannelFinal(choice){
  this.dialog.loadChoice(choice);
}

DialogPannel.prototype.next = function DialogPannelNext(){
  this.dialog.loadChoice(choice);
}

module.exports = DialogPannel;
