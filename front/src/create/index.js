var testAnim;

function create(){
	game.add.sprite(0, 0, 'testFace', 'waifu.png');
	testAnim = game.add.sprite(10, 10, 'testFace', 'face/anim/1.png');
	testAnim.animations.add('change', Phaser.Animation.generateFrameNames('face/anim/', 1, 3, '.png', 1), 10, true, false);
	testAnim.animations.play('change');
}

module.exports = create;
