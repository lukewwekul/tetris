
var $game,
    $key = {
        Up: null,   Down: null, Left: null, Right: null,
        W: null,    D: null,    A: null,    S: null
    }



class InputMaker {

    get key() {return $key;}

    constructor(game){
        $game = game;
    }

    make(){
        makeKeyboard();
    }

}



function makeKeyboard(){
    $key.Up = $game.input.keyboard.addKey(Phaser.Keyboard.UP);
    $key.W = $game.input.keyboard.addKey(Phaser.Keyboard.W);

    $key.Down = $game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    $key.S = $game.input.keyboard.addKey(Phaser.Keyboard.S);

    $key.Left = $game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    $key.A = $game.input.keyboard.addKey(Phaser.Keyboard.A);

    $key.Right = $game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    $key.D = $game.input.keyboard.addKey(Phaser.Keyboard.D);
}



module.exports = InputMaker;
