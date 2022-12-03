let walls; // walls
export function recursiveDivisionMazeAlgorithm(grid, i, j) {
    // i = start index node, j = end index node
    if (!i || !j || i === j) return false;
    let v = range(grid[0].length); // vertical 
    let h = range(grid.length); // horizontal
    walls = [];
    getMazeWalls(v, h, grid, i, j);
    return walls;
}

function range(l) {
    let mazeGrid = [];
    for (let i = 0; i < l; i++) {
        mazeGrid.push(i)
    }
    return mazeGrid;
}


function getMazeWalls(v, h, grid, i, j) {
    let vl = v.length;
    let hl = h.length;
    if (vl <= 1 || hl <= 1) return;
    let d;
    let n;
    
    if (vl > hl) {
        d = 0;
        n = getRandomOddNum(v);
    }
    if (vl <= hl) {
        d = 1;
        n = getRandomOddNum(h);
    }
    if (d === 0) {
        getWall(d, n, v, h, i, j);
        getMazeWalls(v.slice(0, v.indexOf(n)), h, grid, i, j);
        getMazeWalls(v.slice(v.indexOf(n) + 1), h, grid, i, j);
    } else {
        getWall(d, n, v, h, i, j);
        getMazeWalls(v, h.slice(0, h.indexOf(n)), grid, i, j);
        getMazeWalls(v, h.slice(h.indexOf(n) + 1), grid, i, j);
    }

}


function getRandomOddNum(arr) {
    let max = arr.length - 1;
    let num = Math.floor(Math.random() * (max /2)) + Math.floor(Math.random() * (max /2));
    if (num % 2 === 0) {
        if (num === max) num -= 1;
        else num += 1;
    }
    return arr[num];
}

function getWall(d, n, v, h, i, j) {
    let vl = v.length;
    let hl = h.length;
    let isStartEnd = false;
    let tWalls = []; // temp walls
    if (d === 0) {
        if (hl === 2) return;
            for (let t of h) {
                if ((t === i.row && n === i.col) || 
                (t === j.row && n === j.col)) {
                  isStartEnd = true;
                  continue;
               }
               tWalls.push([t, n]);
            }
    } else {
        if (vl === 2) return;
        for (let t of v) {
            if ((n === i.row && t === i.col) || 
                (n === j.row && t === j.col)) {
                    isStartEnd = true;
                    continue;
                }
                tWalls.push([n, t])  
        }
    }
    if (!isStartEnd) tWalls.splice(getRandomNum(tWalls.length), 1);
    for (let wall of tWalls) {
        walls.push(wall)
    }
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}