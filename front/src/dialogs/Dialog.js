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
  this.autoMode = false;
  this.spaceKey = window.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

Dialog.prototype.load = function LoadDialog(source){
  this.bubbles.length = 0;

  this.source = source;
  this.choiceMode = false;

  this.computeDialog(source.text, source.characters, source.settings);

  this.music = window.game.add.audio(this.settings.music);
  this.music.loop = true;
  this.music.play();

  this.newBubble();
}

Dialog.prototype.loadChoice = function LoadChoiceDialog(choice){
  this.choiceMode = true;

  if(choice){
    this.computeDialog(this.source.choice['yes'], this.source.characters, this.source.settings);
  }else {
    this.computeDialog(this.source.choice['no'], this.source.characters, this.source.settings);
  }

  this.waitInput(true);
}

Dialog.prototype.computeDialog = function ComputeDialog(text, characters, settings){
  this.sentences.length = 0;
  this.currentSentence = -1;
  this.canInput = true;

  for(var i = 0; i < text.length; i++){
    this.sentences.push(text[i]);
  }

  this.characters = characters;

  this.settings = settings;
}

Dialog.prototype.createBubble = function CreateBubbleDialog(delta, position){
  var bubble = new Bubble(this.group, baseBmpTextPosition[0] + delta, baseBmpTextPosition[1],
                    this.sentences[this.currentSentence], this.characters,
                    this.language, position);

  this.bubbles.push(bubble);

  this.group.add(bubble);
  bubble.start();
}

Dialog.prototype.next = function ForwardDialog(delta, sentenceComputing){
  if(this.currentSentence + delta < this.sentences.length){
    this.currentSentence += delta;

    if(sentenceComputing){
      var talker = this.characters[this.sentences[this.currentSentence].talker];
      var offset = 162;

      if(talker === undefined){
        console.error("Error this talker is not defined : " + this.sentences[this.currentSentence].talker);
      }

      if(talker.name === 'Narrateur'){
        this.createBubble(-offset*3.1 , 'center');
      }else if(talker.name === 'Bolloré'){
        this.createBubble(-offset, 'left');
      }else if(talker.name === 'Guillemot'){
        this.createBubble(offset, 'right');
      }else{
        this.createBubble(-offset*7.25, 'center');
      }
    }

  }else if(!this.choiceMode){
    this.canInput = false;
    this.music.stop();
    window.game.events.emit('choiceStart');
  }else{
    this.canInput = false;
    window.game.events.emit('endDayPre', this.settings.presentator.toLowerCase());
    this.group.forEach(function(item) {
      item.kill();
    }, this);
  }
}

Dialog.prototype.computeSentence = function ComputeSentenceDialog(sentence){
  switch(sentence[this.language]){
    case '$$$' :
      window.game.events.emit('slide', this.settings.picture);
      return false;
    break;
    case '@@@' :
      window.game.events.emit('presentator', this.settings.presentator.toLowerCase());
      return false;
    break;
    case '~~~' :
      window.game.events.emit('startOpacityCalq');
      return false;
    break;
    case '!~~~' :
      window.game.events.emit('endOpacityCalq');
      return false;
    break;
    case '¡¡¡' :
      window.game.events.emit('bolloFall');
      return false;
    break;
    case '###' :
      window.game.events.emit('presLeave');
      return false;
    break;
    case '???' :
      window.game.events.emit('pixel');
      return false;
    break;
    case '!???' :
      window.game.events.emit('stopPixel');
      return false;
    break;
    case '^^^' :
      var badum = window.game.add.audio('badum');
      badum.play();
      return false;
    break;
    case '§§§' :
      window.game.events.emit('love');
      return false;
    break;
    case '___' :
      window.game.events.emit('demoscene');
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
    this.waitInput(false);
  }
}

Dialog.prototype.newBubble = function NewBubbleDialog(){
  var sentenceComputing = true;

  if(this.currentSentence + 1 < this.sentences.length){
    sentenceComputing = this.computeSentence(this.sentences[this.currentSentence + 1]);
    if(sentenceComputing){
      for(var i = 0; i < this.bubbles.length; i++){
        this.bubbles[i].up();
      }
    }
  }

  this.next(1, sentenceComputing);

  if(!sentenceComputing){
    this.waitInput(true);
  }
}

Dialog.prototype.waitInput = function WaitInputDialog(force){
  var bubble = this.bubbles[this.bubbles.length - 1];

  if(bubble !== undefined){
    if((((this.spaceKey.isDown || game.input.mousePointer.isDown || game.input.pointer1.isDown) && !this.autoMode) && this.skippable) || bubble.force || force){
      this.skippable = false;

      if(bubble.isOver){
        this.newBubble();
      }else if(bubble.mode !== 'scaling'){
        bubble.skip(true);
      }
    }

    if(this.spaceKey.isUp && window.game.input.activePointer.leftButton.isUp){
      this.skippable = true;
    }
  }else{
    this.newBubble();
  }
}

module.exports = Dialog;
