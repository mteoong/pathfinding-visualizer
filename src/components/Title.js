import React, { Component } from 'react';
import './title.css';

class Title extends Component {
    render() {
        const styles = {
            color: "white",
            width: "100%", 
            backgroundColor: "#394a6d",
            paddingTop: "15px",
            paddingBottom: "10px",
            fontSize: "2.4rem",
            textAlign: "center",
            fontWeight: "700",
        }
        
        return(
            <div className="title" style={styles}> Pathfinding Visualizer </div>
        )
    }
}

export default Title;