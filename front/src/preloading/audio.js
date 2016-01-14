function audio(game) {
    game.load.audio('bollore_voice_calm', ['assets/sounds/voix_bollore_calme.wav']);
    game.load.audio('bollore_voice_pissed', ['assets/sounds/voix_bollore_enerve.wav']);
    game.load.audio('door', ['assets/sounds/Porte.wav']);
    game.load.audio('slide', ['assets/sounds/Slide.wav']);
    game.load.audio('yes', ['assets/sounds/Boutton_oui.wav']);
    game.load.audio('no', ['assets/sounds/Boutton_non.wav']);
    game.load.audio('cursor', ['assets/sounds/Curseur.wav']);
    game.load.audio('projecteur', ['assets/sounds/Projecteur_loop_V2.wav']);
    game.load.audio('cawi_voice', ['assets/sounds/voix_cawi.wav']);
    game.load.audio('guillemot_voice', ['assets/sounds/voix_guillemot.wav']);
    game.load.audio('iwata_voice', ['assets/sounds/voix_iwata.wav']);
    game.load.audio('kojima_voice', ['assets/sounds/voix_kojima.wav']);
    game.load.audio('moulard_voice', ['assets/sounds/voix_moulard.wav']);
    game.load.audio('narrator_voice', ['assets/sounds/voix_narrateur.wav']);
    game.load.audio('enjmin_voice', ['assets/sounds/Voix_enjminienne.wav']);
    game.load.audio('narrateur_8bit', ['assets/sounds/narrateur_8bit.wav']);
    game.load.audio('badum', ['assets/sounds/Badum_tss.wav']);

    game.load.audio('splashScreen', ['assets/sounds/Bolloques.wav']);
    game.load.audio('Intro', ['assets/sounds/intro.wav']);
    game.load.audio('Generic', ['assets/sounds/music.wav']);
    game.load.audio('end', ['assets/sounds/end.wav']);
    game.load.audio('Demoscene', ['assets/sounds/Demoscene.wav']);
    game.load.audio('Demoscene2', ['assets/sounds/Demoscene_v2.wav']);
}

module.exports = audio;
