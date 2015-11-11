function texts(game) {
    var texts = {
      'Prince Of Tunis' : require('json!dialogbundle!../../assets/text/yaml/test.yml'),
    };

    game.texts = texts;
}

module.exports = texts;
