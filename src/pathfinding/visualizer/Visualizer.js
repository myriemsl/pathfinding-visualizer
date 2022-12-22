import React, { Component } from 'react';
import Node from './Node';
import { randomMazeAlgorithm } from '../algorithms/mazeGenerator/randomMaze';
import { recursiveDivisionMazeAlgorithm } from '../algorithms/mazeGenerator/recursiveMaze';
import { dijkstraAlgorithm } from '../algorithms/pathFinding/dijkstraAlgorithm';
import { getShortPath } from '../algorithms/pathFinding/shortPath';
import { astarAlgorithm } from '../algorithms/pathFinding/astarAlgorithm';
import { depthFirstSearchAlgorithm } from '../algorithms/pathFinding/dfsAlgorithm';
import { breadthFirstSearchAlgorith } from "../algorithms/pathFinding/bfsAlgorithm";
import { greedyBfsAlgorithm } from '../algorithms/pathFinding/greedyBfsAlgorithm';

const x = 5; // start row
const y = 8; // start col
const z = 15; // end row
const w = 61; // end col
const mazeSpeed = 10;
const algorithmSpeed = 10;

export default class Visualizer extends Component {

    constructor() {
        super();
        this.state = {
            grid: [],
            mousePressed: false,
            mazeGenerated: false,
            algorithmVisualized: false,
            error: false,
        }
    }

    componentDidMount() { 
        const grid = getGrid();
        this.setState({grid});
    }

    // handle mouse to build walls
    mouseDown(row, col) {
        const newGrid = getWalls(this.state.grid, row, col);
        this.setState({grid: newGrid, mousePressed: true});
    }

    mouseEnter(row, col) {
        if (!this.state.mousePressed) return;
        const newGrid = getWalls(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }
    
    mouseUp() {
        this.setState({mousePressed: false})
    }

    // reset grid
    resetGrid() {
        for (let row = 0; row < this.state.grid.length; row++) {
            for (let col = 0; col < this.state.grid[0].length; col++) {
                if (!((row === x && col === y) || (row === z && col === w))) {
                    document.getElementById(`node-${row}-${col}`).className = "node";
                }                
            }
        }
        const newGrid = getGrid();
        this.setState({
            grid: newGrid,
            mazeGenerated: false,
            error: false,
        })
    }


    /*/ maze generation and animation /*/
    // maze animation
    mazeAnimation = (walls) => {
        for (let i = 0; i <= walls.length; i++) {
            if (i === walls.length) {
                setTimeout(() => {
                    this.resetGrid();
                    let mazeGrid = getMazeGrid(this.state.grid, walls);
                    this.setState({
                        grid: mazeGrid,
                        mazeGenerated: false,
                    })
                }, i * mazeSpeed);
                return;
            }
            let wall = walls[i];
            let node = this.state.grid[wall[0]][wall[1]];
            
            setTimeout(() => {
                document.getElementById(`node-${node.row}-${node.col}`).className = "node maze-animation";
            }, i* mazeSpeed);
        }
    }

    // random maze generation
    randomMaze() {
        if (this.state.algorithmVisualized || this.state.mazeGenerated) return;
        this.setState({
            mazeGenerated: true,
        });

        setTimeout(() => {
            const { grid } = this.state;
            const i = grid[x][y];
            const j = grid[z][w];
            const walls = randomMazeAlgorithm(grid, i, j);
            this.mazeAnimation(walls);
        }, mazeSpeed);
    };

    // recursive division maze
    recursiveMaze() {
        if (this.state.algorithmVisualized || this.state.mazeGenerated) return;
        this.setState({
            mazeGenerated: true,
        });
        setTimeout(() => {
            const { grid } = this.state;
            const i = grid[x][y];
            const j = grid[z][w];
            const walls = recursiveDivisionMazeAlgorithm(grid, i, j);
            this.mazeAnimation(walls);
        }, mazeSpeed);
    }

    /*/ visualize algorithm and animation /*/
    // short path animation
    shortPathAnimation = (b, a) => {
        // a = visited nodes in order, b = nodes path in order
        if (b.length === 1) {
            this.setState({
              algorithmVisualized: false,
              error: false,
            });
            document.getElementById('error').className = 'error error-checked'
          };
        for (let i = 1; i < b.length; i++) {
            if (i === b.length - 1) {
                setTimeout(() => {
                    let newGrid = getUpdatedNodes(
                      this.state.grid,
                      b,
                      a,
                    );
                    this.setState({
                      grid: newGrid, 
                      algorithmVisualized: false,
                    })
                  }, i * (3 * algorithmSpeed));
                  return;
            } else {
                this.setState({
                    error: true,
                });
                document.getElementById('error').className = "error"
            }
            let node = b[i];
            setTimeout(() => {
                document.getElementById(`node-${node.row}-${node.col}`).className = "node shortPath-animation"
              }, i * (3 * algorithmSpeed));
        }
    }

    // pathfinding animation
    pathFindingAnimation = (a, b) => {
        // a = visited nodes in order, b = nodes path in order
        let newGrid = this.state.grid.slice();
        for (let row of newGrid) {
            for (let node of row) {
                let newNode = {
                    ...node, 
                    visitedNode: false,
                };
                newGrid[node.row][node.col] = newNode;
            };
        }

        this.setState({
            grid: newGrid,
        });
        for (let i = 1; i <= a.length; i++) {
            let node = a[i];
            if (i === a.length){
                setTimeout(() => {
                    this.shortPathAnimation(b, a)
                }, i * algorithmSpeed);
                return;
            }
            setTimeout(() => {
                document.getElementById(`node-${node.row}-${node.col}`).className = "node visited-animation"
              }, i * algorithmSpeed); 
        }
    }

    // dijkstra
    Dijkstra() {
        if (this.state.algorithmVisualized || this.state.mazeGenerated) return;
        this.setState({
            algorithmVisualized: true,
        });

        setTimeout(() => {
            const { grid } = this.state;
            const i  = grid[x][y];
            const j = grid[z][w];
            const visitedNodes = dijkstraAlgorithm(grid, i, j);
            const shortPath = getShortPath(j);
            this.pathFindingAnimation(visitedNodes, shortPath)
        }, algorithmSpeed);
    }

    // astar
    Astar() {
        if (this.state.algorithmVisualized || this.state.mazeGenerated) return;
        this.setState({
            algorithmVisualized: true,
        });

        setTimeout(() => {
            const { grid } = this.state;
            const i  = grid[x][y];
            const j = grid[z][w];
            const visitedNodes = astarAlgorithm(grid, i, j);
            const shortPath = getShortPath(j);
            this.pathFindingAnimation(visitedNodes, shortPath)
        }, algorithmSpeed);
    }

    // depth first search
    Dfs() {
        if (this.state.algorithmVisualized || this.state.mazeGenerated) return;
        this.setState({
            algorithmVisualized: true
        });

        setTimeout(() => {
            const { grid } = this.state;
            const i  = grid[x][y];
            const j = grid[z][w];
            const visitedNodes = depthFirstSearchAlgorithm(grid, i, j);
            const shortPath = getShortPath(j);
            this.pathFindingAnimation(visitedNodes, shortPath);
        }, algorithmSpeed);
    }

    // breadth first search
    Bfs() {
        if (this.state.algorithmVisualized || this.state.mazeGenerated) return;
        this.setState({
            algorithmVisualized: true
        });

        setTimeout(() => {
            const { grid } = this.state;
            const i  = grid[x][y];
            const j = grid[z][w];
            const visitedNodes = breadthFirstSearchAlgorith(grid, i, j);
            const shortestPath = getShortPath(j);
            this.pathFindingAnimation(visitedNodes, shortestPath);
        }, algorithmSpeed);
    }

    // greedy bfs
    greedyBfs() {
        if (this.state.algorithmVisualized || this.state.mazeGenerated) return;
        this.setState({
            algorithmVisualized: true
        });

        setTimeout(() => {
            const { grid } = this.state;
            const i = grid[x][y];
            const j = grid[z][w];
            const visitedNodes = greedyBfsAlgorithm(grid, i, j);
            const shortestPath = getShortPath(j);
            this.pathFindingAnimation(visitedNodes, shortestPath);
        }, algorithmSpeed);

    }

    
  render() {
    const {grid, mousePressed} = this.state;
    return (
      <div className='visualizer'>
        <h3>Maze Generator and PathFinding Visualizer</h3>
        <p>Click on the grid to build walls, you can generate a maze, then pick an algorithm to start visualizing. You can reset and start again.</p>
        <div className='header'>
            <div className='details'>
                <div>
                    <div className='index' id='start'></div>
                    <h4>start</h4>
                </div>
                <div>
                    <div className='index' id='end'></div>
                    <h4>end</h4>
                </div>
                <div>
                    <div className='index' id='wall'></div>
                    <h4>wall</h4>
                </div>
                <div>
                    <div className='index' id='path'></div>
                    <h4>path</h4>          
                </div>
                <div>
                    <div className='index' id='visited-one'></div>
                    <div className='index' id='visited-two'></div>
                    <h4>visited</h4>
                </div>
                <div>
                    <div className='index' id='not-visited'></div>
                    <h4>not visited</h4>
                </div>
            </div>
            <div className='algorithms'>
                <h4>generate Maze</h4>
                <button className='algorithm-btn' onClick={() => this.randomMaze()}>Random</button>
                <button className='algorithm-btn' onClick={() => this.recursiveMaze()}>Recursive</button>
            </div>
            <div className='algorithms'>
                <h4>pick algorithm</h4>
                <button className='algorithm-btn' onClick={() => this.Dijkstra()}>Dijkstra</button>
                <button className='algorithm-btn' onClick={() => this.Astar()}>Astar</button>
                <button className='algorithm-btn' onClick={() => this.Dfs()}>Dfs</button>
                <button className='algorithm-btn' onClick={() => this.Bfs()}>Bfs</button>
                <button className='algorithm-btn' onClick={() => this.greedyBfs()}>Greedy BFS</button>
            </div>
            <div>
                <button className='reset-btn' onClick={() => this.resetGrid()}>Reset</button>
            </div>
        </div>
        <span className='error' id='error'>no short path, reset and try again</span>
        <div className='grid'>
            {grid.map((row, rowIdx) => {
                return (
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                            const {row, col, start, end, setWall} = node;
                            return (
                                <Node key={nodeIdx}
                                  col={col}
                                  row={row}
                                  start={start}
                                  end={end}
                                  setWall={setWall}
                                  mousePressed={mousePressed}
                                  onMouseDown={(row, col) => this.mouseDown(row, col)}
                                  onMouseEnter={(row, col) => this.mouseEnter(row, col)}
                                  onMouseUp={() => this.mouseUp()}/>
                            );
                        })}
                    </div>
                );
            })}
        </div>
      </div>
    )
  }
}



// set grid
const getGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const setRow = [];
        for (let col = 0; col < 70; col++) {
            setRow.push(getNode(col, row))
        }
        grid.push(setRow);
    }
    return grid;
};

// get node
const getNode = (col, row) => {
    return {
        col,
        row,
        start: row === x && col === y,
        end: row === z && col === w,
        setWall: false,
        distance: Infinity,
        previousNode: null,
        visitedNode: false,
    }
};

// create walls
const getWalls = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        setWall: !node.setWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
}

// set grid with maze
const getMazeGrid = (grid, walls) => {
    let mazeGrid = grid.slice();
    for (let wall of walls) {
        let node = grid[wall[0]][wall[1]];
        let newNode = {
            ...node,
            setWall: true,
        };
        mazeGrid[wall[0]][wall[1]] = newNode;
    }
    return mazeGrid;
};

// update nodes
const getUpdatedNodes = (grid, b, a) => {
    let newGrid = grid.slice();
    for (let node of a) {
        if ((node.row === x && node.col === y) ||
       (node.row === z && node.col === w)) continue;

       let newNode = {
        ...node,
        visitedNode: true,
       };
       newGrid[node.row][node.col] = newNode;
    }
    for (let node of b) {
        if (node.row === z && node.col === w) return newGrid;
    let newNode = {
      ...node,
      visitedNode: false,
      shortestPath: true,
    };
    newGrid[node.row][node.col] = newNode;
    }
}