import React, { Component } from 'react';
import './wrapper.css';
import Board from "./Board";
import Toolbar from "./Toolbar";

class Wrapper extends Component {
    render() {
        return(
            <div className="body-wrapper">
                <Toolbar/>
                <Board/>
            </div>
        )
    }
}

export default Wrapper;