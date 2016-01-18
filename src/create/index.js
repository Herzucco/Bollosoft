var loadLayouts = require('./layouts-handler');
var loadEmitter = require('./emitter');

function create(){
	game.input.mouse.capture = true;
	
	//game.scale.offset = 0;
	//game.debug.inputInfo(16,16);

	//loadEmitter();
	loadLayouts();
}

module.exports = create;
