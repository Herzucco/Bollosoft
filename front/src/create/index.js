var loadLayouts = require('./layouts-handler');
var loadEmitter = require('./emitter');

function create(){
	game.input.mouse.capture = true;

	game.scale.maxWidth = 1920;
	game.scale.maxHeight = 1080;
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	//game.scale.offset = 0;
	//game.debug.inputInfo(16,16);

	loadEmitter();
	loadLayouts();
}

module.exports = create;
