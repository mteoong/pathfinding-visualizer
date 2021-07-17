let arr;

function isInsideGrid(i,j, arr) { 
    return (i >= 0 && i < arr.length && j >= 0 && j < arr[0].length); 
} 

let spiral = (grid, startNode, finishNode) => {
    arr = grid;
    let walls = [];
    let count = 1;
    let outOfBounds = false;
    let xCoord = Math.floor(arr.length / 2);
    let yCoord = Math.floor((arr[0].length - 1) / 2);


    let dirY = [1, 1, -1, -1];
    let dirX = [-1, 1, 1, -1];
    let dir = 0;

    while (!outOfBounds) {
        for (let i = 0; i < count; i++) {
            console.log(xCoord + ', ' + yCoord);
            if (!isInsideGrid(xCoord, yCoord, arr)) {
                outOfBounds = true;
                break;
            } else if (!arr[xCoord][yCoord].isStart && !arr[xCoord][yCoord].isEnd) {
                walls.push(arr[xCoord][yCoord]);
            }
            xCoord += dirX[dir];
            yCoord += dirY[dir]
        }
        dir = (dir + 1) % 4;
        count++;
    }

    return walls;
}

export default spiral;