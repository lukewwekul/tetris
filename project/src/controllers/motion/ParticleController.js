
var $game, $assets, $emitter, $emitterToys = [], $particleSprite, $assetsManager;

class ParticleController {

    constructor(game, assets){

        $game = game;
        $assets = assets;

    }

    make(){
        makeParticle();
    }

    makeToys(hwMnArg){
        makeParticleToys(hwMnArg);
    }

    explode(posXArg, posYArg){
        startParticle(posXArg, posYArg);
    }

    explodeChoice(posXArg, posYArg, indexArg){
        startChoiceParticle(posXArg, posYArg, indexArg);
    }
}


function makeParticle(){

    $emitter = $game.add.emitter(0, 0, 15);

    $emitter.makeParticles('infoAtlas', 'liveHeartInfo.png');
    $emitter.gravity = 450;
    $emitter.setAlpha(1, 0, 1500);

    //$game.input.onDown.add(particleBurst, this);
}

function makeParticleToys(hwMnArg){

    for (var i=0; i< hwMnArg+1; i++){
        $emitterToys[i] = $game.add.emitter(0, 0, 300);
        $emitterToys[i].makeParticles('toysAtlas', [i]);
        $emitterToys[i].gravity = 400;
        $emitterToys[i].setAlpha(1, 0, 1000);
    }

}

function particleBurst(pointer) {
    $emitter.x = pointer.x;
    $emitter.y = pointer.y;
    $emitter.start(true, 1000, null, 10);

}

function startParticle(posXArg, posYArg){
    $emitter.x = posXArg;
    $emitter.y = posYArg;
    $emitter.start(true, 1500, null, 10);
}

function startChoiceParticle(posXArg, posYArg, indexArg){
    $emitterToys[indexArg].x = posXArg;
    $emitterToys[indexArg].y = posYArg;
    $emitterToys[indexArg].start(true, 1000, null, 10);
}


module.exports = ParticleController;
