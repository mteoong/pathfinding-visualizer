let walls;
let arr;

function isInsideGrid(i,j) { 
    return (i >= 0 && i < arr.length && j >= 0 && j < arr[0].length); 
} 

let recursiveDivision = (grid, startNode, finishNode) => {
    arr = grid;
    let vertical = range(grid[0].length);
    let horizontal = range(grid.length);
    walls = [];
    getRecursiveWalls(vertical, horizontal, arr);
    return walls;
}

function range(len) {
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push(i);
  }
  return result;
}

function getRecursiveWalls(vertical, horizontal, grid) {
  if (vertical.length < 2 || horizontal.length < 2) {
    return;
  }
  let dir;
  let num;
  if (vertical.length > horizontal.length) {
    dir = "vertical";
    num = generateOddRandomNumber(vertical);
  } else {
    dir = "horizontal";
    num = generateOddRandomNumber(horizontal);
  }

  addWall(dir, num, vertical, horizontal);

  if (dir === "vertical") {
    getRecursiveWalls(
      vertical.slice(0, vertical.indexOf(num)),
      horizontal,
      grid,
    );
    getRecursiveWalls(
      vertical.slice(vertical.indexOf(num) + 1),
      horizontal,
      grid,
    );
  } else {
    getRecursiveWalls(
      vertical,
      horizontal.slice(0, horizontal.indexOf(num)),
      grid,
    );
    getRecursiveWalls(
      vertical,
      horizontal.slice(horizontal.indexOf(num) + 1),
      grid,
    );
  }
}

function generateOddRandomNumber(array) {
  let max = array.length - 1;
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));
  if (randomNum % 2 === 0) {
    if (randomNum === max) {
      randomNum -= 1;
    } else {
      randomNum += 1;
    }
  }
  return array[randomNum];
}


function addWall(dir, num, vertical, horizontal) {
  let isStartorEnd = false;
  let tempWalls = [];
  if (dir === "vertical") {
    if (horizontal.length === 2) return;
    for (let temp of horizontal) {
        if (isInsideGrid(temp, num)) {
            if (arr[temp][num].isStart || arr[temp][num].isEnd) {
                isStartorEnd = true;
                continue;
            }
            tempWalls.push(arr[temp][num]);
        }    
    }
  } else {
    if (vertical.length === 2) return;
    for (let temp of vertical) {
        if (isInsideGrid(num, temp)) {
            if (arr[num][temp].isStart || arr[num][temp].isEnd) {
                isStartorEnd = true;
                continue;
              }
              tempWalls.push(arr[num][temp]);
        }
    }
  }
  if (!isStartorEnd) {
    tempWalls.splice(generateRandomNumber(tempWalls.length), 1);
  }
  for (let wall of tempWalls) {
    walls.push(wall);
  }
}

function generateRandomNumber(max) {
  let randomNum =
    Math.floor(Math.random() * (max / 2)) +
    Math.floor(Math.random() * (max / 2));
  if (randomNum % 2 !== 0) {
    if (randomNum === max) {
      randomNum -= 1;
    } else {
      randomNum += 1;
    }
  }
  return randomNum;
}

export default recursiveDivision;