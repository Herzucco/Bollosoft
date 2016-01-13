var EventEmitter = require('micro-events'); // require it

function game(preload, create, loop){
  var g = new window.Phaser.Game(1920, 1080, Phaser.AUTO, 'Bolloqués', { preload: preload.preload, create: function(){
    preload.load();
    loadEmitter();

    window.game.events.on('endLoading', function endLoading(){
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
