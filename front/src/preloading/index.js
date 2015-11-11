var loadBitMaps = require('./bitmaps');
var loadTexts = require('./texts');

function preload(){
  loadBitMaps(window.game);
  loadTexts(window.game);
}

module.exports = preload;
