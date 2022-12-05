export function dijkstraAlgorithm(grid, i, j) {
    // i = start index node, j = end index node
    // x = not visited node, y = visited node in order, z = closest node

    if (!i || !j || i === j) return false;
    i.distance = 0;
    let x = getNodes(grid);
    let y = [];

    while(x.length !== 0) {
        x.sort((a, b) => a.distance - b.distance);
        let z = x.shift();
        if (z.setWall) continue;
        if (z.distance === Infinity) return y;
        if (z === j) return y;
        z.visitedNode = true;
        y.push(z);
        updateVisitedNodes(z, grid)
    }
}

function getNodes(grid) {
    let nodes = [];
    for (let row of grid) {
        for (let node of row) {
            nodes.push(node)
        }
    }
    return nodes;
}

function updateVisitedNodes(node, grid) {
    // m = not visited nodes, n = not visited node
    let m = getNotvisitedNodes(node, grid);
    for (let n of m) {
        n.distance = node.distance + 1;
        n.previousNode = node;
    }
}

function getNotvisitedNodes(node, grid) {
    let nextNodes = [];
    let { row, col } = node;
    if (row !== 0) nextNodes.push(grid[row - 1][col]);
    if (col !== grid[0].length - 1) nextNodes.push(grid[row][col + 1])
    if (row !== grid.length - 1) nextNodes.push(grid[row + 1][col]);
    if (col !== 0) nextNodes.push(grid[row][col - 1]);
    return nextNodes.filter((nextNode) => !nextNode.setWall).filter((nextNode) => !nextNode.visitedNode);
}
