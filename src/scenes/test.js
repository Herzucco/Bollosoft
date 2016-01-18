/**
 * Created by Adrien on 07/10/2015.
 */
console.log("erding");
console.log(require('../shaders/shader-test.glsl'));
console.log(require('../text/chunks/test.txt'));

var c = require('json!dialogbundle!../text/yaml/test.yml');
console.log(c);
console.log(c.dialog.text[0].node.content[0].text[0].fr);

module.exports = {e : "5"};