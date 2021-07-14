import PriorityQueue from "js-priority-queue";

function isInsideGrid(i,j,grid) { 
        return (i >= 0 && i < grid.length && j >= 0 && j < grid[0].length); 
} 

const aStar = (grid, startNode, endNode) => {
    let arr = grid;
    let visited_nodes = [];
    let shortestPath = [];
    let pq = new PriorityQueue({
        comparator: (a, b) => { return (a.distance + a.heur) - (b.distance + b.heur); }
    });

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            arr[i][j].distance = Infinity;
            arr[i][j].prevNode = null;
            arr[i][j].isVisited = false;
            arr[i][j].isShortestPath = false;
        }
    }

    arr[startNode[0]][startNode[1]].distance = 0;
    pq.queue(arr[startNode[0]][startNode[1]]);
    let dx = [1, 0, -1, 0]; 
    let dy = [0, 1, 0, -1]; 
    
    while(pq.length){
        let node = pq.dequeue();
        if (arr[node.row][node.col].isVisited) continue;
        arr[node.row][node.col].isVisited = true;
        visited_nodes.push(node);
        console.log(node.distance);
        let found = false;
        for (let i = 0; i < 4; i++){
            let x = node.row + dx[i];
            let y = node.col + dy[i];
            if (!isInsideGrid(x, y, arr)) continue;
            if(!arr[x][y].isVisited && !arr[x][y].isWall){
                if (arr[x][y].isEnd){
                    arr[x][y].isVisited = true;
                    arr[x][y].prevNode = arr[node.row][node.col];
                    let currentNode = arr[x][y];
                    while (currentNode !== null) {
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
                let xChange = Math.abs(x - endNode[0]);
                let yChange = Math.abs(y - endNode[1]);
                arr[x][y].heur = Math.sqrt(Math.pow(x-endNode[0], 2) + Math.pow(y-endNode[1], 2));

                if (node.distance + 1 < arr[x][y].distance) {
                    arr[x][y].prevNode = node;
                    arr[x][y].distance = node.distance + 1;
                }
                pq.queue(arr[x][y]);
            }
            
        }
        if (found) break;
    }
    return {visited_nodes, shortestPath};
}

export default aStar;
