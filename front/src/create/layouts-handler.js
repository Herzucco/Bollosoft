var DialogPannel = require('../layouts/dialogPannel');

function layoutsHandler(dayConfig){
  var layouts = [];

  layouts.push(new DialogPannel());
  game.layouts = layouts;
}

module.exports = layoutsHandler;
