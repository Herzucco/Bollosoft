var Layout = require('./layout');

function EndDay(){
  Layout.call(this);

  this.metacritic = 80;
  this.bolloRate = 10;

  this.metaTxt = window.game.add.text(200, 200, "Metacritic : " + this.metacritic, { font: "65px Arial", fill: "#ff0044", align: "center" });
  this.bolloTxt = window.game.add.text(200, 400, "Actions de Bollobails : " + this.bolloRate, { font: "65px Arial", fill: "#ff0044", align: "center" });

  this.group.add(this.metaTxt);
  this.group.add(this.bolloTxt);

  //this.enable();
}

EndDay.prototype = Object.create(Layout.prototype);
EndDay.prototype.constructor = EndDay;
EndDay.prototype.update = function EndDayUpdate(game){
  Layout.prototype.update.call(this, game);

  this.metaTxt.text = "Metacritic : " + this.metacritic;
  this.bolloTxt.text = "Actions de Bollobails : " + this.bolloRate;
}

module.exports = EndDay;
