function game(preload, create, loop){
  console.log(loop);
  return new window.Phaser.Game(1920, 1080, Phaser.AUTO, 'Bolloqués', { preload: preload, create: create, render: loop });
}

module.exports = game;
