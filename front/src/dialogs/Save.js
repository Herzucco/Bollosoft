function Save(){
  var that = this;

  window.game.events.on('save', function(command){
    that.save(command[1], command[2]);
  });
}

Save.prototype.save = function SaveSave(key, value){
  localStorage.setItem(key, value);
}

Save.prototype.load = function SaveLoad(key){
  var value = localStorage.getItem(key);

  return value;
}

Save.prototype.check = function SaveCheck(key, neededValue){
  return (this.load(key) === neededValue);
}

module.exports = Save;
