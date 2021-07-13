import React, { Component } from 'react';
import './pixel.css';

class Pixel extends Component {
    render(){
        const {
            isWall,
            isStart,
            isEnd,
            isVisited,
            isShortestPath,
            onMouseDown,
            row,
            col,
            onMouseEnter,
            onMouseUp,
            onMouseLeave
        }=this.props;
        const cName = isStart ? "start" : isEnd ? "end" : isWall ? "wall" : isShortestPath ?"path" : isVisited ? "visited" : "";
        return(
            <td className = {"node_" + cName} 
            id = {`node-${row}-${col}`}
            onMouseDown = {() => onMouseDown(row,col)}
            onMouseEnter = {() => onMouseEnter(row,col)}
            onMouseUp = {() => onMouseUp()}
            onMouseLeave = {() => onMouseLeave(row,col)}
            ></td>
        )
    }
}

export default Pixel;