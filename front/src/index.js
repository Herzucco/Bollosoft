/**
 * Created by Adrien on 07/10/2015.
 */

//Preloading script
var preload = require('./preloading');

//create script (start of the game)
var create = require('./create');

//The main loop function
var loop = require('./loop');

//booting the game (global scope for convenience)
 window.game = require('./game')(preload, create, loop);
