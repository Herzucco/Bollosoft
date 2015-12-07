var Layout = require('./layout');
var testAnim;

function GreugProtoPannel(){
	Layout.call(this);

	var waifu = window.game.add.sprite(0, 0, 'proto', 'protoGreug/1401040760248.png');
	this.group.add(waifu);

	testAnim = window.game.add.sprite(10, 10, 'proto', 'protoGreug/1.png');
	testAnim.animations.add('change', Phaser.Animation.generateFrameNames('protoGreug/', 1, 3, '.png', 1), 10, true, false);
	testAnim.animations.play('change');
	this.group.add(testAnim);
}

GreugProtoPannel.prototype = Object.create(Layout.prototype);
GreugProtoPannel.prototype.constructor = GreugProtoPannel;

GreugProtoPannel.prototype.update = function GreugProtoPannelUpdate(game){
	Layout.prototype.update.call(this, game);
}

module.exports = GreugProtoPannel;
