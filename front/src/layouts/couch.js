var Layout = require('./layout');

function Couch(){
  Layout.call(this);

}

Couch.prototype = Object.create(Layout.prototype);
Couch.prototype.constructor = Couch;
Couch.prototype.update = function CouchUpdate(game){
  Layout.prototype.update.call(this, game);
}

module.exports = Couch;
