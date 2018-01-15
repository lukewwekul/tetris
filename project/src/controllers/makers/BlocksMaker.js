
var $game, $assets, $conf, $appHelper;


class BlocksMaker {

    constructor(game, assets, appHelper){
        $game = game;
        $assets = assets;
        $conf = $assets.settings;
        $appHelper = appHelper;
    }

    make(){
        return makeBlocks();
    }

}



function makeBlocks(){
    var tmpArr = [],

        tmpRangeI = $conf.game.rangeX
                    + 2*(Math.floor($conf.shape.rangeX/2)),

        tmpRangeJ = $conf.game.rangeY
                    + $conf.shape.rangeY
                    + (Math.floor($conf.shape.rangeY/2));

    for (var i=0; i<tmpRangeI; i++){
        tmpArr[i] = [];
        for (var j=0; j<tmpRangeJ; j++){
            newBlock(tmpArr, i, j);
            setBlockSpritesPosition(tmpArr, i, j);
            setBlockSpriteNamePosAndAlpha(tmpArr, i, j, 1, 0.75, 0, 1);
        }
    };

    hideUnusedBlocks(tmpArr);

    //testPutRandomBlocksOnBoard(tmpArr, 10); //tmp

    return tmpArr;
}



function BlockClass(argX, argY, argPosX, argPosY){
    this.x = argX;
    this.y = argY;
    this.posX = argPosX;
    this.posY = argPosY;
    this.bottomNr = 0;
    this.bottom = $assets.useAsset('back_empty', 'spriteAtlas', 'blocks');
    this.coverNr = 0;
    this.cover = $assets.useAsset('back_empty', 'spriteAtlas', 'blocks');
    this.moveY = $game.add.tween(this.cover);
    this.dumpRange = 0;

    this.particle = $game.add.emitter(argPosX, argPosY, 1);
    this.particle.makeParticles('blocks', 4);
    this.particle.gravity = 200;
    //this.particle.setAlpha(1, 0, 2000);

    $game.world.sendToBack(this.cover);
    $game.world.sendToBack(this.bottom);
}



function blockPosition(argWhat, argI, argJ){
    var tmpPosition;

    if (argWhat == 'x') {
        tmpPosition =
                    0.5 * $conf.block.width
                    + argI * $conf.block.width
                    + $conf.block.offsetX
                    + argI * $conf.block.offsetX
                    + $conf.board.x;
    }

    else if (argWhat == 'y') {
        tmpPosition =
                    $game.height
                    - 0.5 * $conf.block.height
                    - argJ * $conf.block.height
                    - $conf.block.offsetY
                    - argJ * $conf.block.offsetY
                    - $conf.board.y;
    }

    return tmpPosition;
}



function newBlock(argArr, argI, argJ){
    argArr[argI][argJ] = new BlockClass(
                    argI,
                    argJ,
                    blockPosition('x', argI, argJ),
                    blockPosition('y', argI, argJ)
                    );
}



function setBlockSpritesPosition(argArr, argI, argJ){
    argArr[argI][argJ].bottom.x = argArr[argI][argJ].posX;
    argArr[argI][argJ].bottom.y = argArr[argI][argJ].posY;
    argArr[argI][argJ].cover.x = argArr[argI][argJ].posX;
    argArr[argI][argJ].cover.y = argArr[argI][argJ].posY;
}



function setBlockSpriteNamePosAndAlpha( argArr,
                                        argI,
                                        argJ,
                                        argFrameNrBottom,
                                        argBottomAlpha,
                                        argFrameNrCover,
                                        argCoverAlpha
                                        ){
    argArr[argI][argJ].bottom.frame = argFrameNrBottom;
    argArr[argI][argJ].bottom.alpha = argBottomAlpha;
    argArr[argI][argJ].cover.frame = argFrameNrCover;
    argArr[argI][argJ].cover.alpha = argCoverAlpha;
}





function hideUnusedBlocks(argArr){
    hideFirstLinesBlocks(argArr);
    hideLastLinesBlocks(argArr);
    hideLeftColumnsBlocks(argArr);
    hideRightColumnsBlocks(argArr);
}

function hideFirstLinesBlocks(argArr){
    var tmpHwMn = Math.floor($conf.shape.rangeY/2);
    for (var i=0; i<tmpHwMn; i++){
        hideLineBlocks(argArr, i);
    }
}

function hideLastLinesBlocks(argArr){
    var tmpHwMn = $conf.shape.rangeY;
    for (var i=argArr[0].length-1; i>argArr[0].length-tmpHwMn-1; i--){
        hideLastLineBlocks(argArr, i);
    }
}

function hideLeftColumnsBlocks(argArr){
    var tmpHwMn = Math.floor($conf.shape.rangeX/2);
    for (var i=0; i<tmpHwMn; i++){
        hideColumnBlocks(argArr, i);
    }
}

function hideRightColumnsBlocks(argArr){
    var tmpHwMn = argArr.length - Math.floor($conf.shape.rangeX/2);
    for (var i=tmpHwMn; i<argArr.length; i++){
        hideColumnBlocks(argArr, i);
    }
}


function hideLineBlocks(argArr, argNrLine){
    for (var i=0; i<argArr.length; i++){
        hideBlock(argArr[i][argNrLine]);
    }
}
function hideLastLineBlocks(argArr, argNrLine){
    for (var i=$appHelper.firstColumn; i<$appHelper.lastColumn+1; i++){
        hideLastBlock(argArr[i][argNrLine]);
    }
}


function hideColumnBlocks(argArr, argNrColumn){
    for (var j=0; j<argArr[0].length; j++){
        hideBlock(argArr[argNrColumn][j]);
    }
}


function hideBlock(argBlock){
    argBlock.bottom.frame = 1;
    argBlock.bottom.visible = false;
    argBlock.cover.frame = 2;
    argBlock.cover.visible = false;
}

function hideLastBlock(argBlock){
    argBlock.bottom.frame = 1;
    argBlock.bottom.visible = false;
    argBlock.cover.frame = 0;
    argBlock.cover.visible = false;
}



function testPutRandomBlocksOnBoard(argArr, argHwMn){
    var tmpX, tmpY, tmpColorBlock;
    for (var i=0; i<argHwMn; i++){
        tmpX = $game.rnd.integerInRange(2, 11);
        tmpY = $game.rnd.integerInRange(2, 21);
        tmpColorBlock = $game.rnd.integerInRange(2, 7);
        argArr[tmpX][tmpY].coverNr = tmpColorBlock;  //tmp
        argArr[tmpX][tmpY].cover.frame = tmpColorBlock;
    }
}

module.exports = BlocksMaker;
