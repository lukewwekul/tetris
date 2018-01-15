

class ShapesArrRotator {

    constructor(){

    }

    make(argShapesArr){
        return makeArr(argShapesArr);
    }

}



function makeArr(argShapesArr){
    var tmpNewRotateArr = [];

    for (var i=0; i<argShapesArr.length; i++){

        tmpNewRotateArr[i] = [];
        for (var j=0; j<4; j++){        //4 because one for each side (up, right, left and down)

            tmpNewRotateArr[i][j] = copyArr(argShapesArr[i]);
            for(var k=0; k<j; k++){

                rotateArr(tmpNewRotateArr[i][j]);
            }
        }
    }

    return tmpNewRotateArr;
}



function rotateArr(argArr){
    console.log('rotateArr');
    // An Inplace function to rotate a N x N matrix
    // by 90 degrees in anti-clockwise direction
    // Consider all squares one by one
    var N = argArr[0].length;
    //console.log('n: ' + N);
    for (var x = 0; x < Math.floor(N / 2); x++)
    {
        // Consider elements in group of 4 in
        // current square
        for (var y = x; y < N-x-1; y++)
        {
            // store current cell in temp variable
            var temp = argArr[x][y];

            // move values from right to top
            argArr[x][y] = argArr[y][N-1-x];

            // move values from bottom to right
            argArr[y][N-1-x] = argArr[N-1-x][N-1-y];

            // move values from left to bottom
            argArr[N-1-x][N-1-y] = argArr[N-1-y][x];

            // assign temp to left
            argArr[N-1-y][x] = temp;
        }
    }
}



function copyArr(argArr){
    var tmpArr=[];
    for (var i=0; i<argArr.length; i++){
        tmpArr[i] = [];
        for (var j=0; j<argArr[i].length; j++){
            tmpArr[i][j] = argArr[i][j];
        }
    }
    return tmpArr;
}




module.exports = ShapesArrRotator;
