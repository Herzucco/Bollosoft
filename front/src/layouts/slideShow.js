var Layout = require('./layout');
var leftBackground;
var canap;
var devShadow;
var devAnim;
var slideBack;

function SlideShow(){
	Layout.call(this);
	this.enable();

	leftBackground = game.add.sprite(0, 0, 'leftBackground');
	leftBackground.sendToBack();
	canap = game.add.sprite(0, 800, 'canap');

	devShadow = game.add.sprite(-250, 500, 'proto', 'proto/devShadow.png');
	devAnim = game.add.tween(devShadow);
	this.group.add(devShadow);

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
	this.group.add(slideBack);
}

SlideShow.prototype = Object.create(Layout.prototype);
SlideShow.prototype.constructor = SlideShow;
SlideShow.prototype.update = function SlideShowUpdate(game){
	Layout.prototype.update.call(this, game);
}


SlideShow.prototype.slide = function SlideStarting(slideStart){
	slideBack.loadTexture('testFace', 0);
	slideBack.width = 833;
	slideBack.height = 624;
	slideBack.z = 0;
	this.group.sort('z', Phaser.Group.SORT_ASCENDING);
}

SlideShow.prototype.startPres = function PresentatorComing(presStart){
	devAnim.to({x:50}, 200, Phaser.Easing.Linear.None);
	devAnim.start();
	devShadow.z = 1;
	this.group.sort('z', Phaser.Group.SORT_ASCENDING);
}

SlideShow.prototype.endPres = function PresentationEnding(presEnd){
	devAnim.to({x:-250}, 200, Phaser.Easing.Linear.None);
	devAnim.start();
	slideBack.width = 0;
	slideBack.height = 0;
}

module.exports = SlideShow;
