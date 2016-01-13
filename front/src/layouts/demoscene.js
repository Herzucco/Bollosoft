var Layout = require('./layout');
var Pixelate = require('../filters/pixelate');
var graal = {
  'die': false
}
var music;

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
  music = game.add.audio('Generic');

  this.demoImages = [
    'bollotete',
    'ubi'
  ];

  this.currentSpawnCount = 2 * 1000;
  this.spawnCount = 0.5;

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

    music.play();

    that.enable();
  });

}

Demoscene.prototype = Object.create(Layout.prototype);
Demoscene.prototype.constructor = Demoscene;
Demoscene.prototype.update = function DemosceneUpdate(game){
  Layout.prototype.update.call(this, game);

  if(this.rezMode){
    this.currentSpawnCount += 1/60;
    // this.planeFilter.dirty = true;
    // this.customUniforms.alpha.value += 1/60 * this.alphaSpeed;
    this.planeFilter.update();
    this.spawnCount -= 1/60 / 30;
    if(this.currentSpawnCount >= this.spawnCount){
      var t = new DemoSprite(getRandomArbitrary(300, 1600), getRandomArbitrary(400, 600), this.demoImages[getRandomInt(0, this.demoImages.length-1)], graal);
      t.anchor.set(0.5, 0.5);
      window.game.world.add(t);
      this.currentSpawnCount = 0;
      //this.group.sort('z', Phaser.Group.SORT_DESCENDING);
    }

    if(this.spawnCount <= 0.01){
        graal.die = true;
        this.disable();
        music.stop();
        window.game.events.emit("credits");
    }
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

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function DemoSprite(x, y, image, graal){
  this.graal = graal;

  Phaser.Sprite.call(this, window.game, x, y, image);

  this.scale.set(0.01, 0.01);
  this.moveSpeed = getRandomArbitrary(5, 10);
  this.scaleSpeed = getRandomArbitrary(1.01, 1.05);
  this.direction = getRandomInt(-1, 1);
  if(this.direction === 0){
    this.direction = 1;
  }
}

DemoSprite.prototype = Object.create(Phaser.Sprite.prototype);
DemoSprite.prototype.constructor = DemoSprite;

DemoSprite.prototype.update = function UpdateDemoSprite() {
  this.x += this.moveSpeed * this.direction;
  this.scale.set(this.scale.x * this.scaleSpeed, this.scale.y * this.scaleSpeed);

  if(this.x > 2000 || this.x < 100 || this.scale.x > 10){
    this.alpha -= 0.05;
  }

  if(this.x > 3000 || this.x < -500 || this.scale.x > 100 || this.graal.die){
    this.destroy();
  }
}


module.exports = Demoscene;
