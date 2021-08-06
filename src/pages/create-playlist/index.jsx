import React, { useState, useEffect } from 'react';
import { Typography, List, notification } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from 'constants/spotify';
import Navbar from 'components/Navbar';
import SearchBar from 'components/SearchBar';
import CreatePlaylist from 'components/CreatePlaylist';
import TrackCard from 'components/TrackCard';
import './style.css';

const Page = () => {
  const token = useSelector((state) => state.user.token);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [tracks, setTracks] = useState([]);
  const [selectedTrackUri, setSelectedTrackUri] = useState([]);
  const [formCreatePlaylist, setFormCreatePlaylist] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => setUser(response.data))
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
  }, [token]);

  const handleInputCreatePlaylist = (e) => {
    const { name, value } = e.target;
    setFormCreatePlaylist({ ...formCreatePlaylist, [name]: value });
  };

  const handleSubmitFormCreatePlaylist = async (form) => {
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
            Authorization: `Bearer ${token}`,
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
              Authorization: `Bearer ${token}`,
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

  const handleSearch = (searchQuery) => {
    if (searchQuery) {
      setLoading(true);
      axios
        .get(`${API_BASE_URL}/search`, {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const handleSelectTrack = (trackUri) => {
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
            handleInputCreatePlaylist={handleInputCreatePlaylist}
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
              gutter: [16, 16],
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
                  trackName={track.name}
                  album={track.album}
                  artists={track.artists}
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
