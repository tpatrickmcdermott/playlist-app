import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

let defaultTextColor = "#ccc";
let defaultStyle = {
  color: defaultTextColor,
}

class App extends Component {
  render() {
    // let name = 'Patrick';
    // let headerStyle = {color: "#ffff00", 'font-size': '42px'};
    return (
      <div className="App">
        <h1>Title</h1>
        <Aggregate></Aggregate>
        <Aggregate></Aggregate>
        <Filter />
        <Playlist></Playlist>
      </div>
    );
  }
}

//  COMPONENTS
class Aggregate extends Component {
  render() {
    return (
      <div style={{width: "40%", display: "inline-block"}}>
        <h2 style={{color: defaultTextColor}}>Number Text</h2>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return (
      <div>
        <img/>
        <label for="filter" style={{paddingRight: "1em", color: "#999"}}>Filter</label>
        <input type="text" id="filter" />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let name = "Unknown";
    return (
      <div style={{color: defaultTextColor, width: "25%"}}>
        <img />
        <h3>Playlist {name}</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 1</li>
          <li>Song 1</li>
        </ul>
      </div>
    );
  }
}

export default App;
