
var $game, $appHelper,
    $configurations, $conf,
    $shapesList,
    $startFL = true,
    $key, $fallSpeed, $moveSpeed;

class ShapeController {

    constructor(game, appHelper, configurations){
        $game = game;
        $appHelper = appHelper;
        $configurations = configurations;
        $conf = $configurations.settings;
        $shapesList = $appHelper.shapesList;
    }

    make(argKey){
        $key = argKey;
        $fallSpeed = $conf.shape.fallSpeed;
        $moveSpeed = $conf.shape.moveSpeed;
    }

    check(argShape, argBlock){
        if ($startFL){start(argShape, argBlock);};
        checkInput(argShape, argBlock);
        fallShape(argShape, argBlock);
    }
}


function start(argShape, argBlock){
    putShape(argShape, argBlock);
    newShape(argShape, argBlock);
    loadRndShape(argShape);
    materializeShapeAnimation(argShape);
    $startFL = false;
}

function checkInput(argShape, argBlock){

    if ($key.Left.isDown || $key.A.isDown){
        if (checkMovePossibility(argShape, argBlock, 'left')){
            if (!argShape.moveXFL){
                var tmpX = argShape.x - 1,
                    tmpY = argShape.y;
                argShape.x = tmpX;
                var tmpPosX = argBlock[tmpX][tmpY].posX;

                argShape.moveX = $game.add.tween(argShape.img);
                argShape.moveX.to({x: tmpPosX}, $moveSpeed, Phaser.Easing.Linear.None);
                //argShape.moveX.to({x: tmpPosX}, 150, Phaser.Easing.Cubic.InOut);
                argShape.moveX.onComplete.add(onCompleteX);
                argShape.moveX.start();
                argShape.moveXFL = true;
                function onCompleteX(){argShape.moveXFL = false;}
            }
        }
    }


    if ($key.Right.isDown || $key.D.isDown){
        if (checkMovePossibility(argShape, argBlock, 'right')){
            if (!argShape.moveXFL){
                var tmpX = argShape.x + 1,
                    tmpY = argShape.y;
                argShape.x = tmpX;
                var tmpPosX = argBlock[tmpX][tmpY].posX;
                argShape.moveX = $game.add.tween(argShape.img);
                argShape.moveX.to({x: tmpPosX}, $moveSpeed, Phaser.Easing.Linear.None);
                //argShape.moveX.to({x: tmpPosX}, 150, Phaser.Easing.Cubic.InOut);
                argShape.moveX.onComplete.add(onCompleteX);
                argShape.moveX.start();
                argShape.moveXFL = true;
                function onCompleteX(){argShape.moveXFL = false;}
            }
        }
    }


    if ($key.Down.isDown || $key.S.isDown){
        argShape.moveY.timeScale = 5;
    } else {argShape.moveY.timeScale = 1;}


    if ($key.Up.isDown || $key.W.isDown){
        if (checkMovePossibility(argShape, argBlock, 'up')){
            if (!argShape.rotateFL){
                argShape.rotateNr += 1;
                argShape.rotateIndex>2 ? argShape.rotateIndex=0 : argShape.rotateIndex+=1;
                argShape.rotateAngle += 0.5*Math.PI;
                argShape.rotate = $game.add.tween(argShape.img);
                argShape.rotate.to({rotation:argShape.rotateAngle}, 150, Phaser.Easing.Linear.None);
                argShape.rotate.onComplete.add(onCompleteRotate);
                argShape.rotate.start();
                argShape.rotateFL = true;
                loadShapeShadow(argShape);
                function onCompleteRotate(){
                    argShape.rotateFL = false;
                }
                console.log('rotate ' + argShape.rotateIndex);
            }
        }
    }
}



function fallShape(argShape, argBlock){
    if (!argShape.moveYFL){
        if (checkMovePossibility(argShape, argBlock, 'down')){
            var tmpY = argShape.y - 1,
                tmpX = argShape.x;
            argShape.y = tmpY;
            var tmpPosY = argBlock[tmpX][tmpY].posY;
            argShape.moveY = $game.add.tween(argShape.img);
            argShape.moveY.to({y: tmpPosY}, $fallSpeed, Phaser.Easing.Linear.none);
            argShape.moveY.onComplete.add(onCompleteY);
            argShape.moveY.start();
            argShape.moveYFL = true;
            function onCompleteY(){argShape.moveYFL = false;}
        }

        else {
            putShape(argShape, argBlock);
            newShape(argShape, argBlock);
            loadRndShape(argShape);
            materializeShapeAnimation(argShape);
        }
    }
}



function checkMovePossibility(argShape, argBlock, argWhat){

    var tmpFreeMoveFL = true;

    switch(argWhat) {

        case 'down':
            for(var i=0; i<$conf.shape.rangeX; i++){
                for (var j=0; j<$conf.shape.rangeY; j++){
                    if (argShape.shapeShadow[i][j]
                        && argBlock[argShape.x + (j - $appHelper.shapeMiddleX)][argShape.y + (i - $appHelper.shapeMiddleY - 1)].cover.frame)
                     {
                         tmpFreeMoveFL = false;
                    }
                }
            }
        break;


        case 'left':
            for(var i=0; i<$conf.shape.rangeX; i++){
                for (var j=0; j<$conf.shape.rangeY; j++){
                    if (argShape.shapeShadow[i][j]
                        && argBlock[argShape.x + (j - $appHelper.shapeMiddleX) - 1][argShape.y + (i - $appHelper.shapeMiddleY)].cover.frame)
                     {
                         tmpFreeMoveFL = false;
                    }
                }
            }
        break;


        case 'right':
            for(var i=0; i<$conf.shape.rangeX; i++){
                for (var j=0; j<$conf.shape.rangeY; j++){
                    if (argShape.shapeShadow[i][j]
                        && argBlock[argShape.x + (j - $appHelper.shapeMiddleX) + 1][argShape.y + (i - $appHelper.shapeMiddleY)].cover.frame)
                     {
                         tmpFreeMoveFL = false;
                    }
                }
            }
        break;


        case 'up':
            var tmpRotateIndex = 0;
            argShape.rotateIndex>2 ? tmpRotateIndex=0 : tmpRotateIndex = argShape.rotateIndex+1;

            for(var i=0; i<$conf.shape.rangeX; i++){
                for (var j=0; j<$conf.shape.rangeY; j++){
                    if (argShape.shapes[argShape.shapeIndex][tmpRotateIndex][i][j]
                        && argBlock[argShape.x + (j - $appHelper.shapeMiddleX)][argShape.y + (i - $appHelper.shapeMiddleY)].cover.frame)
                     {
                         tmpFreeMoveFL = false;
                         $game.camera.shake(0.001, 50);
                    }
                }
            }
        break;

        default:
    }
    //if (!tmpFreeMoveFL) $game.camera.shake(0.001, 50);
    return tmpFreeMoveFL;
}


function putShape(argShape, argBlock){
    for(var i=0; i<$conf.shape.rangeX; i++){
        for (var j=0; j<$conf.shape.rangeY; j++){
            if (argShape.shapeShadow[i][j]) {
                argBlock[argShape.x + (j - $appHelper.shapeMiddleY)][argShape.y + (i - $appHelper.shapeMiddleX)].coverNr = argShape.colorIndex;
                argBlock[argShape.x + (j - $appHelper.shapeMiddleY)][argShape.y + (i- $appHelper.shapeMiddleX)].cover.frame = argBlock[argShape.x + (j - $appHelper.shapeMiddleY)][argShape.y + (i - $appHelper.shapeMiddleX)].coverNr;
            }
        }
    }
}

//put save copy
function putShape2(argShape, argBlock){
    for(var i=0; i<$conf.shape.rangeX; i++){
        for (var j=0; j<$conf.shape.rangeY; j++){
            if (argShape.shape[i][j].frame) {
                argBlock[argShape.x + (j - $appHelper.shapeMiddleY)][argShape.y + (i - $appHelper.shapeMiddleX)].coverNr = argShape.colorIndex;
                argBlock[argShape.x + (j - $appHelper.shapeMiddleY)][argShape.y + (i- $appHelper.shapeMiddleX)].cover.frame = argBlock[argShape.x + (j - $appHelper.shapeMiddleY)][argShape.y + (i - $appHelper.shapeMiddleX)].coverNr;
            }
        }
    }
}



function newShape(argShape, argBlock){
        shapeRestartPosition(argShape);
}


function shapeRestartPosition(argShape){
    argShape.x = argShape.startX;
    argShape.y = argShape.startY;
    argShape.img.x = argShape.startPosX;
    argShape.img.y = argShape.startPosY;
}


function loadShape2(argShape){
    var tmpRdmShape = $game.rnd.integerInRange(0, $shapesList.length-1),
        tmpRdmColor = $game.rnd.integerInRange(2, $conf.block.numberOfColors+2);
    for (var i=0; i<argShape.shape.length; i++){
        for (var j=0; j<argShape.shape[i].length; j++){
            if ($shapesList[tmpRdmShape][i][j]==1) argShape.shape[i][j].frame = argShape.colorIndex;
            else argShape.shape[i][j].frame = 0;
        }
    }
}


function loadRndShape(argShape){
    argShape.shapeIndex = $game.rnd.integerInRange(0, $shapesList.length-1);
    argShape.rotateIndex = $game.rnd.integerInRange(0, 3);
    argShape.colorIndex = $game.rnd.integerInRange(2, $conf.block.numberOfColors+1);
    console.log('new shape nr ' + argShape.shapeIndex + ', rotate ' + argShape.rotateIndex + ', color ' + argShape.colorIndex);
    loadShape(argShape);
}



function loadShape(argShape){

    for (var i=0; i<argShape.shape.length; i++){
        for (var j=0; j<argShape.shape[i].length; j++){
            if (argShape.shapes[argShape.shapeIndex][argShape.rotateIndex][i][j]==1) {
                argShape.shape[i][j].frame = argShape.colorIndex;
                argShape.shapeShadow[i][j] = argShape.shapes[argShape.shapeIndex][argShape.rotateIndex][i][j];
            }
            else {
                argShape.shape[i][j].frame = 0;
                argShape.shapeShadow[i][j] = 0;
            }
        }
    }

    resetShape(argShape);
}


function loadShapeShadow(argShape){
    for (var i=0; i<argShape.shapeShadow.length; i++){
        for (var j=0; j<argShape.shapeShadow[i].length; j++){
            if (argShape.shapes[argShape.shapeIndex][argShape.rotateIndex][i][j]) {
                argShape.shapeShadow[i][j] = argShape.shapes[argShape.shapeIndex][argShape.rotateIndex][i][j];
            }
            else {
                argShape.shapeShadow[i][j] = 0;
            }
        }
    }
    console.log('shape shadow: ' + argShape.shapeShadow);
}


function resetShape(argShape){
    argShape.rotateAngle = 0;
    argShape.img.rotation = argShape.rotateAngle;
    argShape.moveXFL = false;
    argShape.moveX.stop();

    //argShape.moveYFL = false;
    //argShape.moveY = $game.add.tween(argShape.img);
}


function materializeShapeAnimation(argShape){
    argShape.img.alpha = 0;
    argShape.materialize = $game.add.tween(argShape.img);
    argShape.materialize.to({alpha: 1}, 400, Phaser.Easing.Cubic.InOut);
    //argShape.moveX.to({x: tmpPosX}, 150, Phaser.Easing.Cubic.InOut);
    argShape.materialize.start();
}



module.exports = ShapeController;
