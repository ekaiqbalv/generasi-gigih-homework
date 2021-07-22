import "./style.css";

const TrackCard = ({ trackName, album, artists, isSelected, onSelect }) => {
  let artistsName = artists.map((artist) => artist.name).join(", ");

  return (
    <div className="card-container">
      <div className="description-container">
        <img
          className="album-image"
          src={album.images[0].url}
          alt={album.name}
        />
        <div className="track-name">{trackName}</div>
        <div className="artist-name">{artistsName}</div>
        <div className="album-name">{album.name}</div>
      </div>
      <button className="select-track-button" onClick={onSelect}>
        {isSelected ? "Deselect" : "Select"}
      </button>
    </div>
  );
};

export default TrackCard;
