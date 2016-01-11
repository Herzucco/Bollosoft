function texts(game) {
    var texts = [
      require('json!dialogbundle!../../assets/text/yaml/scene0.yml'),
      require('json!dialogbundle!../../assets/text/yaml/scene1.yml'),
      require('json!dialogbundle!../../assets/text/yaml/scene2.yml'),
      require('json!dialogbundle!../../assets/text/yaml/scene3.yml'),
      require('json!dialogbundle!../../assets/text/yaml/scene4.yml'),
      require('json!dialogbundle!../../assets/text/yaml/scene6.yml'),
    ];

    game.texts = texts;
}

module.exports = texts;
