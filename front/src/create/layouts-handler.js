var DialogPannel = require('../layouts/dialogPannel');
var GreugProtoPannel = require('../layouts/greugProtoPannel');
var EndDay = require('../layouts/endDay');

function layoutsHandler(dayConfig){
  var layouts = [];

  layouts.push(new DialogPannel());
  layouts.push(new GreugProtoPannel());
  layouts.push(new EndDay());
  
  game.layouts = layouts;
}

module.exports = layoutsHandler;
