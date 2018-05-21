import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    let name = 'Patrick';
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello, {name}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p style={{"text-align": "left", fontSize: "small"}}>
          Text with inline styles -- this is widespread in react. To use inline styles, put them inside an object, and use proper object notation
        </p>
      </div>
    );
  }
}

export default App;
