function randomMaze(grid, startNode, finishNode) {
    let walls = [];
    let arr = grid;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        if (arr[row][col].isStart || arr[row][col].isEnd) {
            continue;
        } else if (Math.random() < 0.33) {
          walls.push(arr[row][col]);
        }
      }
    }
    walls.sort(() => Math.random() - 0.5);
    return walls;
}

export default randomMaze;
  