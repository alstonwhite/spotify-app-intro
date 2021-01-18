import React, {useState} from 'react'

import SpotifyWebApi from 'spotify-web-api-js';


const Compatibility = () => {

    const spotifyWebApi = new SpotifyWebApi();

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState({user: null, artists: null, tracks: null, date: null});

    const getUser = () => spotifyWebApi.getMe().then(response => {
        console.log("user:", response);
        setUserData({...userData, user: response, date: new Date().toISOString().slice(0, 10)});
    });

    const fetchTopArtists = async function (arr, limit, offset, time_range) {
        // check whether item exists before adding or remove duplicates
        const newArr = await spotifyWebApi.getMyTopTracks({limit: limit, offset: offset, time_range: time_range}).then(response =>
            [...arr, ...response.items]);
        return newArr;
    }

    const fetchTopTracks = async function (arr, limit, offset, time_range) {
        // check whether item exists before adding or remove duplicates
        const newArr = await spotifyWebApi.getMyTopArtists({limit: limit, offset: offset, time_range: time_range}).then(response =>
            [...arr, ...response.items]);
        return newArr;
    }

    const getTopListens = () => { 
        // only pulling in 41 short_term tracks ?
        let topArtists = {long_term: null, med_term: null, short_term: null};
        let topTracks = {long_term: null, med_term: null, short_term: null};
        fetchTopArtists([], 49, 0, "long_term")
            .then(arr => fetchTopArtists(arr, 50, 49, "long_term"))
            .then(arr => topArtists.long_term = arr)
            .then(() => fetchTopArtists([], 49, 0, "medium_term"))
            .then(arr => fetchTopArtists(arr, 50, 49, "medium_term"))
            .then(arr => topArtists.med_term = arr)
            .then(() => fetchTopArtists([], 49, 0, "short_term"))
            .then(arr => fetchTopArtists(arr, 50, 49, "short_term"))
            .then(arr => topArtists.short_term = arr)
            .then(() => {
                console.log("topArtists:", topArtists)
                // setUserData({...userData, artists: topArtists})
            }).then(() => fetchTopTracks([], 49, 0, "long_term"))
            .then(arr => fetchTopTracks(arr, 50, 49, "long_term"))
            .then(arr => topTracks.long_term = arr)
            .then(() => fetchTopTracks([], 49, 0, "medium_term"))
            .then(arr => fetchTopTracks(arr, 50, 49, "medium_term"))
            .then(arr => topTracks.med_term = arr)
            .then(() => fetchTopTracks([], 49, 0, "short_term"))
            .then(arr => fetchTopTracks(arr, 50, 49, "short_term"))
            .then(arr => topTracks.short_term = arr)
            .then(() => {
                console.log("topTracks:", topTracks)
                setUserData({...userData, artists: topArtists, tracks: topTracks})
            });
    }
    
    return (
    <div className="compatibility">
        <h1>compatibility</h1>
        <p>ur listening history is most similar to...</p>
        <button onClick={() => getUser()}>
            get user
        </button>
        <button onClick={() => getTopListens()}>
            pull top listens
        </button>
        <button onClick={() => console.log("userData: ", userData)}>
            log userData
        </button>
        <button onClick={() => console.log("empty")}>
            compare to database
        </button>
    </div>
    );
};
    
export default Compatibility;