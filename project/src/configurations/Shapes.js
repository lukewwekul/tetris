var ShapesArrRotator = require('../controllers/helpers/ShapesArrRotator');

var $shapesArrRotator, $shapesRotates;

class Shapes {

    get shapes() { return $shapes; }
    get shapesRotates() { return $shapesRotates; }

    constructor(){
        $shapesArrRotator = new ShapesArrRotator();
        $shapesRotates = $shapesArrRotator.make($shapes);
        console.log('shapesRotates: ' + $shapesRotates);
    }

}



var $shapes =[
                    [
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 1, 1, 1, 1 ],
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0]
                    ],

                    [
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 1, 0, 0, 0 ],
                        [ 0, 1, 1, 1, 0 ],
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0 ]
                    ],

                    [
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 1, 0 ],
                        [ 0, 1, 1, 1, 0 ],
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0 ]
                    ],

                    [
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 0, 1, 1, 0 ],
                        [ 0, 0, 1, 1, 0 ],
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0 ]
                    ],

                    [
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 0, 1, 1, 0 ],
                        [ 0, 1, 1, 0, 0 ],
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0 ]
                    ],

                    [
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 0, 1, 0, 0 ],
                        [ 0, 1, 1, 1, 0 ],
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0 ]
                    ],

                    [
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 0, 0, 0, 0 ],
                        [ 0, 1, 1, 0, 0 ],
                        [ 0, 0, 1, 1, 0 ],
                        [ 0, 0, 0, 0, 0 ]
                    ]
            ]



module.exports = Shapes;
