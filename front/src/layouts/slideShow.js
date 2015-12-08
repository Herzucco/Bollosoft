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
	window.game.events.on('choiceEnd', function(choice){
    	that.final(choice);
	});

	//slideBack = game.add.sprite(0, 200, 'proto', 'proto/PurpleBubble.png');
}

SlideShow.prototype = Object.create(Layout.prototype);
SlideShow.prototype.constructor = SlideShow;
SlideShow.prototype.update = function SlideShowUpdate(game){
	Layout.prototype.update.call(this, game);
}


SlideShow.prototype.final = function SlideShowFinal(choice){
	devAnim.start();
}

module.exports = SlideShow;
