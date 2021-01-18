import React, {useState, useEffect} from 'react'

import SpotifyWebApi from 'spotify-web-api-js';


const BoilerRoom = () => {

    const spotifyWebApi = new SpotifyWebApi();

    const [playlists, setPlaylists] = useState([]);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [trackDetails, setTrackDetails] = useState(null);

    const getUser = () => {
        spotifyWebApi.getMe().then((response => {
          return response.id
        }))
    }
    
    const getPlaylists = () => {
        // add options (number of playlists, etc)
        spotifyWebApi.getUserPlaylists('awhite45',{limit: 25}).then(response => {
          setPlaylists([...response.items]);
        })
    }

    const getPlaylistTracks = (id) => {
        // add options (number of songs, etc)
        spotifyWebApi.getPlaylistTracks('awhite45', id).then(response => {
            console.log(response.items)
            setPlaylistTracks(response.items);
        })
    }

    const getTrack = (id) => {
        // add options (number of songs, etc)
        spotifyWebApi.getTrack(id).then(response => {
            console.log(response)            
            // setTrack(response);
        })
    }

    const getTrackAudioFeatures = (id) => {
        // add options (number of songs, etc)
        spotifyWebApi.getAudioFeaturesForTrack(id).then(response => {
            // console.log(response)            
            setTrackDetails(response);
        })
    }
    
    return (
    <div className="boiler">
        <div className="boiler-selections">
            <button onClick={() => getPlaylists()}>
                Check User's Playlists
            </button>
            <button onClick={() => getPlaylistTracks('565yRrbI6RtIuKZhgAcNnX')}>
                get songs example
            </button>
        </div>
        <div className='boiler-playlists'>
            {playlists[0] && playlists.map(playlist => 
                <button 
                    value={playlist.id}
                    onClick={e => getPlaylistTracks(e.target.value)}
                >
                    {playlist.name}
                </button>
            )}  
        </div>
        <div className='boiler-tracks'>
            {playlistTracks[0] && playlistTracks.map(track => 
                <div>
                    <button
                        value={track.track.id}
                        onClick={e => getTrackAudioFeatures(e.target.value)}
                    >
                        {track.track.name} - {track.track.artists[0].name}
                    </button>
                </div>
            )}  
        </div>
        <div className='boiler-track-detail'>
            {trackDetails && Object.keys(trackDetails).map(key => 
                <div>
                    {key}: {trackDetails[key]}
                </div>
            )}  
        </div>
        {/* add see more button (calls again with offset) */}
    </div>
    );
};
    
export default BoilerRoom;