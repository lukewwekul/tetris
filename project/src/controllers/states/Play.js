var BoardController = require('../BoardController');

var $game, $boardCtrl;

class Play {


    constructor(game){

        $game = game;
        $boardCtrl = new BoardController($game);
    }


    preload(){
        
    }


    create(){
        $game.camera.flash(0x191919, 1250);
        console.log('play ...');
        //$game.time.advancedTiming = true;
        $boardCtrl.make();
    }


    update(){
        $boardCtrl.check();
    }


    render() {
	//$game.debug.text($game.time.fps + ' fps', 2, 14, "#00ff00");
    }

}


module.exports = Play;
