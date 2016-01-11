var Layout = require('./layout');

function Credits(){
  Layout.call(this);

  this.sprite = game.add.sprite(window.game.world.centerX, window.game.world.centerY, 'credits');
  this.sprite.anchor.set(0.5, 0.5);

  this.group.add(this.sprite);
  var that = this;
  window.game.events.on('credits', function(){
    that.enable();
  });
}

Credits.prototype = Object.create(Layout.prototype);
Credits.prototype.constructor = Credits;
Credits.prototype.update = function CreditsUpdate(game){
  Layout.prototype.update.call(this, game);
}

module.exports = Credits;
