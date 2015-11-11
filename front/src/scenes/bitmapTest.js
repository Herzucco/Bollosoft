/**
 * Created by Adrien on 10/10/2015.
 */
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {
    game.load.bitmapFont('patapa', 'assets/fonts/patapa/font.png', 'assets/fonts/patapa/font.xml');
}

var bmpText;
var text = "";
var words = [
    'dolor', 'sit', 'amet', 'consectetuer', 'adipiscing', 'elit', 'aenean',
    'commodo', 'ligula', 'eget', 'massa', 'sociis', 'natoque', 'penatibus',
    'et', 'magnis', 'dis', 'parturient', 'montes' ];
var run = 5;
var current = 2;
var marker;

function create() {

    game.stage.backgroundColor = 0x272822;

    marker = game.add.graphics(20, 420);
    marker.beginFill('black');
    marker.drawRect(0, 0, 750, 140);
    marker.endFill();

    bmpText = game.add.bitmapText(32, 440, 'patapa', text, 24);
    bmpText.smoothed = false;
    // bmpText = game.add.bitmapText(32, 32, 'gem', text, 32);

    //  Any one line in the bitmap text won't be longer than 400 pixels.
    //  The exception to this rule is if the text has no spaces.
    //  It line-wraps on spaces and word length.
    bmpText.maxWidth = 735;

    //  Write out 200 random words
    game.time.events.repeat(100, 30, addText, this);

}

function addText() {

    var word = game.rnd.pick(words);

    if (current === 0)
    {
        //  Upper-case the first character of a new sentence
        word = word[0].toUpperCase() + word.slice(1);
    }

    text += word;

    current++;

    if (current === run)
    {
        text += ". ";
        run = game.rnd.between(3, 6);
        current = 0;
    }
    else
    {
        text += " ";
    }

    bmpText.text = text;
    bmpText.y -= 1;
    marker.y -= 1;
}
