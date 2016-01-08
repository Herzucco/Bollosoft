var loadBitMaps = require('./bitmaps');
var loadTexts = require('./texts');
var loadTextures = require('./textures');
var loadSounds = require('./audio');

function preload(){
  loadBitMaps(window.game);
  loadTexts(window.game);
  loadTextures(window.game);
  loadSounds(window.game);
}

module.exports = preload;
