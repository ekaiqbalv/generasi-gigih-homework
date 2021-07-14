import data from './data/dummy';
import './App.css';

const App = () => {
  const { name: trackName, album, artists } = data;

  const onClickSelectTrackButton = () => {
    alert("Clicked");
  };

  return (
    <div className="app">
      <div className="page-container">
        <h1 className="section-title">Playlists</h1>
        <h2 className="sub-section-title">Suggestions</h2>
        <div className="playlist-container">
          <div className="card-container">
            <img className="album-image" src={album.images[0].url} alt={album.name} />
            <div className="description-container">
              <div className="track-name">{trackName}</div>
              <div className="artist-name">{artists[0].name}</div>
              <div className="album-name">{album.name}</div>
            </div>
            <button className="select-track-button" onClick={onClickSelectTrackButton}>Select</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
