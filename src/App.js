/*  New Features
(1) FB custom JS proposal
*/

import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: "#ccc",
};
let fakeServerData = {
  user: {
    name: 'Paddy',
    playlists: [
      {
        name: "My Favs",
        songs: [
          {name: "Beat It", duration: 265},
          {name: "Billy Jean", duration: 323},
        ]
      },
      {
        name: 'Discover weekly',
        songs: [
          {name: "Ironman", duration: 573},
          {name: "The Immigrant Song", duration: 342},
          {name: "The Sunshine of My Love", duration: 342},
        ]
      },
      {
        name: 'Another Playlist',
        songs: [
          {name: "Fish Heads", duration: 135, artist: "Barnes and Barnes"},
          {name: "Smelly Cat", duration: 557},
        ]
      },
    ],
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = { serverData: {} };
  }
  componentDidMount() {
    setTimeout( () => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  };
  render() {
    let s = this.state.serverData;  // shortcut
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div id="results">
            <h1 style={{color: "#fff"}}>
            {s.user.name}&apos;s Playlists
            </h1>

            <PlayListCounter playlists={this.state.serverData.user.playlists} />
            <HoursCounter playlists={this.state.serverData.user.playlists} />
            <Filter />
            {
              this.state.serverData.user.playlists.map(playlist =>
                <Playlist name={playlist.name} foo={"bar"} />
              )
            }
          </div> :
          <h1>Loading...</h1>
        }
      </div>
    );
  }
}

//  COMPONENTS
class PlayListCounter extends Component {
  render() {
    return (
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>
          {this.props.playlists.length} playlists
        </h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce( (songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, []);
    let totalDuration = allSongs.reduce( (a, b) => {
      return a + b.duration;
    }, 0);
    return (
      <div style={{...defaultStyle, width: "40%", display: "inline-block"}}>
        <h2>{Math.round(totalDuration/60)} minutes </h2>
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
    return (
      //  Use object spread operator (1)
      <div style={{...defaultStyle, display: "inline-block", width: "25%"}}>
        <img />
        <h3>{this.props.name}</h3>
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
