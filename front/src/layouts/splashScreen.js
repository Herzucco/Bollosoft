var Layout = require('./layout');

function SplashScreen(){
  Layout.call(this);

  this.currentIdleDuration = 0;
  this.idleDuration = 1;
  this.idle = true;

  this.currentTitleDuration = 0;
  this.titleDuration = 2;

  this.idleS = game.add.sprite(window.game.world.centerX, window.game.world.centerY, 'opacityCalq');
  this.idleS.anchor.set(0.5, 0.5);
  this.idleS.scale.set(30, 30);
  this.idleS.tint = 0x000000;

  this.sprite = game.add.sprite(window.game.world.centerX, window.game.world.centerY, 'splashScreen');
  this.sprite.anchor.set(0.5, 0.5);
  this.sprite.visible = false;

  this.door = window.game.add.audio('door');
  this.sound = window.game.add.audio('splashScreen');

  this.group.add(this.idleS);
  this.group.add(this.sprite);

  var that = this;
  window.game.events.on('startSplashScreen', function(){
    that.door.play();
    that.enable();
  });
}

SplashScreen.prototype = Object.create(Layout.prototype);
SplashScreen.prototype.constructor = SplashScreen;
SplashScreen.prototype.update = function SplashScreenUpdate(game){
  Layout.prototype.update.call(this, game);

  this.currentIdleDuration += 1/60;
  if(this.currentIdleDuration >= this.idleDuration){
    if(this.idle){
      this.sound.play();
    }

    this.idle = false;
    this.sprite.visible = true;
    this.currentTitleDuration += 1/60;
    if(this.currentTitleDuration >= this.titleDuration){
      this.currentTitleDuration = 0;
      this.currentIdleDuration = 0;
      this.idle = false;

      this.disable();
      window.game.events.emit('endSplashScreen');
    }
  }
}

module.exports = SplashScreen;
