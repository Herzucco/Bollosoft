var Layout = require('./layout');

function Credits(){
  Layout.call(this);

  this.mode = 'saison';
  this.count = 5;
  this.currentCount = 0;

  this.door = window.game.add.audio('door');

  this.saison = game.add.sprite(window.game.world.centerX, window.game.world.centerY, 'saison');
  this.saison.anchor.set(0.5, 0.5);

  this.credits = game.add.sprite(window.game.world.centerX, window.game.world.centerY, 'credits');
  this.credits.anchor.set(0.5, 0.5);

  this.cinqyou = game.add.sprite(window.game.world.centerX, window.game.world.centerY, 'cinqyou');
  this.cinqyou.anchor.set(0.5, 0.5);

  this.group.add(this.cinqyou);
  this.group.add(this.credits);
  this.group.add(this.saison);

  var that = this;
  window.game.events.on('credits', function(){
    that.enable();

    that.door.play();
  });
}

Credits.prototype = Object.create(Layout.prototype);
Credits.prototype.constructor = Credits;
Credits.prototype.update = function CreditsUpdate(game){
  Layout.prototype.update.call(this, game);

  this.currentCount += 1/60;
  if(this.currentCount >= this.count){
    this.currentCount = 0;
    if(this.mode === 'saison'){
      this.mode = 'credits';
      this.saison.visible = false;
    }else if(this.mode === 'credits'){
      this.mode = 'cinqyou';
      this.credits.visible = false;
    }
  }
}

module.exports = Credits;
