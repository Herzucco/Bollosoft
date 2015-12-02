var DialogPannel = require('../layouts/dialogPannel');
var GreugProtoPannel = require('../layouts/greugProtoPannel');
var EndDay = require('../layouts/endDay');
var Answer = require('../layouts/answer');
var SlideShow = require('../layouts/slideShow');
var Couch = require('../layouts/couch');

function layoutsHandler(dayConfig){
  var layouts = [];

  layouts.push(new DialogPannel());
  layouts.push(new GreugProtoPannel());
  layouts.push(new EndDay());
  layouts.push(new Answer());
  layouts.push(new SlideShow());
  layouts.push(new Couch());

  game.layouts = layouts;
}

module.exports = layoutsHandler;
