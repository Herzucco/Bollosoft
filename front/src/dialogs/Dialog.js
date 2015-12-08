var Bubble = require('./Bubble');
var baseBmpTextPosition = [1450, 400];

function Dialog(group, language, position, maxSentences, spacing){
  this.group = group || window.game;
  this.language = language || 'fr';
  this.maxSentences = maxSentences || 3;
  this.spacing = spacing || 30;

  this.source = null;
  this.sentences = [];
  this.currentSentence = -1;

  this.characters = {};
  this.settings = {};

  this.bubbles = [];

  this.skippable = true;
  this.canInput = true;
  this.spaceKey = window.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

Dialog.prototype.load = function LoadDialog(source){
  this.source = source;

  this.computeDialog(source.text, source.characters, source.settings);

  this.next(1, true);
}

Dialog.prototype.loadChoice = function LoadChoiceDialog(choice){
  this.currentSentence = -1;
  this.canInput = true;

  if(choice){
    this.computeDialog(this.source.choice['yes'], this.source.characters, this.source.settings);
  }else {
    this.computeDialog(this.source.choice['no'], this.source.characters, this.source.settings);
  }
}

Dialog.prototype.computeDialog = function ComputeDialog(text, characters, settings){
  this.sentences.length = 0;

  for(var i = 0; i < text.length; i++){
    this.sentences.push(text[i]);
  }

  this.characters = characters;
  this.settings = settings;
}

Dialog.prototype.createBubble = function CreateBubbleDialog(delta){
  var bubble = new Bubble(this.group, baseBmpTextPosition[0] + delta, baseBmpTextPosition[1],
                    this.sentences[this.currentSentence], this.characters,
                    this.language, delta);

  this.bubbles.push(bubble);

  this.group.add(bubble);
  bubble.start();
}

Dialog.prototype.next = function ForwardDialog(delta, sentenceComputing){
  if(this.currentSentence + delta < this.sentences.length){
    this.currentSentence += delta;

    if(sentenceComputing){
      var talker = this.characters[this.sentences[this.currentSentence].talker];
      var offset = 170;

      if(talker === undefined){
        console.error("Error this talker is not defined : " + this.sentences[this.currentSentence].talker);
      }

      if(talker.name === 'Narrateur'){
        this.createBubble(0);
      }
      else if(talker.name !== 'Bolloré' && talker.name !== 'Guillemot'){
        this.createBubble(-offset);
      }else{
        this.createBubble(offset);
      }
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
    }else if(bubble.mode !== 'scaling'){
      bubble.skip();
    }
  }

  if(this.spaceKey.isUp && window.game.input.activePointer.leftButton.isUp){
    this.skippable = true;
  }
}

module.exports = Dialog;
