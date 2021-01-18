import React from 'react'
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';

import Player from './components/Player';
import IndieCalc from './components/IndieCalc';
import BoilerRoom from './components/BoilerRoom';
import Listmas from './components/Listmas';
import Compatibility from './components/Compatibility';

function App() {

  const spotifyWebApi = new SpotifyWebApi();

  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  const params = getHashParams();
  const loggedIn = params.access_token ? true : false;

  if(params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  return (
    <div className="App">
      <a href='http://localhost:8888'> 
        <button>Log in with Spotify</button>
      </a>
      <div>
        Logged In: {loggedIn ? 'Yes' : 'No'}
      </div>
      {/* <Player/> */}
      {/* <IndieCalc/> */}
      {/* <BoilerRoom/> */}
      {/* <Listmas/> */}
      <Compatibility/>
    </div>
  );
}

export default App;
