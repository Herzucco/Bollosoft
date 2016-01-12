var Layout = require('./layout');
var Pixelate = require('../filters/pixelate');


function Demoscene(){
  Layout.call(this);

  var filter = new Pixelate(window.game);
  var currentStep = 0;
  var steps = [
    [10, 10, 15000],
    [300, 300, 15000],
    [10000, 10000, 15000],
  ];
  var tween;
  var rezTween;

  this.backGround = window.game.add.sprite(0, 0, 'bgDemo');
  this.backGround.scale.set(10, 10);
  this.backGround.visible = false;

  var sprite = window.game.add.sprite(0, 0, 'test');
  sprite.width = 1920;
  sprite.height = 1080;
  sprite.visible = false;

  this.rezMode = false;
  this.alphaSpeed = 5;
  this.customUniforms = {
     iChannel0: { type: 'sampler2D', value: sprite.texture, textureData: { repeat: true } },
     alpha: { type: '1f', value: 0 }
  };

  this.planeFilter = new Phaser.Filter(window.game, this.customUniforms, planeFragment);
  this.planeFilter.setResolution(1920, 1080);

  sprite.filters = [this.planeFilter];

  var that = this;
  window.game.events.on('pixel', function(){
    window.game.world.filters = [filter];

    tween = game.add.tween(filter);

    tween.to( { sizeX: steps[currentStep][0], sizeY: steps[currentStep][1]}, steps[currentStep][2], Phaser.Easing.Linear.None);
    tween.start();

    currentStep++;
    if(currentStep >= steps.length){
      currentStep = steps.length-1;
    }
  });

  window.game.events.on('stopPixel', function(){
    window.game.world.filters = null;

    tween = game.add.tween(filter);
    tween.to( { sizeX: 1, sizeY: 1}, 0, Phaser.Easing.Linear.None);
    tween.start();

    that.backGround.visible = true;
    that.rezMode = true;

    rezTween = game.add.tween(that.customUniforms.alpha);
    rezTween.to( { value: 1.0 }, that.alphaSpeed * 1000, Phaser.Easing.Linear.None);
    rezTween.start();
    sprite.visible = true;

    that.enable();
  });

}

Demoscene.prototype = Object.create(Layout.prototype);
Demoscene.prototype.constructor = Demoscene;
Demoscene.prototype.update = function DemosceneUpdate(game){
  Layout.prototype.update.call(this, game);

  if(this.rezMode){
    // this.planeFilter.dirty = true;
    // this.customUniforms.alpha.value += 1/60 * this.alphaSpeed;
    this.planeFilter.update();
  }
}

var planeFragment = [
    "precision mediump float;",

    "uniform float     time;",
    "uniform vec2      resolution;",
    "uniform sampler2D iChannel0;",
    "uniform float alpha;",

    "void main( void ) {",

        "float t = time;",

        "vec2 uv = gl_FragCoord.xy / resolution.xy;",
        "vec2 texcoord = gl_FragCoord.xy / vec2(resolution.y);",

        "texcoord.y -= t*5.0;",

        "float zz = 1.0/(1.0-uv.y*1.7);",
        "texcoord.y -= zz * sign(zz);",

        "vec2 maa = texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0) ;",
        "vec2 maa2 = (texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0))*0.3 ;",
        "vec4 stone = texture2D(iChannel0, maa);",
        "vec4 blips = texture2D(iChannel0, maa);",
        "vec4 mixer = texture2D(iChannel0, maa2);",

        "float shade = abs(1.0/zz);",

        "vec3 outp = mix(shade*stone.rgb, mix(1.0, shade, abs(sin(t+maa.y-sin(maa.x))))*blips.rgb, min(1.0, pow(mixer.g*2.1, 2.0)));",
        "gl_FragColor = vec4(outp,alpha);",

    "}"
];

module.exports = Demoscene;
