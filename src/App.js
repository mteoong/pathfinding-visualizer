import React, { Component } from "react";
import Title from "./components/Title";
import Toolbar from "./components/Toolbar";

class App extends Component {
  render() {
    let styles={height:"100%",}
    return (
      <div style={styles}>
        <Title/>
        <Toolbar/>
      </div>
    )
  }
}

export default App;

/*
Colors:
Dark Blue: 334257
Black: 2b2b2b
Brown: 362222
*/