var Layout = require('./layout');

function SlideShow(){
  Layout.call(this);

}

SlideShow.prototype = Object.create(Layout.prototype);
SlideShow.prototype.constructor = SlideShow;
SlideShow.prototype.update = function SlideShowUpdate(game){
  Layout.prototype.update.call(this, game);
}

module.exports = SlideShow;
