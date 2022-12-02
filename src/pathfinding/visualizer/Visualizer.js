import React, { Component } from 'react';
import Node from './Node';




const x = 5; // start row
const y = 8; // start col
const z = 15; // end row
const w = 61 // end col

export default class Visualizer extends Component {

    constructor() {
        super();
        this.state = {
            grid: [],
            mousePressed: false
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
            grid: newGrid
        })
    }


    
  render() {
    const {grid, mousePressed} = this.state;
    return (
      <div className='visualizer'>
        <h3>Maze Generator and PathFinding Visualizer</h3>
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
            </div>
            <div>
                <button className='reset-btn' onClick={() => this.resetGrid()}>Reset</button>
            </div>
        </div>
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