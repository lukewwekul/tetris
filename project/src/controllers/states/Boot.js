var $game;

class Boot {

    constructor(game){
        $game = game;
    }

    preload(){

    }

    create(){
        console.log('boot ...');
        $game.state.start('Loader');
    }

    update(){
    }

}


module.exports = Boot;
