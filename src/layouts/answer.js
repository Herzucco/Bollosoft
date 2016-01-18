var Layout = require('./layout');

function Answer(){
  Layout.call(this);

  var that = this;
  window.game.events.on('choiceStart', function(){
    that.opacityCalq.visible = true;
    that.enable();
  });

  window.game.events.on('startOpacityCalq', function(){
    that.opacityCalq.visible = true;
  });

  window.game.events.on('endOpacityCalq', function(){
    that.opacityCalq.visible = false;
  });

  this.choice = true;
  this.choiceMade = false;
  this.waitInputs = false;
  this.canInput = true;
  this.currentWaitingTime = 0;
  this.waitingTime = 0.5;

  this.leftKey = window.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  this.rightKey = window.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  this.spaceKey = window.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.enterKey = window.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

  this.yesSound = window.game.add.audio('yes');
  this.noSound = window.game.add.audio('no');
  this.cursor = window.game.add.audio('cursor');

  this.draw();
}

Answer.prototype = Object.create(Layout.prototype);
Answer.prototype.constructor = Answer;
Answer.prototype.update = function AnswerUpdate(game){
  Layout.prototype.update.call(this, game);

  if(this.waitInputs){
    if(this.leftKey.isUp && this.rightKey.isUp){
      this.canInput = true;
    }

    if(this.leftKey.isDown && this.canInput){
      this.yesChoice();
      this.canInput = false;
    }else if(this.rightKey.isDown && this.canInput){
      this.noChoice();
      this.canInput = false;
    }else if(this.spaceKey.isDown || this.enterKey.isDown){
      this.doChoice();
    }
  }else{
    this.currentWaitingTime += 1/60;
    if(this.spaceKey.isUp = true && this.enterKey.isUp && this.currentWaitingTime > this.waitingTime){
      this.waitInputs = true;
    }
  }
}
Answer.prototype.yesChoice = function AnswerYesChoice(game){
  if(this.choiceMade && this.choice){
    this.doChoice();
  }
  this.group.moveDown(this.noTxt);
  this.group.moveUp(this.yesTxt);
  this.group.moveUp(this.yesTxt);
  this.choice = true;
  this.cursor.play();
  this.choiceMade = true;
}

Answer.prototype.noChoice = function AnswerNoChoice(game){
  if(this.choiceMade && !this.choice){
    this.doChoice();
  }
  this.group.moveDown(this.yesTxt);
  this.group.moveUp(this.noTxt);
  this.group.moveUp(this.noTxt);
  this.choice = false;
  this.cursor.play();
  this.choiceMade = true;
}

Answer.prototype.doChoice = function AnswerDoChoice(game){
  window.game.events.emit('choiceEnd', this.choice);
  this.currentWaitingTime = 0;
  this.waitInputs = false;
  this.disable();
  if(this.choice){
    this.yesSound.play();
  }else{
    this.noSound.play();
  }

  this.choiceMade = false;
}

Answer.prototype.draw = function AnswerDraw(game){
  var centerOffset = 200;

  this.opacityCalq = window.game.add.sprite(window.game.world.centerX, window.game.world.centerY, 'opacityCalq');
  this.opacityCalq.anchor.set(0.5, 0.5);
  this.opacityCalq.scale.set(30, 30);
  this.opacityCalq.tint = 0x000000;
  this.opacityCalq.alpha = 0.7;
  this.opacityCalq.visible = false;

  var that = this;
  this.yesTxt = window.game.add.button(window.game.world.centerX - centerOffset -319, window.game.world.centerY, 'oui', function(){
    that.yesChoice();
  }, this);
  this.yesTxt.input.useHandCursor = true;
  this.noTxt = window.game.add.button(window.game.world.centerX + centerOffset, window.game.world.centerY, 'non', function(){
    that.noChoice();
  }, this);
  this.yesTxt.input.useHandCursor = true;

  this.group.add(this.noTxt);
  this.group.add(this.opacityCalq);
  this.group.add(this.yesTxt);
}

module.exports = Answer;
