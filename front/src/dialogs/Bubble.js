//  Here is a custom game object
function Bubble (game, x, y, sentence, characters, language) {
  Phaser.Sprite.call(this, window.game, x, y, characters[sentence.talker].bubble);

  this.sentence = sentence || {};

  this.character =  characters[sentence.talker] || {};
  this.character = JSON.parse(JSON.stringify(this.character));

  for(var i in sentence.style){
    this.character[i] = sentence.style[i];
  }

  console.log(this.character);

  this.language = language || 'fr';
  this.set();
};

Bubble.prototype = Object.create(Phaser.Sprite.prototype);
Bubble.prototype.constructor = Bubble;

Bubble.prototype.set = function setBubble(){
  this.isOver = false;

  this.currentScalingTime = 0;
  this.scalingTime = 1;
  this.scalingSpeedX = 0.1;
  this.scalingSpeedY = 0.01;

  this.xPadding = 30;
  this.yPadding = 50;

  this.currentText = "";
  this.currentTextIndex = 0;

  this.bmpText = null;

  this.mode = 'scaling';

  this.progressRythm = 0;
  this.anchor.set(0.5, 0.5);
}

Bubble.prototype.start = function startBubble(){
  this.currentTextIndex = 0;

  this.bmpText = window.game.add.bitmapText(Math.floor(this.x - this.width/2 + this.xPadding),
                 Math.floor(this.y - this.height / 2 + this.yPadding), this.character.font, "",
                 this.character.fontSize);

  this.bmpText.maxWidth = 650;
  this.mode = 'scaling';
}

Bubble.prototype.update = function UpdateBubble() {
  this.bmpText.x = Math.floor(this.x - this.width / 2 + this.xPadding);
  this.bmpText.y = Math.floor(this.y - this.height / 2 + this.yPadding);

  if(this.mode === 'text'){
    this.textMode();
  }else if(this.mode === 'scaling'){
    this.scaleMode();
  }
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

Bubble.prototype.scaleMode = function ScaleModeDialog(){
  this.currentScalingTime += 1/60;

  this.scale.setTo(this.scale.x + this.scalingSpeedX, this.scale.y + this.scalingSpeedY);

  if(this.scalingTime <= this.currentScalingTime){
    this.currentScalingTime = 0;
    this.mode = 'text';
  }
}

Bubble.prototype.skip = function SkipBubble(){
  this.isOver = true;
  this.currentText = this.sentence[this.language];

  this.bmpText.text = this.currentText;
  this.mode = 'wait';
}

module.exports = Bubble;
