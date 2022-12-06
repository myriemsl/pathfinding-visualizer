export function astarAlgorithm(grid, i, j) {
    // i = start index node, j = end index node, 
    // x = not visisted nodes, y = visited nodes in order, z = closest nodes
    // m = next nodes, n = next node

    if(!i || !j || i === j) return false;
    let x = [];
    let y = [];
    i.distance = 0;
    x.push(i);

    while(x.length !== 0) {
        x.sort((a, b) => a.totalDistance - b.totalDistance);
        let z = x.shift();
        if (z === j) return y;

        z.visitedNode = true;
        y.push(z);
        let m = getNextNodes(z, grid);
        for (let n of m) {
            let distance = z.distance + 1;
            if (getNotVisitedNextVisited(n, x)) {
                x.unshift(n);
                n.distance = distance;
                n.totalDistance = distance + getDistance(n, j);
                n.previousNode = z;
            } else if (distance < n.distance){
                n.distance = distance;
                n.totalDistance = distance + getDistance(n, j);
                n.previousNode = z;
            }
        }

    }
    return y;
}

function getNextNodes(node, grid) {
    let m = [];
    let {row, col} = node;
    if (col !== grid[0].length -1) m.push(grid[row][col + 1]);
    if (row !== grid.length - 1) m.push(grid[row + 1][col]);
    if (col !== 0) m.push(grid[row][col - 1]);
    if (row !== 0) m.push(grid[row - 1][col]);

    return m.filter((n) => !n.setWall && !n.visitedNode);
}

function getNotVisitedNextVisited(n, x) {
    for (let node of x) {
        if (node.row === n.row && node.col === n.col) return false;
    }
    return true;
}

function getDistance(node, j) {
    let x = Math.abs(node.row - j.row);
    let y = Math.abs(node.col - j.col);
    return x + y;
}

