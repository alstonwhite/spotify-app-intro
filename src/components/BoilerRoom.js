import React, {useState, useEffect} from 'react'

import SpotifyWebApi from 'spotify-web-api-js';


const BoilerRoom = () => {

    const spotifyWebApi = new SpotifyWebApi();

    const [playlists, setPlaylists] = useState([]);

    const getUser = () => {
        spotifyWebApi.getMe().then((response => {
          return response.id
        }))
    }
    
    const getPlaylists = () => {
        // add options (number of playlists, etc)
        spotifyWebApi.getUserPlaylists({limit: 25}).then((response => {
          console.log(response)
          setPlaylists([...response.items]);
        }))
    }

    return (
    <div>
        <button onClick={() => getPlaylists()}>
            Check User's Playlists
        </button>
        <div>
            {playlists[0] && playlists.map(playlist => 
                <div>{playlist.name}</div>
            )}  
        </div>
        {/* add see more button (calls again with offset) */}
    </div>
    );
};
    
export default BoilerRoom;