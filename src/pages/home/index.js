import TrackCard from "../../components/TrackCard";
import data from "../../data/dummy";
import "./style.css";

const Home = () => {
  return (
    <div className="page-container">
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
