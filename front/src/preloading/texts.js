function texts(game) {
    var texts = {
      'Prince Of Tunis' : require('json!dialogbundle!../../assets/text/yaml/scene1.yml'),
    };

    console.log(texts);
    game.texts = texts;
}

module.exports = texts;
