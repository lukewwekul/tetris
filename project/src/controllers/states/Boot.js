var $game;

class Boot {

    constructor(game){
        $game = game;
    }

    preload(){

    }

    create(){
        console.log('boot ...');
        //$game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        $game.state.start('Loader');
    }

    update(){
    }

}


module.exports = Boot;
