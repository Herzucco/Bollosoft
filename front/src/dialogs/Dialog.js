var Bubble = require('./Bubble');
var baseBmpTextPosition = [1300, 400];

function Dialog(group, language, position, maxSentences, spacing){
  this.group = group || window.game;
  this.language = language || 'fr';
  this.position = position || {x: 990, y:200};
  this.maxSentences = maxSentences || 3;
  this.spacing = spacing || 30;

  this.sentences = [];
  this.currentSentence = -1;

  this.characters = {};
  this.settings = {};

  this.bubbles = [];

  this.skippable = true;
  this.canInput = true;
  this.spaceKey = window.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

Dialog.prototype.load = function LoadDialog(text){
  this.computeDialog(text);

  this.next(1, true);
}

Dialog.prototype.computeDialog = function ComputeDialog(text){
  for(var i = 0; i < text.text.length; i++){
    this.sentences.push(text.text[i]);
  }

  this.characters = text.characters;
  this.settings = text.settings;
}

Dialog.prototype.createBubble = function CreateBubbleDialog(){
  var bubble = new Bubble(this.group, baseBmpTextPosition[0], baseBmpTextPosition[1],
                    this.sentences[this.currentSentence], this.characters,
                    this.language);
  this.bubbles.push(bubble);

  this.group.add(bubble);
  bubble.start();
}

Dialog.prototype.next = function ForwardDialog(delta, sentenceComputing){
  if(this.currentSentence + delta < this.sentences.length){
    this.currentSentence += delta;

    if(sentenceComputing){
      this.createBubble();
    }

  }else{
    this.canInput = false;
    window.game.events.emit('choiceStart');
  }
}

Dialog.prototype.computeSentence = function ComputeSentenceDialog(sentence){
  switch(sentence[this.language]){
    case '$$$' :
      window.game.events.emit('slide', this.settings.picture);
      return false;
    break;
    case '@@@' :
      window.game.events.emit('presentator', this.settings.presentator);
      return false;
    break;
    default :
      return true;
    break;
  }
}

Dialog.prototype.getSentence = function GetSentenceDialog(){
  return this.sentences[this.currentSentence];
}

Dialog.prototype.update = function UpdateDialog(){
  if(this.canInput){
    this.waitInput();
  }
}

Dialog.prototype.waitInput = function WaitInputDialog(){
  if(this.spaceKey.isDown && this.skippable){
    var bubble = this.bubbles[this.bubbles.length - 1];

    this.skippable = false;

    if(bubble.isOver){
      var sentenceComputing;

      if(this.currentSentence + 1 < this.sentences.length){
        sentenceComputing = this.computeSentence(this.sentences[this.currentSentence + 1]);
        if(sentenceComputing){
          for(var i = 0; i < this.bubbles.length; i++){
            this.bubbles[i].up();
          }
        }
      }

      this.next(1, sentenceComputing);
    }else{
      bubble.skip();
    }
  }

  if(this.spaceKey.isUp && window.game.input.activePointer.leftButton.isUp){
    this.skippable = true;
  }
}

module.exports = Dialog;
