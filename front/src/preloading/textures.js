function textures(game) {
    game.load.image('leftBackground', 'assets/images/prod/left_screen/fond.png');
    game.load.image('rightBackground', 'assets/images/prod/fond_ecran_droite.png');
    game.load.image('canap', 'assets/images/prod/left_screen/canap.png');
    game.load.image('bolloDos', 'assets/images/prod/left_screen/bolodos.png');
    game.load.image('iwataTexture', 'assets/images/prod/iwata.png');
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
    game.load.image('saison', 'assets/images/saison1.png');
    game.load.image('cinqyou', 'assets/images/Cinqyou.png');

    game.load.image('black', 'assets/images/prod/black/black1.png');
    game.load.image('moulard', 'assets/images/prod/moulard/moulard1.png');
    game.load.image('breton', 'assets/images/prod/breton/breton1.png');
    game.load.image('etudiante', 'assets/images/prod/student/student1.png');
    game.load.image('iwata', 'assets/images/prod/iwata/iwata1.png');
    game.load.image('kojima', 'assets/images/prod/kojima/kojima1.png');
    game.load.image('alldevs', 'assets/images/prod/allDevs.png');


    game.load.image('Hanouna', 'assets/images/slides/slide1.png');
    game.load.image('PT', 'assets/images/slides/slide2.png');
    game.load.image('CoD', 'assets/images/slides/slide3.png');
    game.load.image('MaitenMagic', 'assets/images/slides/slide4.png');
    game.load.image('ForBollor', 'assets/images/slides/slide5.png');
    game.load.image('Bolloques', 'assets/images/slides/slide7.png');

    game.load.image('bgDemo', 'assets/images/prod/bgDemo.png');
    game.load.image('bollotete', 'assets/images/bollotete.png');
    game.load.image('ubi', 'assets/images/ubi.png');
    game.load.image('rez', 'assets/images/fonddelaphase1.png');
    game.load.image('ligneblanche', 'assets/images/ligneblanche.png');
}

module.exports = textures;
