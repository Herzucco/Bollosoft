var Layout = require('./layout');
var rightBackground;
var bollo;
var guigui;

function Couch(){
  	Layout.call(this);
 	this.enable();

 	rightBackground = game.add.sprite(960, 0, 'rightBackground');
 	rightBackground.sendToBack();

  	bollo = game.add.sprite(1200, 600, 'bolloSprite');
	bollo.animations.add('idleAnim', Phaser.Animation.generateFrameNames('idle', 1, 4, '.png', 1), 10, true, false);
	bollo.animations.add('talkingAnim', Phaser.Animation.generateFrameNames('talking', 1, 4, '.png', 1), 10, true, false);
	bollo.animations.play('idleAnim', 6, true);
	this.group.add(bollo);

	guigui = game.add.sprite(1500, 650, 'guiguiSprite');
	guigui.animations.add('idleAnim', Phaser.Animation.generateFrameNames('idle', 1, 4, '.png', 1), 10, true, false);
	guigui.animations.add('talkingAnim', Phaser.Animation.generateFrameNames('talking', 1, 4, '.png', 1), 10, true, false);
	guigui.animations.play('idleAnim', 6, true);
	this.group.add(guigui);

	var that = this;
	window.game.events.on('startTalking', function(peopleTalking){
    	that.startTalk(peopleTalking);
	});
	window.game.events.on('endTalking', function(peopleShutUp){
    	that.endTalk(peopleShutUp);
	});
}

Couch.prototype = Object.create(Layout.prototype);
Couch.prototype.constructor = Couch;
Couch.prototype.update = function CouchUpdate(game){
  Layout.prototype.update.call(this, game);
}

Couch.prototype.startTalk = function StartTalkAnim(peopleTalking){
	console.log("wesh " + peopleTalking.character.rythm);
	if (peopleTalking.name == "Bolloré")
	{
		guigui.animations.play('talkingAnim', 6, true);
	}
	if (peopleTalking.name == "Guillemot")
	{
		guigui.animations.play('talkingAnim', 6, true);
	}
}

Couch.prototype.endTalk = function EndTalkAnim(peopleShutUp){
	if (peopleShutUp.name == "Bolloré")
	{
		guigui.animations.play('idleAnim', 6, true);
	}
	if (peopleShutUp.name == "Guillemot")
	{
		guigui.animations.play('idleAnim', 6, true);
	}
}

module.exports = Couch;
