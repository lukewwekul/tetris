var Shapes = require('../../Configurations/Shapes');

var $game, $configurations, $conf,
    $shapes, $shapesList, $shapesListRotates,
    $appData = {
        firstLine: 0,       lastLine: 0,
        firstColumn: 0,     lastColumn: 0,
        shapeStartX: 0,     shapeStartY: 0,
        shapeMiddleX: 0,    shapeMiddleY: 0,
        numberOfShapes: 0,
        blockArrHeight: 0,  middleArrX: 0,
        rangeX: 0
    },

    $gameData = {
        score: 0,
        numberOfDestroyedLinesNow: 0,   distroyedLineNowPosY: 0,
        numberOfDestroyedLinesInThisLvl: 0, numberOfDestroyedLinesAllGame: 0,
        lvl: 1,   scoreThisLvl: 0,
        linesToWinFirstLvl: 0,    addLinesLvl: 0,    linesToNextLvl: 0,
        shapeSpeed: 0,  gameOverFL: false
    };


class AppHelper {

    get settings()                  { return $conf; }
    get appData()                   { return $appData; }

    get shapesList()                { return $shapesList; }
    get shapesListRotates()         { return $shapesListRotates; }

    get firstLine()                 { return $appData.firstLine; }
    get lastLine()                  { return $appData.lastLine; }
    get firstColumn()               { return $appData.firstColumn; }
    get lastColumn()                { return $appData.lastColumn; }

    get shapeStartX()               { return $appData.shapeStartX; }
    get shapeStartY()               { return $appData.shapeStartY; }
    get shapeMiddleX()              { return $appData.shapeMiddleX; }
    get shapeMiddleY()              { return $appData.shapeMiddleY; }

    get numberOfShapes()            {return $appData.numberOfShapes; }
    get blockArrHeight()            {return $appData.blockArrHeight; }
    get middleArrX()                {return $appData.middleArrX; }
    get rangeX()                    {return $appData.rangeX; }

    get numberOfDestroyedLinesNow() {return $gameData.numberOfDestroyedLinesNow; }
    get distroyedLineNowPosY()      {return $gameData.distroyedLineNowPosY; }
    get numberOfDestroyedLinesInThisLvl()      {return $gameData.numberOfDestroyedLinesInThisLvl; }
    get numberOfDestroyedLinesAllGame()      {return $gameData.numberOfDestroyedLinesAllGame; }
    get lvl()                       {return $gameData.lvl; }
    get score()                     {return $gameData.score; }
    get scoreThisLvl()              {return $gameData.scoreThisLvl; }
    get linesToNextLvl()            {return $gameData.linesToNextLvl; }

    get shapeSpeed()                {return $gameData.shapeSpeed; }
    get gameOverFL()                  {return $gameData.gameOverFL; }


    constructor(game, configurations){
        $game = game;
        $configurations = configurations;
        $conf = $configurations.settings;
        $shapes = new Shapes();
        $shapesList = $shapes.shapes;
        $shapesListRotates = $shapes.shapesRotates;
        calculateAppData();
    }


    rndColor()          { return random('blockColor');}
    rndShape()          { return random('shapes');}
    rndCamera()         { return random('camera');}
    rndCameraRotation() { return random('cameraRotation');}


    addDistroyedLineInfo(argDistroyedLinePosY){
        $gameData.numberOfDestroyedLinesNow += 1;
        $gameData.distroyedLineNowPosY = argDistroyedLinePosY;
        $gameData.numberOfDestroyedLinesInThisLvl += 1;
        $gameData.numberOfDestroyedLinesAllGame += 1;
        console.log('number of distroyed line: ' + $gameData.numberOfDestroyedLinesNow);
        console.log('pos Y of distroyed line: ' + $gameData.distroyedLineNowPosY);
    }

    resetDistroyedLineInfo(){
        $gameData.numberOfDestroyedLinesNow = 0;
        $gameData.distroyedLineNowPosY = 0;
    }

    nextLvl(){
        $gameData.lvl += 1;
        $gameData.scoreThisLvl = 0;
        $gameData.numberOfDestroyedLinesInThisLvl = 0;
    }

    addLinesToNextLvl(){
        $gameData.linesToNextLvl = $gameData.linesToWinFirstLvl + ($gameData.lvl-1)*$gameData.addLinesLvl;
    }

    oddLinesToNextLvl(argHwMn){
        $gameData.linesToNextLvl -= argHwMn;
    }

    addShapeSpeed(){
        $gameData.shapeSpeed += $conf.shape.acceleratorSpeedLvl;
    }

    gameOver(){
        $gameData.gameOverFL = true;
    }

    resetGame(){
        $gameData.lvl = 1;
        $gameData.score = 0;
        $gameData.shapeSpeed = $conf.shape.firstLvlSpeed;
        $gameData.numberOfDestroyedLinesAllGame = 0;
        $gameData.gameOverFL = false;
        $gameData.linesToWinFirstLvl = $conf.game.linesToWinFirstLvl;
        $gameData.linesToNextLvl = $conf.game.linesToWinFirstLvl;
    }

}



function random(argWhat){

    var tmpRandom = 0;

    switch(argWhat) {

        case 'blockColor':
            tmpRandom = $game.rnd.integerInRange(2, 2+$conf.block.numberOfColors);
        break;

        case 'shapes':
            tmpRandom = $game.rnd.integerInRange(0, 2+$conf.block.numberOfColors);
        break;

        case 'camera':
            tmpRandom = $game.rnd.integerInRange(0, 100);
        break;

        case 'cameraRotation':
            tmpRandom = ($game.rnd.integerInRange(0, 10) - 5) / 100;
        break;

        default:

    }

    return tmpRandom
}



function calculateAppData(){

    $appData.firstLine      = Math.floor($conf.shape.rangeY/2);

    $appData.lastLine       = Math.floor($conf.shape.rangeY/2)
                            + $conf.game.rangeY
                            - 1;

    $appData.firstColumn    = Math.floor($conf.shape.rangeX/2);

    $appData.lastColumn     = Math.floor($conf.shape.rangeX/2)
                            + $conf.game.rangeX
                            - 1;

    $appData.shapeStartX    = Math.floor($conf.shape.rangeX/2)
                            + Math.floor($conf.game.rangeX/2);

    $appData.shapeStartY    = $conf.shape.rangeY
                            + $conf.game.rangeY
                            - 1;

    $appData.shapeMiddleX   = Math.floor($conf.shape.rangeX/2);

    $appData.shapeMiddleY   = Math.floor($conf.shape.rangeY/2);

    $appData.numberOfShapes = $shapesList.length;

    $appData.blockArrHeight = $conf.game.rangeY + Math.floor($conf.shape.rangeY*1.5);

    $appData.middleArrX = Math.floor(($conf.game.rangeX + 2*Math.floor($conf.shape.rangeX/2))/2);
    $appData.rangeX = $conf.game.rangeX;

    //$gameData.shapeSpeed = $conf.shape.firstLvlSpeed;
    $gameData.shapeSpeed = 0.1;

    $gameData.linesToWinFirstLvl = $conf.game.linesToWinFirstLvl;
    $gameData.linesToNextLvl = $conf.game.linesToWinFirstLvl;
    $gameData.addLinesLvl = $conf.game.addLinesLvl;

    /*console.log('$appData.firstLine: '+ $appData.firstLine);
    console.log('$appData.lastLine: '+ $appData.lastLine);
    console.log('$appData.firstColumn: '+ $appData.firstColumn);
    console.log('$appData.lastColumn: '+ $appData.lastColumn);
    console.log('$appData.shapeStartX: '+ $appData.shapeStartX);
    console.log('$appData.shapeStartY: '+ $appData.shapeStartY);
    console.log('$appData.shapeMiddleX: '+ $appData.shapeMiddleX);
    console.log('$appData.shapeMiddleY: '+ $appData.shapeMiddleY);
    console.log('$appData.numberOfShapes: '+ $appData.numberOfShapes);
    console.log('$appData.blockArrHeight: '+ $appData.blockArrHeight);
    console.log('$appData.middleArrX: '+ $appData.middleArrX);
    console.log('$gameData.shapeSpeed: '+ $gameData.shapeSpeed);*/
    console.log('$appData.rangeX: '+ $appData.rangeX);
}



module.exports = AppHelper;
