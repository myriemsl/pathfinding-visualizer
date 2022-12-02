import React, { Component } from 'react';

export class Node extends Component {
  render() {
    const {row, col, start, end, setWall, onMouseDown, onMouseEnter, onMouseUp} = this.props;
    const className = start ? 'start' : end ? 'end' : setWall ? 'wall' : '';
    return (
      <div id={`node-${row}-${col}`}
       className={`node ${className}`}
       onMouseDown={() => onMouseDown(row, col)}
       onMouseEnter={() => onMouseEnter(row, col)}
       onMouseUp={() => onMouseUp()}></div>
    )
  }
}

export default Node;