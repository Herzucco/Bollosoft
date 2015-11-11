var DialogPannel = require('../layouts/dialogPannel');
var GreugProtoPannel = require('../layouts/greugProtoPannel');

function layoutsHandler(dayConfig){
  var layouts = [];

  layouts.push(new GreugProtoPannel());
  game.layouts = layouts;
}

module.exports = layoutsHandler;
