var EventEmitter = require('micro-events'); // require it

function loadEmitter(){
  var emitter = new EventEmitter();

  emitter.maxListeners = 20;

  window.game.events = emitter;
}

module.exports = loadEmitter;
