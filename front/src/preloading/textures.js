function textures(game) {
    game.load.atlasJSONHash('proto', 'assets/sprites/proto.png', 'assets/sprites/proto.json');

    game.load.image('BlueBubble', 'assets/images/proto/BlueBubble.png');
    game.load.image('PurpleBubble', 'assets/images/proto/PurpleBubble.png');
    game.load.image('roomBackground', 'assets/images/background/test.jpg');
}

module.exports = textures;
