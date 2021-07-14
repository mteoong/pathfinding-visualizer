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
            onMouseLeave,
            instant
        } = this.props;
        let cName = isStart ? "start" : isEnd ? "end" : isWall ? "wall" : isShortestPath ?"path" : isVisited ? "visited" : "";
        cName = "node_" + cName;
        if (isStart && isShortestPath) {
            cName = "node_start node_path";
        } else if (isEnd && isShortestPath) {
            cName = "node_end node_path";
        } else if (isStart && isVisited) {
            cName = "node_start node_visited";
        } else if (isEnd && isVisited) {
            cName = "node_end node_visited";
        }
        if (instant) {
            cName += " instant";
        }

        return(
            <td className = {cName} 
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