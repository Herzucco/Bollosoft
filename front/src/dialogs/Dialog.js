var Bubble = require('./Bubble');
var baseBmpTextPosition = [1300, 400];

function Dialog(language, position, maxSentences, spacing){
  this.language = language || 'fr';
  this.position = position || {x: 990, y:200};
  this.maxSentences = maxSentences || 3;
  this.spacing = spacing || 30;

  this.sentences = [];
  this.currentSentence = -1;

  this.characters = {};

  this.bubbles = [];

  this.skippable = true;
  this.spaceKey = window.game.input.keyboard.addKey(Phaser.Keyboard.UP);
}

Dialog.prototype.load = function LoadDialog(text){
  this.computeDialog(text);
  this.characters = text.characters;

  this.next(1);
}

Dialog.prototype.computeDialog = function ComputeDialog(text){
  for(var i = 0; i < text.text.length; i++){
    this.sentences.push(text.text[i]);
  }
}

Dialog.prototype.createBubble = function CreateBubbleDialog(){
  var bubble = new Bubble(game, baseBmpTextPosition[0], baseBmpTextPosition[1],
                    this.sentences[this.currentSentence], this.characters,
                    this.language);
  this.bubbles.push(bubble);

  window.game.add.existing(bubble);
  bubble.start();
}

Dialog.prototype.next = function ForwardDialog(delta){
  this.currentSentence += delta;

  this.createBubble();
}

Dialog.prototype.getSentence = function GetSentenceDialog(){
  return this.sentences[this.currentSentence];
}

Dialog.prototype.update = function UpdateDialog(){
  this.waitInput();
}

Dialog.prototype.waitInput = function WaitInputDialog(){
  if((this.spaceKey.isDown || window.game.input.activePointer.leftButton.isDown) && this.skippable){
    var bubble = this.bubbles[this.bubbles.length - 1];

    this.skippable = false;

    if(bubble.isOver){
      bubble.destroy();
      this.next(1);
    }else{
      bubble.skip();
    }
  }

  if(this.spaceKey.isUp && window.game.input.activePointer.leftButton.isUp){
    this.skippable = true;
  }
}

module.exports = Dialog;
