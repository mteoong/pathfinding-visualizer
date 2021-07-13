import React, { Component } from 'react';
import './board.css';
import Pixel from './Pixel';

class Board extends Component {
    constructor(props){
        super(props);
        this.state={
            grid:[],
            mouseClicked:false,
            mainClicked:"",
            start_node:null,
            end_node:null,
            visited:0,
            shortestPath:0,
            number_of_nodes:0,
            showModal:true
        }
        this.animating=false;
    }

    componentDidMount(){
        this.makeGrid();
        window.addEventListener("resize",(e)=>{
            this.makeGrid();
        })
    }

    makeGrid=()=>{
        if(this.animating)return;
        const gridWrapper = document.querySelector('#root');
        let row_size = Math.floor((gridWrapper.offsetHeight - 223)/25);
        let col_size = Math.min(60, Math.floor((gridWrapper.offsetWidth - 60)/25));
        let arr=[]
        for(let i = 0; i < row_size; i++){
            let row = [];
            for(let j = 0; j < col_size; j++){
                row.push({
                    value:1,
                    row:i,
                    col:j,
                    isVisited:false,
                    isShortestPath:false,
                    isWall:false,
                    isStart:false,
                    isEnd:false,
                });
            }
            arr.push(row);
        }
        let start_x= Math.floor(col_size / 3);
        let start_y= Math.floor(row_size / 2);
        let end_x= Math.floor(col_size * 2 / 3);
        let end_y= Math.floor(row_size / 2);
        arr[start_y][start_x].isStart=true;
        arr[end_y][end_x].isEnd=true;

        this.setState({
            grid:arr,
            start_node:[start_x,start_y],
            end_node:[end_x,end_y],
            number_of_nodes:arr.length*arr[0].length,
            visited:0,
            shortestPath:0
        })
    }

    render() {
        let tr_style = {display:"table-row"}
        return(
            <div className="board-wrapper">
              <table cellSpacing="0">
                {
                  this.state.grid.map((row,index)=>{
                    return(
                      <tr style={tr_style}>
                        {
                          row.map((element,i)=>{
                            return(
                              <Pixel 
                                value={element}
                                isWall={element.isWall}
                                isStart={element.isStart}
                                isEnd={element.isEnd}
                                isVisited={element.isVisited}
                                isShortestPath={element.isShortestPath}
                                key={i}
                                row={index}
                                col={i}
                              />
                            )
                          })
                        }
                      </tr>
                    )
                  })
                }
              </table>
            </div>
        )
    }
}

export default Board;