/*  New Features
(1) Add defaultStyle Object, so we can use object spread operator
    (this is a Facebook proposal -- not yet finalized in JSNext)
(2) Create git repository
(3) The rest should be covered by git
*/

import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// let defaultTextColor = "#ccc";
let defaultStyle = {
  color: "#ccc",
};
let fakeServerData = {
  user: {
    name: 'Paddy'
  }
};
let test = "freddy"

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{color: "#fff"}}>{fakeServerData.user.name}&apos;s Playlists</h1>
        <Aggregate></Aggregate>
        <Aggregate></Aggregate>
        <Filter />
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

//  COMPONENTS
class Aggregate extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>Number Text</h2>
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
      //  Use object spread operator (1)
      <div style={{...defaultStyle, display: "inline-block", width: "25%"}}>
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
