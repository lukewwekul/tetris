
var $game, $appHelper, $lineDestroy, $block, $key,

    $lvl, $lines,
    $destroy = {base: null, exponent: null},
    $gameOver = {info1: null, info2: null, info3: null,};



class InfoAndLvlController {

    constructor(game, appHelper, lineDestroy){
        $game = game;
        $appHelper = appHelper;
        $lineDestroy = lineDestroy;
    }

    make(argBlock, argKey){
        maker(argBlock);
        $key = argKey;
    }

    check(){
        checkInfo();
        checkGameOver();
    }
}


function maker(argBlock, argKey){
    $block = argBlock;
    $key = argKey;
    $lvl = makeBitmapText(10, 10, 'lvl ' + $appHelper.lvl, 25);
    $lines = makeBitmapText(15, 40, $appHelper.linesToNextLvl, 25);
    $destroy.base = makeBitmapText(170, 20, '-3', 45);
    $destroy.exponent = makeBitmapText(218, 15, '2', 20);

    gameOverMaker();
}


function makeBitmapText(argPosX, argPosY, argText, argFontSize){
    var tmpObj = $game.add.bitmapText(argPosX, argPosY, 'nokia', argText, argFontSize);
    tmpObj.alpha = 0;
    return tmpObj;
}


function checkInfo(){
    if ($appHelper.numberOfDestroyedLinesNow) {
        setDestroy();
        setLinesToNextLvl();
    }
    checkAlpha();
}


function setLinesToNextLvl(){
    $appHelper.oddLinesToNextLvl($appHelper.numberOfDestroyedLinesNow * $appHelper.numberOfDestroyedLinesNow);
    if ($appHelper.linesToNextLvl>0) $lines.text = $appHelper.linesToNextLvl;
    else {winLvl();}
    $lines.alpha = 1;
}


function setDestroy(){
    $destroy.base.text = '-' + $appHelper.numberOfDestroyedLinesNow;
    $destroy.base.alpha = 1;
    $destroy.exponent.alpha = 1;
}


function winLvl(){
    $lines.text = 0;
    $lineDestroy.destroyAll($block);
    nextLvl();
}


function nextLvl(){
    $appHelper.nextLvl();
    $appHelper.addLinesToNextLvl();
    $appHelper.addShapeSpeed();
    refreshHudInfo();
}


function refreshHudInfo(){
    $lvl.text = 'lvl ' + $appHelper.lvl;
    $lvl.alpha = 1;
    $lines.text = $appHelper.linesToNextLvl;
    $lines.alpha = 1;
}

function checkAlpha(){
    oddAlpha($lvl, 0.15, 0.0025);
    oddAlpha($lines, 0.15, 0.01);
    oddAlpha($destroy.base, 0, 0.005);
    oddAlpha($destroy.exponent, 0, 0.005);
}

function oddAlpha(argObj, argMinAlpha, argOddSpeed){
    if (argObj.alpha > argMinAlpha) argObj.alpha -= argOddSpeed;
    else argObj.alpha = argMinAlpha;
}



function gameOverMaker(){
    $gameOver.info1 = makeGameOverBitMapText(170, 'GAME OVER', 40);
    $gameOver.info2 = makeGameOverBitMapText(225, 'you have reached ' + $appHelper.lvl + ' level', 17);
    $gameOver.info3 = makeGameOverBitMapText(260, 'and destroyed', 17);
    $gameOver.info4 = makeGameOverBitMapText(300, 'nice', 30);
    $gameOver.info5 = makeGameOverBitMapText(340, 'play again', 30);
    $gameOver.info6 = makeGameOverBitMapText(340, '->', 30);
    $gameOver.info6.img.x = 215;
    $gameOver.info6.img.angle = 90;

}


function makeGameOverBitMapText(argPosY, argText, argFontSize){
    var tmpObj = new TextGameOverClass(argPosY, argText, argFontSize);
    tmpObj.img.alpha = 0;
    tmpObj.img.anchor.setTo(0.5);
    tmpObj.img.visible = false;
    return tmpObj;
}

function TextGameOverClass(argPosY, argText, argFontSize){
    this.posX = $game.world.centerX;
    this.posY = argPosY;
    this.img = makeBitmapText($game.world.centerX, argPosY, argText, argFontSize);
}


function showGameOverInfo(argFL){
    for (var i=1; i<7; i++){
        var tmpName = 'info'+i;
        if (argFL){
            if (!$gameOver[tmpName].img.visible) $gameOver[tmpName].img.visible = true;
            if ($gameOver[tmpName].img.alpha<1) $gameOver[tmpName].img.alpha += 0.025;
        }
        else if($gameOver[tmpName].img.visible){
            if ($gameOver[tmpName].img.alpha>0) $gameOver[tmpName].img.alpha -= 0.05;
            else $gameOver[tmpName].img.visible = false;
        }
    }
    return argFL;
}

function checkGameOver(){
    if (showGameOverInfo($appHelper.gameOverFL)) {
        setGameOverInfo();
        if (($key.Down.isDown || $key.S.isDown)&&$gameOver.info1.img.alpha>0.99){
            $lineDestroy.destroyAll($block);
            $appHelper.resetGame();
            refreshHudInfo();
        }
    }
}


function setGameOverInfo(){
    $gameOver.info2.img.text =  'you have reached '
                                + $appHelper.lvl
                                + ' level';

    $gameOver.info3.img.text =  'and destroyed '
                                + $appHelper.numberOfDestroyedLinesAllGame * $appHelper.rangeX
                                + ' blocks';

    $gameOver.info4.img.text = compliment();
}


function compliment(){
    var tmpCompliment = '';
    if ($appHelper.lvl > 12) tmpCompliment = 'magnificent';
    else if ($appHelper.lvl > 10) tmpCompliment = 'wonderful';
    else if ($appHelper.lvl > 8) tmpCompliment = 'super';
    else if ($appHelper.lvl > 6) tmpCompliment = 'cool';
    else if ($appHelper.lvl > 4) tmpCompliment = 'nice';
    else if ($appHelper.lvl > 2) tmpCompliment = 'not bad';
    else tmpCompliment = 'be better';

    return tmpCompliment;
}


module.exports = InfoAndLvlController;
