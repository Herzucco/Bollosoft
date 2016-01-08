var Layout = require('./layout');
var rightBackground;
var bollo;
var guigui;

function Couch(){
  	Layout.call(this);
 	this.enable();

 	rightBackground = game.add.sprite(960, 0, 'rightBackground');
 	rightBackground.sendToBack();

  	bollo = game.add.sprite(1500, 600, 'bolloSprite');
	bollo.animations.add('idleAnim', Phaser.Animation.generateFrameNames('idle', 1, 4, '.png', 1), 10, true, false);
	bollo.animations.add('talkingAnim', Phaser.Animation.generateFrameNames('talking', 1, 4, '.png', 1), 10, true, false);
	bollo.animations.play('idleAnim', 6, true);
	this.group.add(bollo);

	guigui = game.add.sprite(1200, 650, 'guiguiSprite');
	guigui.animations.add('idleAnim', Phaser.Animation.generateFrameNames('idle', 1, 4, '.png', 1), 10, true, false);
	guigui.animations.add('talkingAnim', Phaser.Animation.generateFrameNames('talking', 1, 4, '.png', 1), 10, true, false);
	guigui.animations.play('idleAnim', 6, true);
	this.group.add(guigui);
}

Couch.prototype = Object.create(Layout.prototype);
Couch.prototype.constructor = Couch;
Couch.prototype.update = function CouchUpdate(game){
  Layout.prototype.update.call(this, game);
}

module.exports = Couch;
