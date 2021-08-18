import { render, screen, fireEvent } from '@testing-library/react';
import TrackCard from 'components/TrackCard';
import { ITrackItem } from 'utils/model';

const trackProps: ITrackItem = {
  uri: 'spotify:track:2bEuh25NMtUEQGu6VqohPu',
  name: 'Timur',
  album: {
    id: '6EjtRvsWa1wRYJgeJOROI3',
    name: 'Agterplaas',
    images: [
      {
        url: 'https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c26',
      },
      {
        url: 'https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c26',
      },
      {
        url: 'https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c26',
      },
    ],
  },
  artists: [{ id: '0zuIBB0gRxp4i4E2gvrcoM', name: 'The Adams' }],
};

test('Render an image in TrackCard component', () => {
  render(
    <TrackCard track={trackProps} isSelected={false} onSelect={() => {}} />,
  );
  const trackImageElement = screen.getByTestId('track-card-image');
  expect(trackImageElement).toBeInTheDocument();
});

test('Render a track name in TrackCard component', () => {
  render(
    <TrackCard track={trackProps} isSelected={false} onSelect={() => {}} />,
  );
  const trackNameElement = screen.getByTestId('track-card-track-name');
  expect(trackNameElement).toBeInTheDocument();
});

test('Render an artist name in TrackCard component', () => {
  render(
    <TrackCard track={trackProps} isSelected={false} onSelect={() => {}} />,
  );
  const artistNameElement = screen.getByTestId('track-card-artist-name');
  expect(artistNameElement).toBeInTheDocument();
});

test('Render an album name in TrackCard component', () => {
  render(
    <TrackCard track={trackProps} isSelected={false} onSelect={() => {}} />,
  );
  const albumNameElement = screen.getByTestId('track-card-album-name');
  expect(albumNameElement).toBeInTheDocument();
});

test('Render a button in TrackCard component', () => {
  render(
    <TrackCard track={trackProps} isSelected={false} onSelect={() => {}} />,
  );
  const buttonElement = screen.getByTestId('track-card-button');
  expect(buttonElement).toBeInTheDocument();
});

test('Image in TrackCard component has right src', () => {
  render(
    <TrackCard track={trackProps} isSelected={false} onSelect={() => {}} />,
  );
  const trackImageElement = screen.getByTestId('track-card-image');
  expect(trackImageElement.getAttribute('src')).toBe(
    'https://i.scdn.co/image/ab67616d0000b273848d417028ad1eb2f8ff9c26',
  );
});

test('Image in TrackCard component has right alt', () => {
  render(
    <TrackCard track={trackProps} isSelected={false} onSelect={() => {}} />,
  );
  const trackImageElement = screen.getByTestId('track-card-image');
  expect(trackImageElement.getAttribute('alt')).toBe('Agterplaas');
});

test('Track name in TrackCard component has right value', () => {
  render(
    <TrackCard track={trackProps} isSelected={false} onSelect={() => {}} />,
  );
  const trackNameElement = screen.getByTestId('track-card-track-name');
  expect(trackNameElement.innerHTML).toBe('Timur');
});

test('Artist name in TrackCard component has right value', () => {
  render(
    <TrackCard track={trackProps} isSelected={false} onSelect={() => {}} />,
  );
  const artistNameElement = screen.getByTestId('track-card-artist-name');
  expect(artistNameElement.innerHTML).toBe('The Adams');
});

test('Album name in TrackCard component has right value', () => {
  render(
    <TrackCard track={trackProps} isSelected={false} onSelect={() => {}} />,
  );
  const albumNameElement = screen.getByTestId('track-card-album-name');
  expect(albumNameElement.innerHTML).toBe('Agterplaas');
});

test('Button text in TrackCard component is Select', () => {
  render(
    <TrackCard track={trackProps} isSelected={false} onSelect={() => {}} />,
  );
  const buttonElement = screen.getByTestId('track-card-button');
  expect(buttonElement.innerHTML).toBe('Select');
});

test('Button text in TrackCard component is Deselect', () => {
  render(<TrackCard track={trackProps} isSelected onSelect={() => {}} />);
  const buttonElement = screen.getByTestId('track-card-button');
  expect(buttonElement.innerHTML).toBe('Deselect');
});

test('Calls onClick prop when clicked button in TrackCard component', () => {
  const handleClick = jest.fn();
  render(<TrackCard track={trackProps} isSelected onSelect={handleClick} />);
  const buttonElement = screen.getByTestId('track-card-button');
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
