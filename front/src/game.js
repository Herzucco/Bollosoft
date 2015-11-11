function game(preload, create){
  return new window.Phaser.Game(800, 600, Phaser.AUTO, 'Bolloqués', { preload: preload, create: create });
}

module.exports = game;
