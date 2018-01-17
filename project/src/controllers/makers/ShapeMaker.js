
var $game, $assets, $conf,
    $appHelper,
    $shapesList, $shapesListRotates;

class ShapeMaker {

    constructor(game, appHelper, assets){
        $game = game;
        $assets = assets;
        $conf = $assets.settings;
        $appHelper = appHelper;
        $shapesList = $appHelper.shapesList;
        $shapesListRotates = $appHelper.shapesListRotates;
    }

    make(argBlock){
        return makeShape(argBlock);
    }
}



function makeShape(argBlock){
    tmpPosX = $appHelper.shapeStartX;
    tmpPosY = $appHelper.shapeStartY;
    console.log('shape start pos: ' + tmpPosX + ', ' + tmpPosY);
    var tmpShape = new ShapeClass(
                            tmpPosX,
                            tmpPosY,
                            argBlock[tmpPosX][tmpPosY].posX,
                            argBlock[tmpPosX][tmpPosY].posY
                            );
    makeShapeImgArr(tmpShape);

    return tmpShape;
}




function ShapeClass(argX, argY, argPosX, argPosY){

    this.x = argX;
    this.y = argY;
    this.startX = argX;
    this.startY = argY;
    this.posX = argPosX;
    this.posY = argPosY;
    this.startPosX = argPosX;
    this.startPosY = argPosY;

    this.shapeIndex = 0;
    this.colorIndex = 4;
    this.rotateIndex = 0;

    this.img = $game.add.group();
    this.img.centerX = this.posX;
    this.img.centerY = this.posY;
    

    this.shape = [];
    this.shapes = $appHelper.shapesListRotates;
    this.shapeShadow = [];

    this.rotateNr = 0;
    this.rotateAngle = 0;
    this.rotateFL = false;
    this.rotate = $game.add.tween(this.img);

    this.moveXFL = false;
    this.moveX = $game.add.tween(this.img);
    this.moveYFL = false;
    this.moveY = $game.add.tween(this.img);

    this.img.materialize = $game.add.tween(this.img);
}




function makeShapeImgArr(argShape){

    var tmpPosX, tmpPosY,
        tmpMiddleX = Math.floor($conf.shape.rangeX/2),
        tmpMiddleY = Math.floor($conf.shape.rangeY/2);

    for (var i=0; i<$conf.shape.rangeX; i++){
        argShape.shape[i] = [];
        argShape.shapeShadow[i] = [];
        tmpPosY =   tmpMiddleY
                    *($conf.block.height + $conf.block.offsetY)
                    - i*($conf.block.height + $conf.block.offsetY);

        for (var j=0; j<$conf.shape.rangeY; j++){
            tmpPosX =   (- tmpMiddleX)
                        *($conf.block.width + $conf.block.offsetX)
                        + j*($conf.block.width + $conf.block.offsetX);
            argShape.shape[i][j] = argShape.img.create(tmpPosX, tmpPosY, 'blocks', 'block_red.png');
            argShape.shape[i][j].anchor.setTo(0.5);
            argShape.shape[i][j].frame = 0;
            argShape.shapeShadow[i][j] = 0;
        }
    }
}





module.exports = ShapeMaker;
