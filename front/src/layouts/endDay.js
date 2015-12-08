var Layout = require('./layout');

function EndDay(){
  Layout.call(this);

  this.metacritic = 80;
  this.bolloRate = 10;

  this.metaTxt = window.game.add.text(200, 200, "Metacritic : " + this.metacritic, { font: "65px Arial", fill: "#ff0044", align: "center" });
  this.bolloTxt = window.game.add.text(200, 400, "Actions de Bollobails : " + this.bolloRate, { font: "65px Arial", fill: "#ff0044", align: "center" });

  this.group.add(this.metaTxt);
  this.group.add(this.bolloTxt);

  this.waitInputs = false;
  this.currentWaitingTime = 0;
  this.waitingTime = 0.5;

  var that = this;
  window.game.events.on('choiceEnd', function(choice){
    var values;
    if(choice){
      values = window.game.score['yes'];
    }else{
      values = window.game.score['no'];
    }

    that.metacritic += values.metacritic;
    that.bolloRate += values.bolloRate;
  });
  window.game.events.on('endDay', function(){
    that.enable();
  });

  this.spaceKey = window.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.enterKey = window.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

EndDay.prototype = Object.create(Layout.prototype);
EndDay.prototype.constructor = EndDay;
EndDay.prototype.update = function EndDayUpdate(game){
  Layout.prototype.update.call(this, game);

  this.metaTxt.text = "Metacritic : " + this.metacritic;
  this.bolloTxt.text = "Actions de Bollobails : " + this.bolloRate;

  if(this.waitInputs){
    if(this.spaceKey.isDown || this.enterKey.isDown){
      window.game.events.emit('newDay');

      this.disable();
    }
  }else{
    this.currentWaitingTime += 1/60;
    if(this.spaceKey.isUp = true && this.enterKey.isUp && this.currentWaitingTime > this.waitingTime){
      this.waitInputs = true;
    }
  }
}

module.exports = EndDay;
