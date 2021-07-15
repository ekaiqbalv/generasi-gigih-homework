import TrackCard from '../../components/TrackCard';
import data from '../../data/dummy';
import './style.css';

const Home = () => {
  const { name: trackName, album, artists } = data;

  return (
    <div className="page-container">
      <h1 className="section-title">Playlists</h1>
      <h2 className="sub-section-title">Suggestions</h2>
      <div className="playlist-container">
        <TrackCard trackName={trackName} album={album} artists={artists} />
      </div>
    </div>
  );
};

export default Home;
