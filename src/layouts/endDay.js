var Layout = require('./layout');

function EndDay(){
  Layout.call(this);

  this.metacritic = 80;
  this.bolloRate = 11;

  this.metaImage = window.game.add.sprite(140, 280, 'metacritic');
  this.metaImage.tint = 0x66cc33;
  this.metaImage.width = 200;
  this.metaImage.height = 200;
  this.group.add(this.metaImage);

  this.playerGraphics = game.add.graphics(640, 380);
  this.playerGraphics.lineStyle(6, 0x333333);
  this.playerGraphics.beginFill(0x925c4d);
  this.playerGraphics.arc(0, 0, 100, game.math.degToRad(-20), game.math.degToRad(0), true);
  this.playerGraphics.endFill();
  this.ubiGtaphics = game.add.graphics(640, 380);
  this.ubiGtaphics.lineStyle(6, 0x333333);
  this.ubiGtaphics.beginFill(0x8b4d92);
  this.ubiGtaphics.arc(0, 0, 100, game.math.degToRad(0), game.math.degToRad(mapRange([100, 0], [0, 360], 9)), true);
  this.ubiGtaphics.endFill();
  this.bolloGraphics = game.add.graphics(640, 380);
  this.bolloGraphics.lineStyle(6, 0x333333);
  this.bolloGraphics.beginFill(0x554d92);
  this.bolloGraphics.arc(0, 0, 100, game.math.degToRad(mapRange([0, 100], [0, 360], this.bolloRate)), game.math.degToRad(-7), true);
  this.bolloGraphics.endFill();
  this.group.add(this.playerGraphics);
  this.group.add(this.ubiGtaphics);
  this.group.add(this.bolloGraphics);

  this.metaInfo = window.game.add.text(90, 205, "Metascore" , { font: "65px Arial", fill: "#333333", align: "center" });
  this.metaTxt = window.game.add.text(this.metaImage.x + 45, this.metaImage.y + 45, this.metacritic, { font: "100px Arial", fill: "#ffffff", align: "center" });
  this.bolloInfo = window.game.add.text(535, 205, "Actions", { font: "65px Arial", fill: "#333333", align: "center" });
  this.bolloTxt = window.game.add.text(485, 505, "Bolloré "+this.bolloRate+"%", { font: "65px Arial", fill: "#554d92", align: "center" });
  this.group.add(this.metaInfo);
  this.group.add(this.metaTxt);
  this.group.add(this.bolloInfo);
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
    that.bolloGraphics.beginFill(0x554d92);
    that.bolloGraphics.arc(0, 0, 100, game.math.degToRad(mapRange([0, 100], [0, 360], that.bolloRate)), game.math.degToRad(-7), true);
    that.bolloGraphics.endFill();

    that.enable();
  });

  this.spaceKey = window.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.enterKey = window.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
}

var mapRange = function(from, to, s) {
  return to[0] + (s - from[0]) * (to[1] - to[0]) / (from[1] - from[0]);
};

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
  this.metaTxt.text = this.metacritic;
  this.bolloTxt.text = "Bolloré "+this.bolloRate+"%";

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
