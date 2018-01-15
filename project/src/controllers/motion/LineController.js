
var $game, $configurations, $conf, $appHelper,
    $firstLine, $firstColumn, $width, $height,
    $line = [],
    $tmpEngagedLineMarker = 1, $tmpEmptyLineMarker = 0,
    $tmpTimeFall = 250;


class LineController {


    constructor(game, configurations, appHelper){
        $game = game;
        $configurations = configurations;
        $conf = $configurations.settings;
        $appHelper = appHelper;
    }

    calculateArea(){
        calculateBoardArea();
    }

    check(argArr){
        checkEngagedLines(argArr);
        dumpAboveLine(argArr);
        //resetLineArr();
    }

}



function calculateBoardArea(){
    $firstLine = Math.floor($conf.shape.rangeY/2);
    $lastLine = $conf.game.rangeY + $firstLine - 1;
    $firstColumn = Math.floor($conf.shape.rangeX/2);
    $lastColumn = $conf.game.rangeX + $firstColumn;
    /*$firstLine = $appHelper.firstLine;
    $lastLine = $appHelper.lastLine;
    $firstColumn =$appHelper.firstColumn;
    $lastColumn = $appHelper.lastColumn;*/
    //console.log('calculateBoardArea, firstLine: ' + $firstLine + ', lastLine: ' + $lastLine);
    tmpAllLinesBlocks = $conf.shape.rangeY + Math.floor($conf.shape.rangeY*1.5);
    //tmpAllLinesBlocks = $appHelper.blockArrHeight;
    for (var i=0; i<tmpAllLinesBlocks; i++){
        $line[i] = 0;
    }
}



function checkEngagedLines(argArr){
    $tmpEngagedLineMarker = 1;
    $tmpEmptyLineMarker = 0;
    for (var j=$lastLine; j>$firstLine-1; j--){
        //console.log('checkEngagedLine nr ' + j);
        $line[j] = $tmpEmptyLineMarker;
        for (var i=$firstColumn; i<$lastColumn+1; i++){
            if (argArr[i][j].coverNr) {
                //console.log('line ' + j + ' engaged');
                $line[j] = $tmpEngagedLineMarker++;
                $tmpEmptyLineMarker--;
                break;
            }
        }
    }
}




function dumpAboveLine(argArr){
    for (var i=$firstLine; i<$lastLine; i++){
        if ($line[i]<0){
            for (var j=i+1; j<$lastLine+1; j++){
                if ($line[j]>0) {
                    //console.log('dump from ' + j + ' line for line ' + i);
                    dump(i, j, argArr);
                    return true;
                }
            }
        }
    }
}




function dump(argDownLine, argUpLine, argArr){
    for (var i=$firstColumn; i<$lastColumn; i++){
        argArr[i][argDownLine].coverNr = argArr[i][argUpLine].coverNr;
        //argArr[i][argDownLine].cover.x = argArr[i][argUpLine].cover.x;
        argArr[i][argDownLine].cover.y = argArr[i][argUpLine].cover.y;

        //console.log('cover down Y: ' + argArr[i][argDownLine].cover.y + '. cover up Y: ' + argArr[i][argUpLine].cover.y);
        argArr[i][argDownLine].cover.frame = argArr[i][argDownLine].coverNr;
        argArr[i][argDownLine].dumpRange = argUpLine - argDownLine;
        //console.log('dump range: ' + argArr[i][argDownLine].dumpRange);

        argArr[i][argUpLine].coverNr = 0;
        argArr[i][argUpLine].cover.frame = argArr[i][argUpLine].coverNr;

        //$game.world.bringToTop(argArr[i][argDownLine].cover);
        //$game.world.bringToTop(argArr[i][argDownLine].particle);
        //console.log('time fall: ' + $tmpTimeFall);
        argArr[i][argDownLine].moveY = $game.add.tween(argArr[i][argDownLine].cover);
        argArr[i][argDownLine].moveY.to({y: argArr[i][argDownLine].posY}, $tmpTimeFall, Phaser.Easing.Cubic.In);
        argArr[i][argDownLine].moveY.start();

    }
}



function resetLineArr(){
    for(var i=0; i<$line.length; i++){
        //$line[i]=0;
        //console.log('line ' + i + " = " + $line[i])
    }
}


module.exports = LineController;
