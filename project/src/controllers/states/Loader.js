var Assets = require('../../managers/Assets');

var $game, $assets;

class Loader {

    constructor(game){
        $game = game;
        $assets = new Assets($game);

    }

    preload(){
        $assets.loadAssets();
    }

    create(){
        console.log('loader ...');
        $game.state.start('Play');
    }

    update(){

    }

}


module.exports = Loader;
