var Layout = require('./layout');

function EndDay(){
  Layout.call(this);

  this.metacritic = 80;
  this.bolloRate = 10;

  this.metaImage = window.game.add.sprite(358, 185, 'metacritic');
  this.metaImage.tint = 0x66cc33;
  this.bolloImage = window.game.add.sprite(780, 385, 'bollorate');
  this.metaImage.width = 100;
  this.metaImage.height = 100;
  this.bolloImage.width = 100;
  this.bolloImage.height = 100;
  this.group.add(this.metaImage);
  this.group.add(this.bolloImage);

  this.metaTxt = window.game.add.text(50, 200, "Metascore " + this.metacritic, { font: "65px Arial", fill: "#ffffff", align: "center" });
  this.bolloTxt = window.game.add.text(50, 400, "Actions de Bollobails : " + this.bolloRate, { font: "65px Arial", fill: "#ffffff", align: "center" });
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

  if (this.metacritic >= 75)
  {
    this.metaImage.tint = 0x66cc33;
  }
  else if ((this.metacritic < 75)&&(this.metacritic > 50))
  {
    this.metaImage.tint = 0xffcc33;
  }
  else if (this.metacritic <= 50)
  {
    this.metaImage.tint = 0xff0000;
  }
  this.metaTxt.text = "Metascore " + this.metacritic;
  this.bolloTxt.text = "Actions de Bollobails : " + this.bolloRate;

  if(this.waitInputs){
    if(this.spaceKey.isDown || this.enterKey.isDown || game.input.mousePointer.isDown || game.input.pointer1.isDown){
      window.game.events.emit('newDay');
      this.currentWaitingTime = 0;
      this.waitInputs = false;
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
