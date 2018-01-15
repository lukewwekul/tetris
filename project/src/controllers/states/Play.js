var BoardController = require('../BoardController');

var $game, $boardCtrl;

class Play {


    constructor(game){

        $game = game;
        $boardCtrl = new BoardController($game);
    }


    preload(){
        //$game.camera.fade(0x111111, 1000);
    }


    create(){
        console.log('play ...');
        $game.time.advancedTiming = true;
        $boardCtrl.make();
        //$game.camera.bounds.x = -200;
        //$game.camera.bounds.y = -200;
        //$game.camera.scale.x = 3;
        //$game.camera.scale.y = 3;
        //$game.time.slowMotion = 4.0;
    }


    update(){
        $boardCtrl.check();
        //$game.world.rotation += 0.001;
        //$game.camera.y += 1;
        //$game.camera.shake(0.002, 1000);
        //$game.camera.scale.x += 0.001;
        //$game.camera.scale.y += 0.001;
    }


    render() {
	$game.debug.text($game.time.fps + ' fps', 2, 14, "#00ff00");
    /*$game.debug.text('game camera pos ' + $game.camera.x + ', ' + $game.camera.y, 2, 34, "#00ff00");
    $game.debug.text('game scale ' + $game.camera.scale.x + ', ' + $game.camera.scale.y, 2, 54, "#00ff00");
    $game.debug.text('game bounds ' + $game.camera.bounds.x + ', ' + $game.camera.bounds.y, 2, 74, "#00ff00");
    $game.debug.text('game bounds width/height' + $game.camera.bounds.width + ', ' + $game.camera.bounds.height, 2, 94, "#00ff00");*/
    }

}


module.exports = Play;
