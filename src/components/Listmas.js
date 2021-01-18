import React, {useState, useEffect} from 'react'

import SpotifyWebApi from 'spotify-web-api-js';


const Listmas = () => {

    const spotifyWebApi = new SpotifyWebApi();

    const [yearFilter, setYearFilter] = useState(null);
    const [topTracks, setTopTracks] = useState([]);

    const fetchTopTracks = async function (arr, limit, offset, time_range) {
        // check whether item exists before adding or remove duplicates
        const newArr = await spotifyWebApi.getMyTopTracks({limit: limit, offset: offset, time_range: time_range}).then(response =>
            [...arr, ...response.items.filter(item => item.album.release_date.substring(0,4)===yearFilter)]);
        return newArr;
    }

    const getTopTracks = () => { 
        fetchTopTracks([], 49, 0, "long_term")
            .then(arr => fetchTopTracks(arr, 50, 49, "long_term"))
            .then(arr => fetchTopTracks(arr, 49, 0, "medium_term"))
            .then(arr => fetchTopTracks(arr, 50, 49, "medium_term"))
            .then(arr => fetchTopTracks(arr, 49, 0, "short_term"))
            .then(arr => fetchTopTracks(arr, 50, 49, "short_term"))
            .then(arr => setTopTracks(arr));
    }
    
    return (
    <div className="listmas">
        <h1>listmas</h1>
        <p>ur top songs of the year in...</p>
        <div>
            <input type="radio" id="2021" name="year" value="2021"
                onChange={(e)=>setYearFilter(e.target.value)}/>
            <label for="2021">2021</label>
            <input type="radio" id="2020" name="year" value="2020"
                onChange={(e)=>setYearFilter(e.target.value)}/>
            <label for="2020">2020</label>
            <input type="radio" id="2019" name="year" value="2019"
                onChange={(e)=>setYearFilter(e.target.value)}/>
            <label for="2019">2019</label>
            <input type="radio" id="2018" name="year" value="2018"
                onChange={(e)=>setYearFilter(e.target.value)}/>
            <label for="2018">2018</label>
            <input type="radio" id="2017" name="year" value="2017"
                onChange={(e)=>setYearFilter(e.target.value)}/>
            <label for="2017">2017</label>
        </div>
        
        <button onClick={() => getTopTracks()}>
            show me
        </button>
        {topTracks[0] && 
        <table>
            <thead>
            <tr>
                <th>rank</th>
                <th>song</th>
                <th>artist</th>
            </tr>
            </thead>
            <tbody>
            {topTracks.map((song,i) => 
            <tr>
                <td>{i+1}</td>
                <td>{song.name}</td>
                <td>{song.artists[0].name}</td>
            </tr>
            )}
            </tbody>
        </table>
        }
    </div>
    );
};
    
export default Listmas;