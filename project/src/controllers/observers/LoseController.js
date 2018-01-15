
var $game, $appHelper;

class LoseController {

    constructor(game, appHelper){
        $game = game;
        $appHelper = appHelper;
    }

    make(){
    }

    check(argBlock){
        checkDeadLine(argBlock);
    }
}



function checkDeadLine(argBlock){
    var tmpGameOverFL = false;
    //console.log('check game over j: ' + $appHelper.lastLine);
    for (var j=$appHelper.lastLine+1; j<$appHelper.blockArrHeight; j++){

        for (var i=$appHelper.firstColumn; i<$appHelper.lastColumn+1; i++){
            if (argBlock[i][j].cover.frame) tmpGameOverFL = true;
        }
    }

    if (tmpGameOverFL) {$game.camera.shake(0.002, 1000); console.log('game over');}
    return tmpGameOverFL;
}


module.exports = LoseController;
