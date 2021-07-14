import React, { Component } from 'react';
import './board.css';
import Pixel from './Pixel';
import dijkstraAlgorithm from '../algorithms/Dijkstra';
import astar from '../algorithms/aStar';

class Board extends Component {
    constructor(props){
        super(props);
        this.state={
            grid:[],
            mouseClicked:false,
            selected:"",
            start_node:null,
            end_node:null,
            visited:0,
            shortestPath:0,
            number_of_nodes:0,
        }
        this.animating=false;
        this.instantAnimations=false;
    }

    componentDidMount(){
        this.makeGrid();
        window.addEventListener("resize",(e)=>{
            this.makeGrid();
        })
    }

    makeGrid = () => {
        if (this.animating) return;
        const gridWrapper = document.querySelector('#root');
        let row_size = Math.floor((gridWrapper.offsetHeight - 223)/27);
        let col_size = Math.min(60, Math.floor((gridWrapper.offsetWidth - 60)/27));
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
        let start_x = Math.floor((row_size - 1) / 2);
        let start_y = Math.floor(col_size/ 3);
        let end_x = Math.floor((row_size - 1) / 2);
        let end_y = Math.floor(col_size * 2 / 3);
        arr[start_x][start_y].isStart = true;
        arr[end_x][end_y].isEnd = true;

        this.setState({
            grid: arr,
            start_node: [start_x, start_y],
            end_node: [end_x, end_y],
            number_of_nodes: arr.length * arr[0].length,
            visited: 0,
            shortestPath: 0,
        })
    }

    handleMouseDown = (row, col) => {
      if (this.animating) return;
      let arr = this.state.grid;
      if (arr[row][col].isStart) {
          this.setState({
              selected: "start"
          });
      } else if (arr[row][col].isEnd) {
          this.setState({
              selected: "end"
          });
      }

      if (document.querySelector("input[value='build']").checked) {
          if(!arr[row][col].isWall && !arr[row][col].isStart && !arr[row][col].isEnd) {
              arr[row][col].isWall = true;
          }
      } else {
          if(arr[row][col].isWall){
              arr[row][col].isWall = false;
          }
      }

      this.setState({
          grid: arr,
          mouseClicked: true
      })
    }

    handleMouseEnter = (row,col) => {
      if (this.animating) return;
      if (this.state.mouseClicked) {
          let arr = this.state.grid;
          if (this.state.selected === "start") {
              arr[row][col].isStart = true;
              this.setState({
                  start_node: [row, col]
              })
          }
          else if (this.state.selected === "end") {
              arr[row][col].isEnd = true;
              this.setState({
                  end_node: [row, col]
              })
          }
          else if (document.querySelector("input[value='build']").checked) {
              if(!arr[row][col].isWall && !arr[row][col].isStart && !arr[row][col].isEnd) {
                  arr[row][col].isWall = true;
              }
          } 
          else {
              if(arr[row][col].isWall){
                  arr[row][col].isWall=false;
              }
          }

          this.setState({
              grid:arr,
              mouseClicked:true
          })

          if (this.instantAnimations) {
              this.instantDijkstra();
          }
      }
    }

    handleMouseLeave = (row, col) => {
      if (this.animating) return;
      let arr = this.state.grid;
      if (this.state.selected !== "") {
          arr[row][col].isStart = false;
          arr[row][col].isEnd = false;
          this.setState({
              grid: arr
          })
      }
      
    }

    handleMouseUp = () => {
        if (this.animating) return;
        this.setState({
            mouseClicked: false,
            selected:""
        })
    }

    clearPathfinder = () => {
        let arr = this.state.grid;
        for (let i = 0; i < arr.length; i++){
            for(let j = 0; j < arr[0].length; j++){
                let element = document.getElementById(`node-${i}-${j}`);
                if (element.classList.contains("node_path")) {
                    element.classList.remove("node_path");
                }
                if (element.classList.contains("node_visited")) {
                    element.classList.remove("node_visited");
                }
            }
        }
    }

    instantDijkstra = () => {
        if(this.animating)return;
        let arr = this.state.grid;
        this.clearPathfinder();
        let {visited_nodes, shortestPath} = dijkstraAlgorithm(this.state.grid, this.state.start_node, this.state.end_node)

        const animate = async () => {
            const instantAnimation = () => {
                for (let i = 0; i < visited_nodes.length; i++) {
                    let row = visited_nodes[i].row;
                    let col = visited_nodes[i].col;
                    arr[row][col].isVisited=true;

                    if(!arr[row][col].isStart && !arr[row][col].isEnd) {
                        document.getElementById(`node-${row}-${col}`).className="node_visited_i";
                    }
                }
                for (let j = 0; j < shortestPath.length; j++) {
                    let row = shortestPath[j].row;
                    let col = shortestPath[j].col;
                    arr[row][col].isShortestPath = true;

                    if (arr[row][col].isStart) {
                        document.getElementById(`node-${row}-${col}`).className="node_path_i node_start";
                    } else if (arr[row][col].isEnd) {
                        document.getElementById(`node-${row}-${col}`).className="node_path_i node_end";
                    } else {
                        document.getElementById(`node-${row}-${col}`).className="node_path_i";
                    }
                }
                this.setState({
                    grid: arr,
                    visited: visited_nodes.length,
                    shortestPath: shortestPath.length
                })
            }
            await requestAnimationFrame(instantAnimation);
        }
        animate();
    }

    dijkstra = () => {
        if(this.animating)return;
        let arr = this.state.grid;
        this.clearPathfinder();

        let {visited_nodes, shortestPath} = dijkstraAlgorithm(this.state.grid, this.state.start_node, this.state.end_node)
        
        const animate = async () => {
            let i = 0;
            let j = 0;
            this.animating = true;
            const animateVisited = () => {
                if (i === visited_nodes.length) {
                    requestAnimationFrame(animatePath);
                    return;
                }
                let row = visited_nodes[i].row;
                let col = visited_nodes[i].col;
                arr[row][col].isVisited=true;

                if(!arr[row][col].isStart && !arr[row][col].isEnd)
                document.getElementById(`node-${row}-${col}`).className="node_visited";
                i++;
                requestAnimationFrame(animateVisited);
            }
        
            const animatePath = () => {
                if (j === shortestPath.length) {
                    this.setState({
                        grid: arr,
                        visited: visited_nodes.length,
                        shortestPath: shortestPath.length
                    })
                    this.animating=false;
                    return;
                }
                let row = shortestPath[j].row;
                let col = shortestPath[j].col;
                arr[row][col].isShortestPath = true;
                if (arr[row][col].isStart) {
                    document.getElementById(`node-${row}-${col}`).className="node_path node_start";
                } else if (arr[row][col].isEnd) {
                    document.getElementById(`node-${row}-${col}`).className="node_path node_end";
                } else {
                    document.getElementById(`node-${row}-${col}`).className="node_path";
                }
                j++;
                requestAnimationFrame(animatePath);
            }
            await requestAnimationFrame(animateVisited);
        }   
        animate();
        this.instantAnimations=true;
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
                                onMouseDown={(row,col)=>this.handleMouseDown(row,col)}
                                onMouseEnter={(row,col)=>this.handleMouseEnter(row,col)}
                                onMouseUp={()=>this.handleMouseUp()}
                                onMouseLeave={(row,col)=>this.handleMouseLeave(row,col)}
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