
var $game, $appHelper, $lineDestroy, $block,

    $lvl, $lines,
    $destroy = {base: null, exponent: null};



class InfoController {

    constructor(game, appHelper, lineDestroy){
        $game = game;
        $appHelper = appHelper;
        $lineDestroy = lineDestroy;
    }

    make(argBlock){
        maker(argBlock);
    }

    check(){
        checkInfo();
    }
}


function maker(argBlock){
    $block = argBlock;
    $lvl = makeBitmapText(10, 10, 'lvl ' + $appHelper.lvl, 25);
    $lines = makeBitmapText(15, 40, $appHelper.linesToNextLvl, 25);
    $destroy.base = makeBitmapText(170, 20, '-3', 45);
    $destroy.exponent = makeBitmapText(218, 15, '2', 20);
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
    $appHelper.setLinesToNextLvl(5 + 5*$appHelper.lvl);
    $appHelper.addShapeSpeed();
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


module.exports = InfoController;
