var Layout = require('./layout');

function Answer(){
  Layout.call(this);

  var that = this;
  window.game.events.on('choiceStart', function(){
    that.enable();
  });

  this.choice = true;
  this.waitInputs = false;
  this.currentWaitingTime = 0;
  this.waitingTime = 0.5;

  this.leftKey = window.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  this.rightKey = window.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  this.spaceKey = window.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  this.draw();
}

Answer.prototype = Object.create(Layout.prototype);
Answer.prototype.constructor = Answer;
Answer.prototype.update = function AnswerUpdate(game){
  Layout.prototype.update.call(this, game);

  if(this.waitInputs){
    if(this.leftKey.isDown){
      this.yesTxt.addColor('#C04A67', 0);
      this.noTxt.addColor('#ffffff', 0);
      this.choice = true;
    }else if(this.rightKey.isDown){
      this.yesTxt.addColor('#ffffff', 0);
      this.noTxt.addColor('#C04A67', 0);
      this.choice = false;
    }else if(this.spaceKey.isDown){
      window.game.events.emit('choiceEnd', this.choice);
      this.disable();
    }
  }else{
    this.currentWaitingTime += 1/60;
    if(this.spaceKey.isUp = true && this.currentWaitingTime > this.waitingTime){
      this.waitInputs = true;
    }
  }
}

Answer.prototype.draw = function AnswerDraw(game){
  var centerOffset = 200;

  this.yesTxt = window.game.add.text(window.game.world.centerX - centerOffset, window.game.world.centerY, "Accepter",
                { font: "65px Times New Roman", fill: "#C04A67", align: "center", stroke : '#000000' });
  this.yesTxt.anchor.setTo(0.5, 0.5);

  this.noTxt = window.game.add.text(window.game.world.centerX + centerOffset, window.game.world.centerY, "Refuser",
                { font: "65px Times New Roman", fill: "#ffffff", align: "center", stroke : '#000000' });
  this.noTxt.anchor.setTo(0.5, 0.5);

  this.group.add(this.yesTxt);
  this.group.add(this.noTxt);
}

module.exports = Answer;