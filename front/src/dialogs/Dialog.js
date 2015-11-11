var baseBmpTextPosition = [0, 0];

function Dialog(language){
  this.language = language || 'fr';

  this.sentences = [];
  this.currentSentence = 0;

  this.currentText = "";
  this.currentTextIndex = 0;

  this.characters = {};
  this.currentCharacter = {};

  this.progressRythm = 0;

  this.bmpText = null;
}

Dialog.prototype.load = function LoadDialog(text){
  console.log(text);

  this.computeDialog(text);
  this.characters = text.characters;

  this.reset();
}

Dialog.prototype.computeDialog = function ComputeDialog(text){
  for(var i = 0; i < text.text.length; i++){
    this.sentences.push(text.text[i]);
  }
}

Dialog.prototype.reset = function ResetDialog(){
  this.currentCharacter = this.characters[this.sentences[this.currentSentence].talker];
  this.currentTextIndex = 0;

  this.bmpText = window.game.add.bitmapText(baseBmpTextPosition[0],
       baseBmpTextPosition[1], this.currentCharacter.font, "",
       this.currentCharacter.fontSize);
}

Dialog.prototype.forward = function ForwardDialog(){
  this.currentSentence++;
  this.reset();
}

Dialog.prototype.backward = function BackwardDialog(){
  this.currentSentence--;
  this.reset();
}

Dialog.prototype.getSentence = function GetSentenceDialog(){
  return this.sentences[this.currentSentence];
}

Dialog.prototype.display = function DisplayDialog(){

}

Dialog.prototype.update = function UpdateDialog(){
  this.progressRythm += 1/60;

  if(this.progressRythm >= this.currentCharacter.rythm && this.getSentence()[this.language][this.currentTextIndex] !== undefined){
    this.progressRythm = 0;
    this.currentText += this.getSentence()[this.language][this.currentTextIndex];

    this.currentTextIndex++;

    this.bmpText.text = this.currentText;
  }
}

module.exports = Dialog;
