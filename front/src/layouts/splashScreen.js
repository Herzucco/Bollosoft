var Layout = require('./layout');

function SplashScreen(){
  Layout.call(this);

  this.currentDuration = 0;
  this.duration = 2;

  this.sprite = game.add.sprite(window.game.world.centerX, window.game.world.centerY, 'splashScreen');
  this.sprite.anchor.set(0.5, 0.5);

  this.sound = window.game.add.audio('splashScreen');

  this.group.add(this.sprite);
  var that = this;
  window.game.events.on('startSplashScreen', function(){
    that.sound.play();
    that.enable();
  });
}

SplashScreen.prototype = Object.create(Layout.prototype);
SplashScreen.prototype.constructor = SplashScreen;
SplashScreen.prototype.update = function SplashScreenUpdate(game){
  Layout.prototype.update.call(this, game);

  this.currentDuration += 1/60;
  if(this.currentDuration >= this.duration){
    this.currentDuration = 0;
    this.disable();
    window.game.events.emit('endSplashScreen');
  }
}

module.exports = SplashScreen;
