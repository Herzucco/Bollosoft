var loadBitMaps = require('./bitmaps');
var loadTexts = require('./texts');
var loadTextures = require('./textures');

function preload(){
  loadBitMaps(window.game);
  loadTexts(window.game);
  loadTextures(window.game);
}

module.exports = preload;
