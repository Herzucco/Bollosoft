var loadLayouts = require('./layouts-handler');
var testAnim;

function create(){
	game.add.sprite(0, 0, 'testFace', 'waifu.png');
	testAnim = game.add.sprite(10, 10, 'testFace', 'face/anim/1.png');
	testAnim.animations.add('change', Phaser.Animation.generateFrameNames('face/anim/', 1, 3, '.png', 1), 10, true, false);
	testAnim.animations.play('change');

	game.scale.maxWidth = 1920;
	game.scale.maxHeight = 1080;
	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.offset = 0;
	game.debug.inputInfo(16,16);

	loadLayouts();
}

module.exports = create;
