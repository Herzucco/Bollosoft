function textures(game) {
    game.load.atlasJSONHash('proto', 'assets/sprites/proto.png', 'assets/sprites/proto.json');

    game.load.image('BlueBubble', 'assets/images/proto/BlueBubble.png');
    game.load.image('PurpleBubble', 'assets/images/proto/PurpleBubble.png');

    game.load.image('testFace', 'assets/images/protoGreug/1.png');
    game.load.image('leftBackground', 'assets/images/prod/left_screen/fond.png');
    game.load.image('rightBackground', 'assets/images/prod/fond_ecran_droite.png');
    game.load.image('canap', 'assets/images/prod/left_screen/canap.png');
    game.load.image('iwataTexture', 'assets/images/prod/iwata.png');
    game.load.image('bollorate', 'assets/images/bollorate.png');
    game.load.image('metacritic', 'assets/images/metacritic.png');

    game.load.atlasJSONHash('bolloSprite', 'assets/sprites/bollo.png', 'assets/sprites/bollo.json');
    game.load.atlasJSONHash('guiguiSprite', 'assets/sprites/guigui.png', 'assets/sprites/guigui.json');
    game.load.atlasJSONHash('devsSprite', 'assets/sprites/devs.png', 'assets/sprites/devs.json');

    game.load.image('bblack', 'assets/images/bblack.png');
    game.load.image('bblue', 'assets/images/bblue.png');
    game.load.image('bgreen', 'assets/images/bgreen.png');
    game.load.image('bbrown', 'assets/images/bbrown.png');
    game.load.image('bpurple', 'assets/images/bpurple.png');
    game.load.image('opacityCalq', 'assets/images/prod/rectangleblanc.png');
    game.load.image('oui', 'assets/images/ui/ok.png');
    game.load.image('non', 'assets/images/ui/non.png');
    game.load.image('splashScreen', 'assets/images/splash.png');
    game.load.image('credits', 'assets/images/credits.png');
    
    game.load.image('Hanouna', 'assets/images/slides/slide1.png');
    game.load.image('PT', 'assets/images/slides/slide2.png');
    game.load.image('CoD', 'assets/images/slides/slide3.png');
}

module.exports = textures;
