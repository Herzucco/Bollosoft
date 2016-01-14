var EventEmitter = require('micro-events'); // require it
var loadImg;
var g;
function game(preload, create, loop){
    g = new window.Phaser.Game(1920, 1080, Phaser.AUTO, 'Bolloqués', { preload: preload.preload, create: function c(){
      preload.load();
      loadEmitter(g);

    loadImg = g.add.sprite(400, 400, 'loading');
    loadImg.animations.add('loading', Phaser.Animation.generateFrameNames('chargement', 1, 4, '.png', 1), 10, true, false);
    loadImg.animations.play('loading', 1, true);

    g.load.onLoadComplete.add(loadComplete, this);

    g.scale.maxWidth = 1920;
    g.scale.maxHeight = 1080;
    g.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    g.events.on('endLoading', function endLoading(){
      create();
    });
    g.load.start();
  }, render: loop });
  return g;
}


function loadEmitter(g){
  var emitter = new EventEmitter();

  emitter.maxListeners = 30;

  g.events = emitter;
}

function loadComplete(){
  loadImg.destroy();

  g.events.emit('endLoading');
}

module.exports = game;
