import { render, screen, fireEvent } from '@testing-library/react';
import SelectedTrackCard from 'components/SelectedTrackCard';
import { ITrackItem } from 'utils/model';

const trackProps: ITrackItem = {
  uri: 'spotify:track:2bEuh25NMtUEQGu6VqohPu',
  name: 'Timur',
  album: {
    id: '6EjtRvsWa1wRYJgeJOROI3',
    name: 'Agterplaas',
    images: [
      {
        url: 'https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c261',
      },
      {
        url: 'https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c262',
      },
      {
        url: 'https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c263',
      },
    ],
  },
  artists: [{ id: '0zuIBB0gRxp4i4E2gvrcoM', name: 'The Adams' }],
};

test('Render an image in SelectedTrackCard component', () => {
  render(<SelectedTrackCard track={trackProps} onSelect={() => {}} />);
  const trackImageElement = screen.getByTestId('selected-track-card-image');
  expect(trackImageElement).toBeInTheDocument();
});

test('Render track and artist name in SelectedTrackCard component', () => {
  render(<SelectedTrackCard track={trackProps} onSelect={() => {}} />);
  const trackAndArtistNameElement = screen.getByTestId(
    'selected-track-card-track-and-artist-name',
  );
  expect(trackAndArtistNameElement).toBeInTheDocument();
});

test('Render an album name in SelectedTrackCard component', () => {
  render(<SelectedTrackCard track={trackProps} onSelect={() => {}} />);
  const albumNameElement = screen.getByTestId('selected-track-card-album-name');
  expect(albumNameElement).toBeInTheDocument();
});

test('Render a button in SelectedTrackCard component', () => {
  render(
    <SelectedTrackCard track={trackProps} onSelect={() => {}} />,
  );
  const buttonElement = screen.getByTestId('selected-track-card-button');
  expect(buttonElement).toBeInTheDocument();
});

test('Image in SelectedTrackCard component has right src', () => {
  render(
    <SelectedTrackCard track={trackProps} onSelect={() => {}} />,
  );
  const trackImageElement = screen.getByTestId('selected-track-card-image');
  expect(trackImageElement.getAttribute('src')).toBe(
    'https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c263',
  );
});

test('Image in SelectedTrackCard component has right alt', () => {
  render(
    <SelectedTrackCard track={trackProps} onSelect={() => {}} />,
  );
  const trackImageElement = screen.getByTestId('selected-track-card-image');
  expect(trackImageElement.getAttribute('alt')).toBe('Agterplaas');
});

test('Track and artist name in SelectedTrackCard component has right value', () => {
  render(
    <SelectedTrackCard track={trackProps} onSelect={() => {}} />,
  );
  const trackNameElement = screen.getByTestId('selected-track-card-track-and-artist-name');
  expect(trackNameElement.innerHTML).toBe('Timur - The Adams');
});

test('Album name in SelectedTrackCard component has right value', () => {
  render(
    <SelectedTrackCard track={trackProps} onSelect={() => {}} />,
  );
  const albumNameElement = screen.getByTestId('selected-track-card-album-name');
  expect(albumNameElement.innerHTML).toBe('Agterplaas');
});

test('Calls onClick prop when clicked button in SelectedTrackCard component', () => {
  const handleClick = jest.fn();
  render(<SelectedTrackCard track={trackProps} onSelect={handleClick} />);
  const buttonElement = screen.getByTestId('selected-track-card-button');
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
