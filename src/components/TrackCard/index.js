import './style.css';

const TrackCard = ({ trackName, album, artists }) => {
  let artistsName = artists.map((artist) => artist.name).join(", ");

  const onClickSelectTrackButton = (trackName) => {
    alert(`Clicked ${trackName}`);
  };

  return (
    <div className="card-container">
      <img className="album-image" src={album.images[0].url} alt={album.name} />
      <div className="description-container">
        <div className="track-name">{trackName}</div>
        <div className="artist-name">{artistsName}</div>
        <div className="album-name">{album.name}</div>
      </div>
      <button
        className="select-track-button"
        onClick={() => onClickSelectTrackButton(trackName)}
      >
        Select
      </button>
    </div>
  );
};

export default TrackCard;
