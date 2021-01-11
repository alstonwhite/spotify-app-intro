import React, {useState, useEffect} from 'react'

import SpotifyWebApi from 'spotify-web-api-js';


const Player = () => {

    const spotifyWebApi = new SpotifyWebApi();

    const [nowPlaying, setNowPlaying] = useState({name: 'Not Checked', image: ''});

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


    return (
    <div>
      <div>
        Now Playing: {nowPlaying.name}
      </div>
      <div>
        <img src={nowPlaying.image} style={{width: 100}}/>
      </div>
      <button onClick={() => getNowPlaying()}>
        Check Now Playing
      </button>
    </div>
    );
};
    
    export default Player;