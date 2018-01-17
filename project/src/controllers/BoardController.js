var Configurations  = require('../configurations/Configurations'),
    AppHelper       = require('./helpers/AppHelper'),
    Assets          = require('../managers/Assets'),

    BlocksMaker     = require('./makers/BlocksMaker'),
    ShapeMaker      = require('./makers/ShapeMaker'),
    InputMaker      = require('./input/InputMaker'),
    LineController  = require('./motion/LineController'),
    ShapeController = require('./motion/ShapeController'),

    LineDestroyer   = require('./observers/LineDestroyer'),
    LoseController  = require('./observers/LoseController'),
    CameraController = require('./observers/CameraController'),

    InfoController = require('./info/InfoController'),
    IntroController = require('./info/IntroController');

var $game,
    $configurations, $appHelper, $assets,
    $blocksMaker, $shapeMaker,
    $lineCtrl, $inputMaker,
    $shapeCtrl,
    $lineDestroy, $loseCtrl,
    $cameraCtrl, $infoCtrl, $introCtrl,
    $block, $shape;


class BoardController {

    constructor(game){
        $game = game;

        $configurations = new Configurations($game);
        $appHelper      = new AppHelper($game, $configurations);
        $assets         = new Assets($game);

        $blocksMaker    = new BlocksMaker($game, $assets, $appHelper);
        $shapeMaker     = new ShapeMaker($game, $appHelper, $assets);
        $lineCtrl       = new LineController($game, $configurations, $appHelper);
        $inputMaker     = new InputMaker($game);
        $shapeCtrl      = new ShapeController($game, $appHelper, $configurations);
        $lineDestroy    = new LineDestroyer($game, $appHelper);
        $loseCtrl       = new LoseController($game, $appHelper);

        $infoCtrl       = new InfoController($game, $appHelper, $lineDestroy);
        $introCtrl       = new IntroController($game, $appHelper);
    }

    make(){
        $game.stage.backgroundColor = "#222222"

        $block = $blocksMaker.make();
        $shape = $shapeMaker.make($block);

        $lineCtrl.calculateArea();
        $inputMaker.make();
        $shapeCtrl.make($inputMaker.key);

        $cameraCtrl = new CameraController($game, $appHelper, $inputMaker.key, $block, $shape);

        $infoCtrl.make($block, $inputMaker.key);
        $introCtrl.make($block, $inputMaker.key);
    }

    check(){
        $lineCtrl.check($block);
        $shapeCtrl.check($shape, $block);
        $lineDestroy.check($block);
        $loseCtrl.check($block);

        $cameraCtrl.check();
        $infoCtrl.check();
        $introCtrl.check();
    }
}



module.exports = BoardController;
