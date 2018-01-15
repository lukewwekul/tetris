

var $game, $appHelper;

class LineDestroyer {

    constructor(game, appHelper){
        $game = game;
        $appHelper = appHelper;
    }

    make(){
    }

    check(argBlock){
        checkFullLine(argBlock);
    }
}



function checkFullLine(argBlock){
    var tmpDistroyLineFL = true;
    for (var j=$appHelper.firstLine; j<$appHelper.lastLine; j++){
        tmpDistroyLineFL = true;
        for (var i=$appHelper.firstColumn; i<$appHelper.lastColumn+1; i++){
            if (!argBlock[i][j].coverNr) tmpDistroyLineFL = false;
        }
        if (tmpDistroyLineFL) distroyLine(argBlock, j);
    }
}


function distroyLine(argBlock, argY){
    for (var k=$appHelper.firstColumn; k<$appHelper.lastColumn+1; k++){
        argBlock[k][argY].particle.makeParticles('blocks', argBlock[k][argY].coverNr);
        //argBlock[k][argY].particle.frame = argBlock[k][argY].coverNr;
        argBlock[k][argY].coverNr = 0;
        argBlock[k][argY].cover.frame = argBlock[k][argY].coverNr;
        //$game.world.bringToTop(argBlock[k][argY].particle);
        //argBlock[k][argY].particle.frame = 7;
        argBlock[k][argY].particle.start(true, 3000, null, 1);
    }
}



module.exports = LineDestroyer;
