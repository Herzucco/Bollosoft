//  Here is a custom game object
function Bubble (group, x, y, sentence, characters, language, delta) {
  Phaser.Sprite.call(this, window.game, x, y, characters[sentence.talker].bubble);

  this.group = group;
  this.group.add(this);

  this.sentence = sentence || {};

  this.character =  characters[sentence.talker] || {};
  this.character = JSON.parse(JSON.stringify(this.character));

  for(var i in sentence.style){
    this.character[i] = sentence.style[i];
  }

  if(delta > 0){
    this.label = 'right';
  }else if (delta < 0){
    this.label = 'left';
  }else{
    this.label = 'center';
  }

  this.language = language || 'fr';
  this.set();
};

Bubble.prototype = Object.create(Phaser.Sprite.prototype);
Bubble.prototype.constructor = Bubble;

Bubble.prototype.set = function setBubble(){
  this.isOver = false;

  this.preCurrentFadeTime = 0;
  this.preFadeTime = 0.5;
  this.currentFadeTime = 0;
  this.fadeTime = 0.5;
  this.fadeSpeed = 0.05;

  this.currentUpTime = 0;
  this.upTime = 0.5;
  this.upSpeed = 6;

  this.currentText = "";
  this.currentTextIndex = 0;

  this.bmpText = null;
  this.labelBubble = null;
  this.labelText = null;


  this.mode = 'scaling';

  this.progressRythm = 0;
  this.anchor.set(0.5, 0.5);
  this.scale.setTo(1, 0.5);
}

Bubble.prototype.start = function startBubble(){
  this.currentTextIndex = 0;

  this.labelBubble = new Phaser.Sprite(window.game, 0, 0, this.character.bubble);
  this.labelBubble.anchor.set(0.5, 0.5);
  this.labelBubble.scale.setTo(0.5, 0.25);

  this.labelText = window.game.add.bitmapText(0, 0, 'basic', this.character.name, 27);
  this.labelText.anchor.set(0.5, 0.5);

  this.bmpText = window.game.add.bitmapText(0, 0, this.character.font, "", this.character.fontSize);
  this.bmpText.anchor.set(0.5, 0.5);

  this.group.add(this.labelBubble);
  this.group.add(this.labelText);
  this.group.add(this.bmpText);

  this.bmpText.maxWidth = 510;
  this.mode = 'scaling';

  this.labelText.alpha = 0;
  this.labelBubble.alpha = 0;
  this.alpha = 0;
}

Bubble.prototype.update = function UpdateBubble() {
  this.bmpText.x = this.x;
  this.bmpText.y = this.y;

  this.updateLabel();

  if(this.mode === 'text'){
    this.textMode();
  }else if(this.mode === 'scaling'){
    this.fadeMode();
  }else if(this.mode === 'up'){
    this.upAnimation();
  }
}

Bubble.prototype.updateLabel = function UpdateLabelBubble() {
  this.labelBubble.y = this.y;
  var offset = this.width / (this.scale.x * 2) - this.labelBubble.width / 2;

  if(this.label === 'left'){
    offset *= -1;
  }else if(this.label === 'center'){
    offset = 0;
  }

  this.labelBubble.x = this.x + offset;
  this.labelBubble.y = this.y - this.height / 4;

  this.labelText.x = this.labelBubble.x;
  this.labelText.y = this.labelBubble.y;
}

Bubble.prototype.destroy = function DestroyBubble() {
  Phaser.Sprite.prototype.destroy.call(this);

  this.bmpText.destroy();
}

Bubble.prototype.textMode = function TextModeBubble(){
  this.progressRythm += 1/60;

  if(this.progressRythm >= this.character.rythm && this.sentence[this.language][this.currentTextIndex] !== undefined){
    this.progressRythm = 0;
    this.currentText += this.sentence[this.language][this.currentTextIndex];

    this.currentTextIndex++;

    this.bmpText.text = this.currentText;
  }else if(this.sentence[this.language][this.currentTextIndex] === undefined){
    this.isOver = true;
    this.mode = 'wait';
  }
}

Bubble.prototype.upAnimation = function UpAnimationBubble(){
  this.currentUpTime += 1/60;

  this.y -= this.upSpeed;

  if(this.upTime <= this.currentUpTime){
    this.currentUpTime = 0;
    this.mode = 'wait';
  }
}

Bubble.prototype.up = function UpBubble(){
  this.mode = 'up';
}

Bubble.prototype.fadeMode = function fadeModeDialog(){
  this.preCurrentFadeTime += 1/60;

  if(this.preFadeTime <= this.preCurrentFadeTime){
    this.currentFadeTime += 1/60;

    if(this.alpha < 1){
      this.labelBubble.alpha += this.fadeSpeed;
      this.labelText.alpha += this.fadeSpeed;
      this.alpha += this.fadeSpeed;
    }

    if(this.fadeTime <= this.currentFadeTime){
      this.currentFadeTime = 0;
      this.preCurrentFadeTime = 0;
      this.mode = 'text';
    }
  }
}

Bubble.prototype.skip = function SkipBubble(){
  this.isOver = true;
  this.alpha = 1;
  this.currentText = this.sentence[this.language];

  this.bmpText.text = this.currentText;
  this.mode = 'wait';
}

module.exports = Bubble;
