
var $game, $appHelper, $key,

    $title, $orTxt, $AWSD, $arrows,
    $disappearIntroFL = false;



class IntroController {

    constructor(game, appHelper){
        $game = game;
        $appHelper = appHelper;
    }

    make(argBlock, argKey){
        maker(argBlock);
        $key = argKey;
    }

    check(){
        if ($disappearIntroFL) disappearIntro();
        else checkPressKey();
    }
}


function maker(argBlock){
    $title = $game.add.bitmapText($game.world.centerX, 0.55*$game.world.centerY, 'nokia', 'TETRIS', 60);
    $title.anchor.setTo(0.5);
    $title.alpha = 0.9;
    $orTxt = $game.add.bitmapText($game.world.centerX, 0.9*$game.world.centerY, 'nokia', 'or', 20);
    $orTxt.anchor.setTo(0.5);
    $orTxt.alpha = 0.9;
    $orTxt.visible = false;

    $AWSD = makeImgKeys(['A', 'S', 'D', 'W'], 0.5*$game.world.centerX, $game.world.centerY, 30, -10, false);

    $arrows = makeImgKeys(['<-'], 1.5*$game.world.centerX, $game.world.centerY, 30, 10, true);
}



function makeImgKeys(argArr, argPosX, argPosY, argOffset, argAngle, argArrowFL){
    var tmpObj = $game.add.group();

    for (var i=0; i<4; i++){
        var tmpNrIndx;
        argArrowFL ? tmpNrIndx = 0 : tmpNrIndx = i;
        var tmpKey = $game.add.bitmapText(0, 0, 'nokia', argArr[tmpNrIndx], 25);
        tmpKey.anchor.setTo(0.5);
        tmpKey.position.setTo(-argOffset+i*argOffset, 0);
        tmpObj.add(tmpKey);
        argArrowFL ? tmpKey.angle=-90*i : tmpKey.angle=0;
        if (i>2){
            tmpKey.position.setTo(0, -argOffset);
        }
    }
    tmpObj.x = argPosX;
    tmpObj.y = argPosY;
    tmpObj.angle = argAngle;

    return tmpObj;
}


function disappearIntro(){
    disappear($title, 0.05);
    disappear($orTxt, 0.05);
    disappear($AWSD, 0.05);
    disappear($arrows, 0.05);
}


function disappear(argObj, argDisappearSpeed){
    if (argObj.visible) {
        if (argObj.alpha>argDisappearSpeed){
            argObj.alpha -= argDisappearSpeed;
        }
        else {
            argObj.alpha = 0;
            argObj.visible = false;
        }
    }
}


function checkPressKey(){
    if ($key.Left.isDown || $key.A.isDown || $key.Up.isDown ||$key.W.isDown ||
        $key.Down.isDown || $key.S.isDown || $key.Right.isDown ||$key.D.isDown){
            $disappearIntroFL = true;
            $appHelper.resetGame();
        }
}


module.exports = IntroController;
