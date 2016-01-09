var Layout = require('./layout');
var slideShow = require('./slideShow');
var rightBackground;
var bollo;
var guigui;
var stopDuration = 0;
var stopChrono = 0;
var peopleStoping;
var animRhythm = 0;
var cantStop = false;

function Couch(){
  	Layout.call(this);
 	this.enable();

 	rightBackground = game.add.sprite(960, 0, 'rightBackground');
 	rightBackground.sendToBack();

  	bollo = game.add.sprite(1200, 600, 'bolloSprite');
	bollo.animations.add('idleAnim', Phaser.Animation.generateFrameNames('idle', 1, 4, '.png', 1), 10, true, false);
	bollo.animations.add('talkingAnim', Phaser.Animation.generateFrameNames('talking', 1, 4, '.png', 1), 10, true, false);
	bollo.animations.play('idleAnim', 5, true);
	this.group.add(bollo);

	guigui = game.add.sprite(1500, 650, 'guiguiSprite');
	guigui.animations.add('idleAnim', Phaser.Animation.generateFrameNames('idle', 1, 4, '.png', 1), 10, true, false);
	guigui.animations.add('talkingAnim', Phaser.Animation.generateFrameNames('talking', 1, 4, '.png', 1), 10, true, false);
	guigui.animations.play('idleAnim', 5, true);
	this.group.add(guigui);

	var that = this;
	window.game.events.on('startTalking', function(peopleTalking){
    	that.startTalk(peopleTalking);
	});
	window.game.events.on('endTalking', function(peopleShutUp){
    	that.endTalk(peopleShutUp);
	});
	window.game.events.on('pauseTalking', function(peopleStop){
    	that.pauseTalk(peopleStop);
	});
}

var mapRange = function(from, to, s) {
  return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
};

Couch.prototype = Object.create(Layout.prototype);
Couch.prototype.constructor = Couch;
Couch.prototype.update = function CouchUpdate(game){
	Layout.prototype.update.call(this, game);
	stopChrono += 1/60;
	if (stopChrono >= stopDuration)
	{
		if ((peopleStoping != null)&&(cantStop == false))
		{
			peopleStoping.animations.play('talkingAnim', mapRange([0, 1], [10, 4], animRhythm), true);
		}
	}
}

Couch.prototype.startTalk = function StartTalkAnim(peopleTalking){
	//if (peopleTalking.noAnim == false)
	//{
		cantStop = false;
		animRhythm = peopleTalking.character.rythm;
		if (peopleTalking.name == "Bolloré")
		{
			bollo.animations.play('talkingAnim', mapRange([0, 1], [10, 4], peopleTalking.character.rythm), true);
			bollo.x = 1100;
		}
		else if (peopleTalking.name == "Guillemot")
		{
			guigui.animations.play('talkingAnim', mapRange([0, 1], [10, 4], peopleTalking.character.rythm), true);
		}
		else if (peopleTalking.name == "Robert Moulard")
		{
			slideShow.DevShadow.animations.play('moulard', mapRange([0, 1], [10, 4], peopleTalking.character.rythm), true);
		}
	//}
}

Couch.prototype.endTalk = function EndTalkAnim(peopleShutUp){
	cantStop = true;
	peopleStoping = null;
	if (peopleShutUp.name == "Bolloré")
	{
		bollo.animations.play('idleAnim', 5, true);
		bollo.x = 1200;
	}
	else if (peopleShutUp.name == "Guillemot")
	{
		guigui.animations.play('idleAnim', 5, true);
	}
	else if (peopleShutUp.name == "Robert Moulard")
	{
		slideShow.DevShadow.animations.stop(null, true);
	}
}

Couch.prototype.pauseTalk = function PauseTalkAnim(peopleStop){
	stopChrono = 0;
	stopDuration = peopleStop.duration;
	peopleStoping == peopleStop.name;

	if (peopleStop.name == "Bolloré")
	{
		peopleStoping = bollo;
		bollo.animations.stop(null, true);
	}
	else if (peopleStop.name == "Guillemot")
	{
		peopleStoping = guigui;
		guigui.animations.stop(null, true);
	}
	else if (peopleStop.name == "Robert Moulard")
	{
		peopleStoping = slideShow.DevShadow;
		slideShow.DevShadow.animations.stop(null, true);
	}
}

module.exports = Couch;
