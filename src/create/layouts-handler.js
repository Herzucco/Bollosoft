var DialogPannel = require('../layouts/dialogPannel');
var EndDay = require('../layouts/endDay');
var Answer = require('../layouts/answer');
var SlideShow = require('../layouts/slideShow');
var Couch = require('../layouts/couch');
var SplashScreen = require('../layouts/splashScreen');
var Credits = require('../layouts/credits');
var Demoscene = require('../layouts/demoscene');

function layoutsHandler(dayConfig){
  var layouts = [];

  layouts.push(new SlideShow());
  layouts.push(new Couch());
  layouts.push(new Answer());
  layouts.push(new DialogPannel());
  layouts.push(new EndDay());
  layouts.push(new SplashScreen());
  layouts.push(new Demoscene());
  layouts.push(new Credits());

  game.layouts = layouts;
}

module.exports = layoutsHandler;
