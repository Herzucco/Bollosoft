var Layout = require('./layout');
var Dialog = require('../dialogs/Dialog');

function DialogPannel(){
  Layout.call(this);
  this.sceneIndex = 0;

  this.dialog = new Dialog(this.group);
  window.game.score = window.game.texts[this.sceneIndex].values;
  this.dialog.load(window.game.texts[this.sceneIndex]);

  var that = this;
  window.game.events.on('choiceEnd', function(choice){
    that.final(choice);
  });
  window.game.events.on('newDay', function(){
    if(that.sceneIndex === 0){
      window.game.events.emit("startSplashScreen");
    }else{
      that.next();
    }
  });

  window.game.events.on('endSplashScreen', function(){
    that.next();
  });

  window.game.events.on('endDayPre', function(){
    if(that.sceneIndex !== 0){
      window.game.events.emit("endDay");
    }else{
      window.game.events.emit("startSplashScreen");
    }
  });

  this.enable();
}

DialogPannel.prototype = Object.create(Layout.prototype);
DialogPannel.prototype.constructor = DialogPannel;

DialogPannel.prototype.update = function DialogPannelUpdate(game){
  Layout.prototype.update.call(this, game);

  this.dialog.update();
}

DialogPannel.prototype.final = function DialogPannelFinal(choice){
  this.dialog.loadChoice(choice);
}

DialogPannel.prototype.next = function DialogPannelNext(){
  this.sceneIndex++;

  if(this.sceneIndex < window.game.texts.length){
    window.game.score = window.game.texts[this.sceneIndex].values;
    this.dialog.load(window.game.texts[this.sceneIndex]);
  }else{
    console.log('THE END OF ta mère.');
  }
}

module.exports = DialogPannel;
