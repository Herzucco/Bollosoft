function textures(game) {
    game.load.atlasJSONHash('proto', 'assets/sprites/proto.png', 'assets/sprites/proto.json');

    game.load.image('BlueBubble', 'assets/images/proto/BlueBubble.png');
    game.load.image('PurpleBubble', 'assets/images/proto/PurpleBubble.png');

    game.load.image('testFace', 'assets/images/protoGreug/1.png');
    game.load.image('leftBackground', 'assets/images/prod/écran_gauche/fond.png');
    game.load.image('rightBackground', 'assets/images/prod/fond_ecran_droite.png');
    game.load.image('canap', 'assets/images/prod/écran_gauche/canap.png');

    game.load.atlasJSONHash('bolloSprite', 'assets/sprites/bollo.png', 'assets/sprites/bollo.json');
    game.load.atlasJSONHash('guiguiSprite', 'assets/sprites/guigui.png', 'assets/sprites/guigui.json');
    game.load.atlasJSONHash('devsSprite', 'assets/sprites/devs.png', 'assets/sprites/devs.json');

    game.load.image('bblack', 'assets/images/bblack.png');
    game.load.image('bblue', 'assets/images/bblue.png');
    game.load.image('bgreen', 'assets/images/bgreen.png');
    game.load.image('bbrown', 'assets/images/bbrown.png');
    game.load.image('bpurple', 'assets/images/bpurple.png');
    game.load.image('opacityCalq', 'assets/images/prod/rectangleblanc.png');

    game.load.image('moulard', 'assets/images/prod/moulard/moulard1.png');
    game.load.image('black', 'assets/images/prod/black/black1.png');
    game.load.image('breton', 'assets/images/prod/breton/breton1.png');
    game.load.image('iwata', 'assets/images/prod/iwata/iwata1.png');
    game.load.image('kojima', 'assets/images/prod/kojima/kojima1.png');
    game.load.image('etudiante', 'assets/images/prod/étudiante/étudiante1.png');

    game.load.image('Hanouna', 'assets/images/slides/slide1.png');
}

module.exports = textures;
