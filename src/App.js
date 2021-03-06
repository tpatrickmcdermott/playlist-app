/*  New Features
(1) FB custom JS proposal

* TODO: Clean up time formats: 6:05 displays as 6:5
*/

import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

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
          {name: "Like a Virgin", duration: 3823},
          {name: "Yellow Submarine", duration: 365}
        ]
      },
      {
        name: 'Discover Weekly',
        songs: [
          {name: "Ironman", duration: 573},
          {name: "The Immigrant Song", duration: 342},
          {name: "The Sunshine of My Love", duration: 342},
        ]
      },
      {
        name: 'Songs about Animals',
        songs: [
          {name: "Fish Heads", duration: 135, artist: "Barnes and Barnes"},
          {name: "Smelly Cat", duration: 557},
          {name: "Worm Food", duration: 357},
        ]
      },
      {
        name: 'Songs by Animals',
        songs: [
          {name: "Cats Rule", duration: 135, artist: "The Cats"},
          {name: "Dogs Suck", duration: 15, artist: "Not the Dogs"},
          {name: "Smelly Dog", duration: 557},
          {name: "Worm Heads", duration: 357},
        ]
      },
    ],
  }
};


//  ===========================================================
//  APP main component
//  ===========================================================
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      serverData: {},
      filterString: ''
    };
  }
  componentDidMount() {
    // setTimeout( () => {
    //   this.setState({serverData: fakeServerData});
    // }, 200);
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
     if (!accessToken) return;
    // console.log(accessToken);

    // get user via spotify sign-in
    fetch( 'https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer '+accessToken}
    })
      .then( response => response.json() )
      // .then( data => this.setState({serverData: {user: {name: data.display_name}}}) )
      .then( data => this.setState({user: {name: data.display_name}}) )




    // get user's playlists
    fetch( 'https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer '+accessToken}
    })
      .then( response => response.json() )
      // .then( data => this.setState({serverData: {user: {playlists: data.items}}}) )
      .then( data => this.setState({
        playlists: data.items.map(item => ({
              name: item.name,
              thumb: item.images[0],
              songs: []
            }))
      }))
      .then(data => console.log(this.state.playlists))
  }
  render() {
    //  ---------------------------------   Shortcuts |
    // let user = this.state.serverData.user;
    let user = this.state.user;
    //  ----------------------------------------------|
    let playlistToRender =
      this.state.user &&
      this.state.playlists
        ? this.state.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(
              this.state.filterString.toLowerCase())
          )
        : [];
    return (
      <div className="App">
        {user ?
          <div id="results">
            <h1 style={{color: "#fff"}}>
            {this.state.user.name}&apos;s Playlists
            </h1>
              <PlayListCounter playlists={playlistToRender} />
              {/* <HoursCounter playlists={playlistToRender} /> */}
              <HoursCounter playlists={playlistToRender} />
              <Filter onTextChange={text => {
                  this.setState( {filterString: text} )
                  }
                }/>

              {playlistToRender.map(playlist =>
                  <Playlist playlist={playlist} foo={"bar"} />
                )
              }
          </div> :
          // -- or --
          <button onClick={()=> window.location.replace('http://localhost:8888/login')}
            style={{padding: "1em", marginTop: "1em", fontSize: "1em", borderRadius: "8px"}}>
            Sign in with Spotify</button>
        }
      </div>
    );
  }
}

//  SUB-COMPONENTS
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
        <img alt=""/>
        <label for="filter" style={{paddingRight: "1em", color: "#999"}}>Filter</label>
        <input type="text" onChange={event =>
          this.props.onTextChange(event.target.value) } />
      </div>
    );
  }
}

class Playlist extends Component {
  render() {
    let playlist = this.props.playlist;
    let hms = function(time) {
      let seconds = time % 60;
      return "length: "  + Math.floor(time/60)+":"+seconds
    }
    return (
      //  Use object spread operator (1)
      <div style={{...defaultStyle, display: "inline-block", width: "25%", marginLeft: ".25em"}}>
        <div style={{}}>
          <img alt="" src={playlist.thumb.url} style={{width:"100%"}}/>
        </div>
        <h3>{playlist.name}</h3>
        <ul>
          {playlist.songs.map( song =>
            <li style={{"text-align": "left", "margin-bottom": ".5em"}}>{song.name} <br/>
            <i style={{"font-size": ".75em", "color": "#999"}}>
              {hms(song.duration)}
            </i></li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
