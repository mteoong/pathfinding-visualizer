function isInsideGrid(i,j,grid) { 
    return (i >= 0 && i < grid.length && j >= 0 && j < grid[0].length); 
} 

const dfs = (grid, startNode, endNode) => {
    let arr = grid;
    let visited_nodes = [];
    let shortestPath = [];

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            arr[i][j].prevNode = null;
            arr[i][j].isVisited = false;
            arr[i][j].isShortestPath = false;
        }
    }

    let queue = [arr[startNode[0]][startNode[1]]];

    let dx = [0, 1, 0, -1]; 
    let dy = [-1, 0, 1, 0]; 

    while (queue.length !== 0) {
        let node = queue.pop();
        if (node.isVisited) continue;
        arr[node.row][node.col].isVisited = true;
        visited_nodes.push(node);

        let found = false;
        for (let i = 0; i < 4; i++) {
            let x = node.row + dx[i];
            let y = node.col + dy[i];
            if (isInsideGrid(x, y, arr) && !arr[x][y].isWall && !arr[x][y].isVisited) {
                if(arr[x][y].isEnd) {
                    arr[x][y].isVisited = true;
                    visited_nodes.push(arr[x][y]);
                    arr[x][y].prevNode = arr[node.row][node.col];
                    let currentNode = arr[x][y];
                    while (currentNode !== null) {
                        console.log(currentNode);
                        shortestPath.unshift(currentNode);
                        currentNode = currentNode.prevNode;
                        if (currentNode) { 
                            currentNode.isShortestPath = true;
                            currentNode.isVisited = false;
                        }
                    }
                    found = true;
                    break;
                }
                arr[x][y].prevNode = node;
                queue.push(arr[x][y]);
            }
        }
        if (found) break;
    }

    return {visited_nodes, shortestPath};
}


export default dfs;