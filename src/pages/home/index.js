import { useState, useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
import { API_BASE_URL } from "../../constants/spotify";
import Navbar from "../../components/Navbar";
import TrackCard from "../../components/TrackCard";
import "./style.css";

const Home = () => {
  const [token, setToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedTrackUri, setSelectedTrackUri] = useState([]);

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
        .get(`${API_BASE_URL}/search`, {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            q: query,
            type: "track",
            limit: 12,
          },
        })
        .then((response) => setTracks(response.data.tracks.items))
        .catch((error) => {
          if (error.response.status === 401) alert("You should log in first!");
        });
    }
  };

  const handleSelectTrack = (trackUri) => {
    if (selectedTrackUri.includes(trackUri)) {
      setSelectedTrackUri([
        ...selectedTrackUri.filter((uri) => uri !== trackUri),
      ]);
    } else {
      setSelectedTrackUri([...selectedTrackUri, trackUri]);
    }
  };

  return (
    <div className="page-container">
      <Navbar isLoggedIn={token ? true : false} />
      <h1 className="section-title">Playlists</h1>
      <input
        className="search-input"
        placeholder="What track are you looking for?"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="search-button"
        onClick={() => handleSearch(searchQuery)}
      >
        Search
      </button>
      <h2 className="sub-section-title">{tracks.length > 0 && "Results"}</h2>
      <div className="playlist-container">
        {tracks.length > 0 &&
          tracks.map((track) => (
            <TrackCard
              key={track.uri}
              trackName={track.name}
              album={track.album}
              artists={track.artists}
              isSelected={selectedTrackUri.includes(track.uri)}
              onSelect={() => handleSelectTrack(track.uri)}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
