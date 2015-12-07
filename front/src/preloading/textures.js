function textures(game) {
    game.load.atlasJSONHash('testFace', 'assets/sprites/testFace.png', 'assets/sprites/testFace.json');
    game.load.atlasJSONHash('proto', 'assets/sprites/proto.png', 'assets/sprites/proto.json');

    game.load.image('BlueBubble', 'assets/images/proto/BlueBubble.png');
    game.load.image('PurpleBubble', 'assets/images/proto/PurpleBubble.png');
}

module.exports = textures;
