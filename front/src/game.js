function game(preload, create, loop){
  return new window.Phaser.Game(800, 600, Phaser.AUTO, 'Bolloqués', { preload: preload, create: create, render: loop });
}

module.exports = game;
