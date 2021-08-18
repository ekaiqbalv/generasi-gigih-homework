import { MouseEventHandler } from 'react';
import { ITrackItem } from 'utils/model';
import './style.css';

interface ITrackCardProps {
  track: ITrackItem;
  isSelected: boolean;
  onSelect: MouseEventHandler<HTMLButtonElement>;
}

const TrackCard = ({ track, isSelected, onSelect }: ITrackCardProps) => {
  const artistsName = track.artists.map((artist) => artist.name).join(', ');

  return (
    <div className="card-container">
      <div className="description-container">
        <img
          data-testid="track-card-image"
          className="album-image"
          src={track.album.images[1].url}
          alt={track.album.name}
        />
        <div data-testid="track-card-track-name" className="track-name">{track.name}</div>
        <div data-testid="track-card-artist-name" className="artist-name">{artistsName}</div>
        <div data-testid="track-card-album-name" className="album-name">{track.album.name}</div>
      </div>
      <button data-testid="track-card-button" type="button" className="select-track-button" onClick={onSelect}>
        {isSelected ? 'Deselect' : 'Select'}
      </button>
    </div>
  );
};

export default TrackCard;
