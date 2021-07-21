import { useState, useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
import Navbar from "../../components/Navbar";
import TrackCard from "../../components/TrackCard";
import data from "../../data/dummy";
import "./style.css";

const Home = () => {
  const [token, setToken] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [tracks, setTracks] = useState();

  useEffect(() => {
    if (window.location.hash) {
      let params = queryString.parse(window.location.hash);
      window.location.hash = "";
      setToken(params.access_token);
    }
  }, []);

  const handleSearch = (query) => {
    if (query) {
      axios
        .get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            q: query,
            type: "track",
            limit: 12,
          },
        })
        .then((response) => setTracks(response.data.tracks.items));
    }
  };

  return (
    <div className="page-container">
      <Navbar isLoggedIn={token ? true : false} />
      <h1 className="section-title">Playlists</h1>
      <input className="search-input" onChange={(e) => setSearchQuery(e.target.value)} />
      <button className="seatch-button" onClick={() => handleSearch(searchQuery)}>Search</button>
      <h2 className="sub-section-title">
        {tracks ? "Results" : "Suggestions"}
      </h2>
      <div className="playlist-container">
        {tracks
          ? tracks.map((track) => (
              <TrackCard
                key={track.id}
                trackName={track.name}
                album={track.album}
                artists={track.artists}
              />
            ))
          : data.map((track) => (
              <TrackCard
                key={track.id}
                trackName={track.name}
                album={track.album}
                artists={track.artists}
              />
            ))}
      </div>
    </div>
  );
};

export default Home;
