var EventEmitter = require('micro-events'); // require it

function game(preload, create, loop){
  var g = new window.Phaser.Game(1920, 1080, Phaser.AUTO, 'Bolloqués', { preload: preload.preload, create: function create(){
    preload.load();
    loadEmitter();

	this.loadImg = g.add.sprite(400, 400, 'loading');
	this.loadImg.animations.add('loading', Phaser.Animation.generateFrameNames('chargement', 1, 4, '.png', 1), 10, true, false);
	this.loadImg.animations.play('loading', 1, true);
	//game.load.onLoadComplete.add(loadComplete, this);

    window.game.events.on('endLoading', function endLoading(){
      console.log("wesh");
      create();
    });
  }, render: loop });
  return g;
}


function loadEmitter(){
  var emitter = new EventEmitter();

  emitter.maxListeners = 30;

  window.game.events = emitter;
}

module.exports = game;
