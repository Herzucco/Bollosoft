var Layout = require('./layout');
var leftBackground;
var canap;
var devShadow;
var devAnim;
var slideBack;
var slideSound;
var projectorSound;
var doorSound;
var filter;
var iwataShader;
var shadowAnim;

function SlideShow(){
	Layout.call(this);
	this.enable();

	this.presOnStage = false;

	leftBackground = game.add.sprite(0, 0, 'leftBackground');
	leftBackground.sendToBack();
	canap = game.add.sprite(0, 800, 'canap');

	devShadow = game.add.sprite(-1000, 500, 'devsSprite');
	devShadow.animations.add('black', Phaser.Animation.generateFrameNames('black', 1, 3, '.png', 1), 10, true, false);
	devShadow.animations.add('breton', Phaser.Animation.generateFrameNames('breton', 1, 3, '.png', 1), 10, true, false);
	devShadow.animations.add('iwata', Phaser.Animation.generateFrameNames('iwata', 1, 3, '.png', 1), 10, true, false);
	devShadow.animations.add('kojima', Phaser.Animation.generateFrameNames('kojima', 1, 3, '.png', 1), 10, true, false);
	devShadow.animations.add('moulard', Phaser.Animation.generateFrameNames('moulard', 1, 3, '.png', 1), 10, true, false);
	devShadow.animations.add('étudiante', Phaser.Animation.generateFrameNames('student', 1, 3, '.png', 1), 10, true, false);
	devShadow.animations.add('alldevs', Phaser.Animation.generateFrameNames('allDevs', '.png', 1), 10, true, false);
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
	window.game.events.on('endDayPre', function(presEnd){
    	that.endPres(presEnd);
	});
	window.game.events.on('presLeave', function(){
    	that.presLeave();
	});

	slideBack = game.add.sprite(44, 50, 'proto', 'protoGreug/1.png');
	slideBack.width = 0;
	slideBack.height = 0;

	slideSound = window.game.add.audio('slide');
	doorSound = window.game.add.audio('door');
	projectorSound = window.game.add.audio('projecteur');
	projectorSound.loop = true;

	this.group.add(slideBack);

    //  Shader by Kali (https://www.shadertoy.com/view/4dfGDM)
    //  Image patched by Richard Davey
	var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform sampler2D iChannel0;",

        "void main( void ) {",

            "vec2 uv = gl_FragCoord.xy / resolution.xy;",

            "// Flip-a-roo.",
            "uv.y *= -1.0;",

            "// Represents the v/y coord(0 to 1) that will not sway.",
            "float fixedBasePosY = 0.0;",

            "// Configs for you to get the sway just right.",
            "float speed = 3.0;",
            "float verticleDensity = 6.0;",
            "float swayIntensity = 0.2;",

            "// Putting it all together.",
            "float offsetX = sin(uv.y * verticleDensity + time * speed) * swayIntensity;",

            "// Offsettin the u/x coord.",
            "uv.x += offsetX * (uv.y - fixedBasePosY);",

            "gl_FragColor = texture2D(iChannel0, uv);",

        "}"
    ];

    //  Texture must be power-of-two sized or the filter will break
    iwataShader = game.add.sprite(0, 0, 'iwataTexture');
    iwataShader.alpha = 0;

    var customUniforms = {
        iChannel0: { type: 'sampler2D', value: iwataShader.texture, textureData: { repeat: true } }
    };

    filter = new Phaser.Filter(game, customUniforms, fragmentSrc);
    filter.setResolution(1024, 1024);

    iwataShader.filters = [ filter ];
}

SlideShow.prototype = Object.create(Layout.prototype);
SlideShow.prototype.constructor = SlideShow;
SlideShow.prototype.update = function SlideShowUpdate(game){
	Layout.prototype.update.call(this, game);
	if(this.shadow != undefined && this.shadow.alpha > 0){
		this.shadow.alpha -= 0.02;
	}
	filter.update();
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
	this.presOnStage = true;
	if (presStart != "iwata")
	{
		doorSound.play();

		devShadow.animations.play(presStart, 5, true);
		setTimeout(function(){
			devShadow.animations.stop(null, true);
		}, 1/60);

		this.shadow = game.add.sprite(-1000, 500, presStart);
	  this.shadow.tint = 0x000000;
	  this.shadow.alpha = 1;

		shadowAnim = game.add.tween(this.shadow);
		shadowAnim.to({x:5}, 400, Phaser.Easing.Linear.None);
		shadowAnim.start();

		devAnim = game.add.tween(devShadow);
		devAnim.to({x:5}, 400, Phaser.Easing.Linear.None);
		devAnim.start();

		devShadow.z = 1;
		this.group.sort('z', Phaser.Group.SORT_ASCENDING);
	}
	else
	{
		    iwataShader.alpha = 1;
	}
}

SlideShow.prototype.presLeave = function PresLeave(){
	if (iwataShader.alpha == 0)
	{
		shadowAnim.to({x:-1000}, 400, Phaser.Easing.Linear.None);
		shadowAnim.start();
		devAnim.to({x:-1000}, 400, Phaser.Easing.Linear.None);
		devAnim.start();
	}
	else
	{
		iwataShader.alpha = 0;
	}
		this.presOnStage = false;
}
SlideShow.prototype.endPres = function PresentationEnding(presEnd){
	if(this.presOnStage){
		this.presLeave();
	}

	slideBack.width = 0;
	slideBack.height = 0;

	projectorSound.stop();
}

module.exports = SlideShow;
