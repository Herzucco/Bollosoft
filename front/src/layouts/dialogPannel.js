var Layout = require('./layout');

function DialogPannel(){
  Layout.call(this);
}

DialogPannel.prototype = Object.create(Layout.prototype);
DialogPannel.prototype.constructor = DialogPannel;

DialogPannel.prototype.update = function DialogPannelUpdate(game){
  Layout.prototype.update.call(this, game);
  console.log("dialog pannel");
}

module.exports = DialogPannel;
