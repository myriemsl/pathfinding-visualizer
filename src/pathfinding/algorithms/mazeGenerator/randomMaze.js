export function randomMazeAlgorithm(grid, i, j) {
    // i = start node index, j = start node index
    
    if (!i || !j || i === j) return false;
    let w = []; // walls
    let g = grid;

    for (let row = 0; row < g.length; row++) {
       for (let col = 0; col < g[0].length; col++) {
        if ((row === i.row && col === j.col) || 
             (row === j.row && col === j.col)) {
            continue;
        }
        if (Math.random() < 0.25) {
            w.push([row, col])
        }
       }
    }

    w.sort(() => Math.random() - 0.5)
    return w;
    
}