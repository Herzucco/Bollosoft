var Layout = require('./layout');
var testAnim;

function GreugProtoPannel(){
	Layout.call(this);

	var waifu = window.game.add.sprite(0, 0, 'testFace', 'waifu.png');
	this.group.add(waifu);

	testAnim = window.game.add.sprite(10, 10, 'testFace', 'face/anim/1.png');
	testAnim.animations.add('change', Phaser.Animation.generateFrameNames('face/anim/', 1, 3, '.png', 1), 10, true, false);
	testAnim.animations.play('change');
	this.group.add(testAnim);
}

GreugProtoPannel.prototype = Object.create(Layout.prototype);
GreugProtoPannel.prototype.constructor = GreugProtoPannel;

GreugProtoPannel.prototype.update = function GreugProtoPannelUpdate(game){
	Layout.prototype.update.call(this, game);
}

module.exports = GreugProtoPannel;
