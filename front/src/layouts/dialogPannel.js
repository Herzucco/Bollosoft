var Layout = require('./layout');
var Dialog = require('../dialogs/Dialog');

function DialogPannel(){
  Layout.call(this);
  this.sceneIndex = 0;
  this.demoscene = 0;

  this.dialog = new Dialog(this.group);
  window.game.score = window.game.texts[this.sceneIndex].values;

  var that = this;
  window.game.events.on('choiceEnd', function(choice){
    that.final(choice);
  });
  window.game.events.on('newDay', function(){
    window.game.events.emit("startSplashScreen");
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

  window.game.events.on('demoscene', function(){
    that.dialog.autoMode = true;
  });

  window.game.events.on('stopPixel', function(){
    that.demoScene = true;
  });

  this.dialog.load(window.game.texts[this.getLastUnlocked(window.game.texts)]);
  this.enable();
}

DialogPannel.prototype = Object.create(Layout.prototype);
DialogPannel.prototype.constructor = DialogPannel;

DialogPannel.prototype.update = function DialogPannelUpdate(game){
  Layout.prototype.update.call(this, game);

  if(!this.demoScene){
    this.dialog.update();
  }
}

DialogPannel.prototype.getLastUnlocked = function DialogPannelGetLastUnlocked(texts){
  var i;

  for(i = 0; i < texts.length-1; i++){
   var key = 'scene_' + texts[i].settings.unlockKey;
   if(!window.game.save.check(key, 'true')){
     return i;
   }
 }

  return i;
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
    window.game.events.emit("credits");
  }
}

module.exports = DialogPannel;
