var EventEmitter = require('micro-events'); // require it

function loadEmitter(){
  var emitter = new EventEmitter();

  // Maximum number of listeners (used to prevent memory leaks and dumb code)
  // - defaults to 10
  emitter.maxListeners = 20;

  window.game.events = emitter;
}

module.exports = loadEmitter;
