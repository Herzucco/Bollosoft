var loadLayouts = require('./layouts-handler');

function create(){
	game.input.mouse.capture = true;

	//game.scale.offset = 0;
	//game.debug.inputInfo(16,16);

	loadLayouts();
}

module.exports = create;
