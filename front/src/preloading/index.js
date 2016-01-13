var loadBitMaps = require('./bitmaps');
var loadTexts = require('./texts');
var loadTextures = require('./textures');
var loadSounds = require('./audio');
var pre = require('./pre-preloading');

function preload(){
  pre(window.game);
}

function load(){
  loadBitMaps(window.game);
  loadTexts(window.game);
  loadTextures(window.game);
  loadSounds(window.game);
}

module.exports = {
  preload: preload,
  load: load
};
