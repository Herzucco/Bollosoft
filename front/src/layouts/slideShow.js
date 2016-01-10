var Layout = require('./layout');
var leftBackground;
var canap;
var devShadow;
var devAnim;
var slideBack;
var slideSound;
var projectorSound;
var doorSound;

function SlideShow(){
	Layout.call(this);
	this.enable();

	leftBackground = game.add.sprite(0, 0, 'leftBackground');
	leftBackground.sendToBack();
	canap = game.add.sprite(0, 800, 'canap');

	devShadow = game.add.sprite(-500, 500, 'devsSprite');
	devShadow.animations.add('black', Phaser.Animation.generateFrameNames('black', 1, 3, '.png', 1), 10, true, false);
	devShadow.animations.add('breton', Phaser.Animation.generateFrameNames('breton', 1, 3, '.png', 1), 10, true, false);
	devShadow.animations.add('iwata', Phaser.Animation.generateFrameNames('iwata', 1, 3, '.png', 1), 10, true, false);
	devShadow.animations.add('kojima', Phaser.Animation.generateFrameNames('kojima', 1, 3, '.png', 1), 10, true, false);
	devShadow.animations.add('moulard', Phaser.Animation.generateFrameNames('moulard', 1, 3, '.png', 1), 10, true, false);
	devShadow.animations.add('étudiante', Phaser.Animation.generateFrameNames('étudiante', 1, 3, '.png', 1), 10, true, false);
	devShadow.animations.play('black', 5, true);
	devShadow.animations.stop(null, true);
	devAnim = game.add.tween(devShadow);


	this.group.add(devShadow);
	module.exports.DevShadow = devShadow;

	var that = this;
	window.game.events.on('slide', function(slideStart){
    	that.slide(slideStart);
	});
	window.game.events.on('presentator', function(presStart){
    	that.startPres(presStart);
	});
	window.game.events.on('endDay', function(presEnd){
    	that.endPres(presEnd);
	});

	slideBack = game.add.sprite(44, 50, 'proto', 'protoGreug/1.png');
	slideBack.width = 0;
	slideBack.height = 0;

	slideSound = window.game.add.audio('slide');
	doorSound = window.game.add.audio('door');
	projectorSound = window.game.add.audio('projecteur');
	projectorSound.loop = true;

	this.group.add(slideBack);
}

SlideShow.prototype = Object.create(Layout.prototype);
SlideShow.prototype.constructor = SlideShow;
SlideShow.prototype.update = function SlideShowUpdate(game){
	Layout.prototype.update.call(this, game);
	if(this.shadow != undefined && this.shadow.alpha > 0){
		this.shadow.alpha -= 0.02;
	}
}


SlideShow.prototype.slide = function SlideStarting(slideStart){
	slideSound.play();
	projectorSound.play();
	slideBack.loadTexture(slideStart, 0);
	slideBack.width = 833;
	slideBack.height = 624;
	slideBack.z = 0;
	this.group.sort('z', Phaser.Group.SORT_ASCENDING);
}

SlideShow.prototype.startPres = function PresentatorComing(presStart){
	doorSound.play();

	devShadow.animations.play(presStart, 5, true);
	devShadow.animations.stop(null, true);

	this.shadow = game.add.sprite(-500, 500, presStart);
  this.shadow.tint = 0x000000;
  this.shadow.alpha = 1;

	var shadowAnim = game.add.tween(this.shadow);
	shadowAnim.to({x:50}, 400, Phaser.Easing.Linear.None);
	shadowAnim.start();

	devAnim.to({x:50}, 400, Phaser.Easing.Linear.None);
	devAnim.start();

	devShadow.z = 1;
	this.group.sort('z', Phaser.Group.SORT_ASCENDING);
}

SlideShow.prototype.endPres = function PresentationEnding(presEnd){
	devAnim.to({x:-500}, 400, Phaser.Easing.Linear.None);
	devAnim.start();
	slideBack.width = 0;
	slideBack.height = 0;

	projectorSound.stop();
}

module.exports = SlideShow;
