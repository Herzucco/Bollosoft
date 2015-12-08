var Layout = require('./layout');
var devShadow;
var devAnim;
var slideBack;

function SlideShow(){
	Layout.call(this);
	this.enable();

	game.stage.backgroundColor = "#595858";
	devShadow = game.add.sprite(-250, 200, 'proto', 'proto/devShadow.png');
	devAnim = game.add.tween(devShadow);
	devAnim.to({x:400}, 200, Phaser.Easing.Linear.None);
	
	this.group.add(devShadow);

	var that = this;
	window.game.events.on('slide', function(slideStart){
    	that.slide(slideStart);
	});

	slideBack = game.add.sprite(44, 50, 'proto', 'protoGreug/1.png');
	slideBack.width = 0;
	slideBack.height = 0;
}

SlideShow.prototype = Object.create(Layout.prototype);
SlideShow.prototype.constructor = SlideShow;
SlideShow.prototype.update = function SlideShowUpdate(game){
	Layout.prototype.update.call(this, game);
}


SlideShow.prototype.slide = function SlideStarting(slideStart){
	devAnim.start();
	slideBack.loadTexture('protoBackground', 0);
	slideBack.width = 833;
	slideBack.height = 624;
}

module.exports = SlideShow;
