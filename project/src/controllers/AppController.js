var Boot = require('./states/Boot');
var Loader= require('./states/Loader');
var Play = require('./states/Play');

var $game, $boot, $loader, $play;

class AppController {

    constructor(id){
        $game = new Phaser.Game(238, 459, Phaser.AUTO, id, this, true);
        $boot = new Boot($game);
        $loader = new Loader($game);
        $play = new Play($game);
    }

    preload(){
        $game.state.add('Boot', $boot);
        $game.state.add('Loader', $loader);
        $game.state.add('Play', $play);

        //$game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //$game.input.maxPointers = 1;
        //$game.stage.disapleVisibilityChange = true;
    }

    create(){
        console.log('gameController ...');
        $game.state.start('Boot');
    }

    update(){
    }

}


module.exports = AppController;
