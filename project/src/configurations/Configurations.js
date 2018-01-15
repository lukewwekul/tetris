var $game,
    $settings = {

//game conf
    game: {
        rangeX: 10,
        rangeY: 20
    },

//board conf
    board: {
        x: 0,  //25
        y: 0   //25
    },

//block conf
    block: {
        width: 16,
        height: 16,
        offsetX: 1,
        offsetY: 1,
        numberOfColors: 7
    },

//shape conf
    shape: {
        rangeX: 5,      //odd number
        rangeY: 5,       //odd number
        fallSpeed: 400,  //ms
        moveSpeed: 150,  //ms
    },


//graf conf
    back_empty: {
        x: 0,
        y: 0,
        anchorX: 0.5,
        anchorY: 0.5,
        alpha: 1
    }
};



class Configurations {

    get settings() { return $settings; }

    constructor(game){
        $game = game;
    }

}

module.exports = Configurations;
