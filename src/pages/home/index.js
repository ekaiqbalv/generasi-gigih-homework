import { useState, useEffect } from "react";
import queryString from "query-string";
import Navbar from "../../components/Navbar";
import TrackCard from "../../components/TrackCard";
import data from "../../data/dummy";
import "./style.css";

const Home = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    if (window.location.hash) {
      let params = queryString.parse(window.location.hash);
      window.location.hash = "";
      setToken(params.access_token);
    }
  }, []);

  return (
    <div className="page-container">
      <Navbar isLoggedIn={token ? true : false} />
      <h1 className="section-title">Playlists</h1>
      <h2 className="sub-section-title">Suggestions</h2>
      <div className="playlist-container">
        {data.map((track) => (
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
