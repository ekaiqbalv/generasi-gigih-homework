import { MouseEventHandler } from 'react';
import { Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ITrackItem } from 'utils/model';
import './style.css';

interface ISelectedTrackCardProps {
  track: ITrackItem;
  onSelect: MouseEventHandler<HTMLElement>;
}

const SelectedTrackCard = ({ track, onSelect }: ISelectedTrackCardProps) => (
  <>
    <div className="selected-track-card-container">
      <img
        data-testid="selected-track-card-image"
        className="selected-track-card-image"
        src={track.album.images[2].url}
        alt={track.album.name}
      />
      <div className="selected-track-card-info">
        <div
          data-testid="selected-track-card-track-and-artist-name"
          className="selected-track-card-track-and-artist-name"
        >
          {`${track.name} - ${track.artists
            .map((artist) => artist.name)
            .join(', ')}`}
        </div>
        <div
          data-testid="selected-track-card-album-name"
          className="selected-track-card-album-name"
        >
          {track.album.name}
        </div>
      </div>
    </div>
    <Tooltip title="Deselect">
      <Button
        data-testid="selected-track-card-button"
        className="selected-track-card-button"
        type="primary"
        shape="circle"
        icon={<DeleteOutlined />}
        danger
        onClick={onSelect}
      />
    </Tooltip>
  </>
);

export default SelectedTrackCard;
