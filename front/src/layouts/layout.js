function Layout(){
  this.group = window.game.add.group();
  this.disable();
}

Layout.prototype.update = function LayoutUpdate(game){
}

Layout.prototype.enable = function LayoutEnable(game){
  this.group.visible = true;
}

Layout.prototype.disable = function LayoutDisable(game){
  this.group.visible = false;
}

module.exports = Layout;
