var Layout = require('./layout');
var devShadow;
var devAnim;
//var wobbling;
var slideBack;

function SlideShow(){
  Layout.call(this);
  this.enable();

  game.stage.backgroundColor = "#595858";
  devShadow = game.add.sprite(-250, 200, 'proto', 'proto/devShadow.png');
  devAnim = game.add.tween(devShadow);
  devAnim.to({x:400}, 200, Phaser.Easing.Linear.None);
  //devAnim.onComplete.add();
  devAnim.start();
  this.group.add(devShadow);

  slideBack = game.add.sprite(0, 200, 'proto', 'proto/PurpleBubble.png');
}

SlideShow.prototype = Object.create(Layout.prototype);
SlideShow.prototype.constructor = SlideShow;
SlideShow.prototype.update = function SlideShowUpdate(game){
  Layout.prototype.update.call(this, game);
  //wobbling = Math.sin(game.time.now) * 20;
  //devShadow.y = wobbling;
}

module.exports = SlideShow;
