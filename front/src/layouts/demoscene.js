var Layout = require('./layout');
var Pixelate = require('../filters/pixelate');
var tween;

function Demoscene(){
  Layout.call(this);

  var filter = new Pixelate(window.game);
  var currentStep = 0;
  var steps = [
    [10, 10, 10000],
    [300, 300, 10000],
    [10000, 10000, 10000],
  ];

  var that = this;
  window.game.events.on('pixel', function(){
    window.game.world.filters = [filter];

    tween = game.add.tween(filter);
    tween.to( { sizeX: steps[currentStep][0], sizeY: steps[currentStep][1]}, steps[currentStep][2], Phaser.Easing.Linear.None);
    tween.start();

    currentStep++;
    if(currentStep >= steps.length){
      currentStep = steps.length-1;
    }
  });

  window.game.events.on('stopPixel', function(){
    window.game.world.filters = [];
  });
}

Demoscene.prototype = Object.create(Layout.prototype);
Demoscene.prototype.constructor = Demoscene;
Demoscene.prototype.update = function DemosceneUpdate(game){
  Layout.prototype.update.call(this, game);
}

module.exports = Demoscene;
