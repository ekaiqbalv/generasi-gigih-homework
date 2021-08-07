import { useState } from 'react';
import {
  Typography, List, notification, FormInstance,
} from 'antd';
import { useAppSelector } from 'redux/hooks';
import axios from 'axios';
import { API_BASE_URL } from 'constants/spotify';
import Navbar from 'components/Navbar';
import SearchBar from 'components/SearchBar';
import CreatePlaylist from 'components/CreatePlaylist';
import TrackCard from 'components/TrackCard';
import { ITrack } from 'utils/model';
import './style.css';

const Page = () => {
  const user = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<Array<ITrack>>([]);
  const [selectedTrackUri, setSelectedTrackUri] = useState<Array<string>>([]);

  const handleSubmitFormCreatePlaylist = async (form: FormInstance) => {
    const formData = form.getFieldsValue();
    try {
      const responseCreatePlaylist = await axios.post(
        `${API_BASE_URL}/users/${user.id}/playlists`,
        {
          name: formData.title,
          public: false,
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      if (selectedTrackUri.length > 0) {
        await axios.post(
          `${API_BASE_URL}/playlists/${responseCreatePlaylist.data.id}/tracks`,
          {
            uris: selectedTrackUri,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
      }
      setSelectedTrackUri([]);
      notification.success({
        message: 'Success',
        description: 'You have successfully created a new playlist!',
      });
      form.resetFields();
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        notification.error({
          message: 'Error',
          description:
            'There is something wrong, make sure you have been logged in!',
        });
      }
    }
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery) {
      setLoading(true);
      axios
        .get(`${API_BASE_URL}/search`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            q: searchQuery,
            type: 'track',
            limit: 12,
          },
        })
        .then((response) => {
          setTracks(response.data.tracks.items);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 400 || error.response.status === 401) {
            notification.error({
              message: 'Error',
              description:
                'There is something wrong, make sure you have been logged in!',
            });
          }
        });
    }
  };

  const handleSelectTrack = (trackUri: string) => {
    if (selectedTrackUri.includes(trackUri)) {
      setSelectedTrackUri([
        ...selectedTrackUri.filter((uri) => uri !== trackUri),
      ]);
    } else {
      setSelectedTrackUri([...selectedTrackUri, trackUri]);
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <div className="main-content">
        <div className="create-playlist-content">
          <CreatePlaylist
            handleSubmitFormCreatePlaylist={handleSubmitFormCreatePlaylist}
          />
        </div>
        <div className="search-track-content">
          <Typography.Title level={2}>
            Lets find something for your playlist
          </Typography.Title>
          <SearchBar handleSearch={handleSearch} />
          <Typography.Title level={4} className="result-title">
            {tracks.length > 0 && 'Results'}
          </Typography.Title>
          <List
            className="track-list"
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 6,
            }}
            dataSource={tracks}
            loading={loading}
            renderItem={(track) => (
              <List.Item>
                <TrackCard
                  key={track.uri}
                  track={track}
                  isSelected={selectedTrackUri.includes(track.uri)}
                  onSelect={() => handleSelectTrack(track.uri)}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;