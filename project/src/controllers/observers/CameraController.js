

var $game, $appHelper, $key,
    $block, $shape,
    $focusShapeFL = false, $focusLineFL = false;

class CameraController {

    constructor(game, appHelper, key, block, shape){
        $game = game;
        $appHelper = appHelper;
        $key = key;
        $block = block;
        $shape = shape;
    }

    check(){
        cameraMan();
        if ($focusShapeFL) testCamera();
        else cameraReturn();
    }

}



function cameraMan(){
    if ($key.Down.isDown || $key.S.isDown){
        //$focusShapeFL = true;
        var tmpNrOfFEmptyLineBelow = 0;
        for (var i=$shape.y; i>$appHelper.firstLine; i--){
            if (!$block[$shape.x][i].coverNr){
                tmpNrOfFEmptyLineBelow += 1;
            }
            else break;
        }
        if (tmpNrOfFEmptyLineBelow > 14) $focusShapeFL = true;
        if (tmpNrOfFEmptyLineBelow < 3) {$game.camera.follow($block[$shape.x][$shape.y].cover); $focusShapeFL = false;}
    }
    else $focusShapeFL = false;


    if ($shape.y>$appHelper.lastLine-3){
        $focusShapeFL = false;
    }



    if ($key.Left.isDown || $key.A.isDown){
        $focusShapeFL = false;
    }
    if ($key.Right.isDown || $key.D.isDown){
        $focusShapeFL = false;
    }
    if ($key.Up.isDown || $key.W.isDown){
        $focusShapeFL = false;
    }
}


function testCamera(){
    focusShape();

    /*$game.camera.scale.x += 0.0006;
    $game.camera.scale.y += 0.0006;*/
    //$game.camera.bounds.x = -120;
    //$game.camera.bounds.y = 70;
    //$game.camera.scale.x = 3;
    //$game.camera.scale.y = 3;
    //$game.time.slowMotion = 1;

    //$game.camera.follow($block[7][11].bottom);
    //$game.camera.follow($shape.shape.img);
}


function zoomIn(argHwMn, argHwFst, argSlowFL){
    if ($game.camera.scale.x < argHwMn){
    $game.camera.scale.x += argHwFst;
    $game.camera.scale.y += argHwFst;
    if (argSlowFL) $game.time.slowMotion += argHwFst;
    };
}

function zoomOut(argHwFst){
    if ($game.camera.scale.x > 1){
    $game.camera.scale.x -= argHwFst;
    $game.camera.scale.y -= argHwFst;
        if ($game.time.slowMotion>1) {
            $game.time.slowMotion -= argHwFst;
        }
    }
    else {
     $game.camera.scale.x = 1;
     $game.camera.scale.y = 1;
     $game.time.slowMotion = 1;
    }

}


function rotation(argHwMn){
    $game.world.rotation = argHwMn;
}


function shake(argHwMn, argHwLong){
    $game.camera.shake(argHwMn, argHwLong);
}


function fallow(argTarget){
    $game.camera.follow(argTarget);
}



function focusShape(){
    rotation(0.05);
    shake(0.006, 100);
    zoomIn(3, 0.1, false);
    $game.camera.follow($shape.img);

}



function cameraReturn(){
    zoomOut(0.1);
    rotationReturn(0.005, false);
    //$game.world.rotation = 0;
}


function rotationReturn(argHwFast, argSmoothFL){
    if ($game.world.rotation){
        if (argSmoothFL){
            if($game.world.rotation>argHwFast) $game.world.rotation -= argHwFast;
            else if($game.world.rotation<argHwFast) $game.world.rotation += argHwFast;
            else $game.world.rotation = 0;
        }
        else $game.world.rotation = 0;
    }
}


module.exports = CameraController;
