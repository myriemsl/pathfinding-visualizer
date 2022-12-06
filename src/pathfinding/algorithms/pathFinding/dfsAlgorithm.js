export function depthFirstSearchAlgorithm(grid, i, j) {
     // i = start index node, j = end index node,
     // x = not visisted nodes, y = visited nodes in order, z = closest nodes
     // m = not visited nodes, n = not visited node

     if(!i || !j || i === j) return false;
     let x = [];
     let y = [];
     x.push(i);
     
     while (x.length !== 0) {
        let z = x.shift();
        if (z.setWall) continue;
        if (z === j) return y;

        y.push(z);
        z.visitedNode = true;

        let m = getNotVisitedNodes(z, grid);
        for (let n of m) {
            n.previousNode = z;
            x.unshift(n);
        }

     }
     return y;
}


function getNotVisitedNodes(node, grid) {
    let nextNodes = [];
    let { col, row } = node;

    if (col !== 0) nextNodes.push(grid[row][col - 1]);
    if (row !== 0) nextNodes.push(grid[row - 1][col]);
    if (col !== grid[0].length -1) nextNodes.push(grid[row][col + 1]);
    if (row !== grid.length - 1) nextNodes.push(grid[row + 1][col]);

    return nextNodes.filter((nextNode) => !nextNode.visitedNode);
}