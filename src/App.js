import React, {useState, useEffect} from 'react'
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';

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
  const [nowPlaying, setNowPlaying] = useState({name: 'Not Checked', image: ''});
  const [topListens, setTopListens] = useState([]);
  
  const [listenParams, setListenParams] = useState(null);
  const [timeParams, setTimeParams] = useState(null);


  if(params.access_token) {
    spotifyWebApi.setAccessToken(params.access_token);
  }

  const getNowPlaying = () => {
    spotifyWebApi.getMyCurrentPlaybackState().then((response => {
      console.log('spotify web api reponse:')  
      console.log(response)
        setNowPlaying({
          name: response.item.name,
          image: response.item.album.images[0].url
      })
    }))
  }

  const getTopSongs = () => {
    spotifyWebApi.getMyTopTracks({limit: 50, time_range: 'short_term'}).then((response => {
      console.log('spotify web api reponse:');
      console.log(response.items);
      setTopListens(response.items);
    }));
  }

  const getTopListens = (listenParams, timeParams) => {
    // console.log(listenParams)
    // console.log(timeParams)
    if(listenParams === 'songs') {
      // console.log('fetching songs')
      spotifyWebApi.getMyTopTracks({limit: 50, time_range: timeParams}).then((response => {
        // console.log('spotify web api reponse:');
        // console.log(response.items);
        setTopListens(response.items);
      }));
    } else {
      console.log('fetching artists')
      spotifyWebApi.getMyTopArtists({limit: 50, time_range: timeParams}).then((response => {
        // console.log('spotify web api reponse:');
        // console.log(response.items);
        setTopListens(response.items);
      }));
    }
  }

  const calcAvg = (topListens) => {
    // console.log(topListens);
    let weightAvg = parseInt(topListens.reduce((acc, cur, i) => acc + cur.popularity * (50-i), 0)) / 1275;
    let avg = parseInt(topListens.reduce((acc, cur) => acc + cur.popularity, 0)) / 50;
    console.log("weight avg:");
    console.log(weightAvg);
    console.log("avg:");
    console.log(avg);
  }

  return (
    <div className="App">
      <a href='http://localhost:8888'> 
        <button>Log in with Spotify</button>
      </a>
      <div>
        Logged In: {loggedIn ? 'Yes' : 'No'}
      </div>
      {/* <div>
        Now Playing: {nowPlaying.name}
      </div>
      <div>
        <img src={nowPlaying.image} style={{width: 100}}/>
      </div>
      <button onClick={() => getNowPlaying()}>
        Check Now Playing
      </button> */}
      <h1>how deep r u ?</h1>
      <p>based on ur</p>
      <div>
        <input type="radio" id="songs" name="selection1" value="songs" 
          onChange={(e)=>setListenParams(e.target.value)}/>
        <label for="songs">songs</label>
        <input type="radio" id="artists" name="selection1" value="artists"
          onChange={(e)=>setListenParams(e.target.value)}/>
        <label for="artists">artists</label>
      </div>
      <p>from</p>
      <div>
        <input type="radio" id="short_term" name="selection2" value="short_term"
          onChange={(e)=>setTimeParams(e.target.value)}/>
        <label for="short_term">recently</label>
        <input type="radio" id="medium_term" name="selection2" value="medium_term"
          onChange={(e)=>setTimeParams(e.target.value)}/>
        <label for="medium_term">in the middle</label>
        <input type="radio" id="long_term" name="selection2" value="long_term"
          onChange={(e)=>setTimeParams(e.target.value)}/>
        <label for="long_term">lifetime</label>
      </div>
      <button onClick={() => getTopListens(listenParams, timeParams)}>
        show me
      </button>
      <button onClick={() => getTopSongs()}>
        show me (top songs)
      </button>
      <button onClick={() => calcAvg(topListens)}>
        calc
      </button>

      {listenParams==='songs' ? 
        <table>
        <thead>
          <tr>
            <th>song</th>
            <th>artist</th>
            <th>ur listens</th>
            <th>popularity</th>
          </tr>
        </thead>
        <tbody>
          {topListens.map((song,i) => 
          <tr>
            <td>{song.name}</td>
            <td>{song.artists[0].name}</td>
            <td>{i+1}</td>
            <td>{song.popularity}</td>
          </tr>
          )}
        </tbody>
      </table> :
      <table>
        <thead>
          <tr>
            <th>artist</th>
            <th>ur listens</th>
            <th>popularity</th>
          </tr>
        </thead>
        <tbody>
          {topListens.map((artist,i) => 
          <tr>
            <td>{artist.name}</td>
            <td>{i+1}</td>
            <td>{artist.popularity}</td>
          </tr>
          )}
        </tbody>
      </table>
      }

      {/* <table>
        <thead>
          <tr>
            <th>song</th>
            <th>artist</th>
            <th>ur listens</th>
            <th>popularity</th>
          </tr>
        </thead>
        <tbody>
          {topListens.map((song,i) => 
          <tr>
            <td>{song.name}</td>
            <td>{song.artists[0].name}</td>
            <td>{i+1}</td>
            <td>{song.popularity}</td>
          </tr>
          )}
        </tbody>
      </table> */}
    </div>
  );
}

export default App;
