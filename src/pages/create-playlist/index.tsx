import { useState } from 'react';
import {
  Typography,
  List,
  notification,
  FormInstance,
  Collapse,
  Badge,
} from 'antd';
import { useAppSelector } from 'redux/hooks';
import axios from 'axios';
import { API_BASE_URL } from 'constants/spotify';
import {
  Navbar,
  SearchBar,
  CreatePlaylist,
  TrackCard,
  SelectedTrackCard,
} from 'components';
import { ITrack, ITrackItem } from 'utils/model';
import './style.css';

const Page = () => {
  const user = useAppSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<ITrack>({
    items: [],
    href: '',
    limit: 12,
    next: '',
    offset: 0,
    previous: '',
    total: 0,
  });
  const [selectedTrack, setSelectedTrack] = useState<Array<ITrackItem>>([]);

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
      if (selectedTrack.length > 0) {
        await axios.post(
          `${API_BASE_URL}/playlists/${responseCreatePlaylist.data.id}/tracks`,
          {
            uris: selectedTrack.map((track) => track.uri),
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
      }
      setSelectedTrack([]);
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

  const handleSearch = (query: string, page = 1, pageSize = 12) => {
    if (query) {
      setLoading(true);
      axios
        .get(`${API_BASE_URL}/search`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          params: {
            q: query,
            type: 'track',
            limit: pageSize,
            offset: pageSize * page - pageSize,
          },
        })
        .then((response) => {
          setTracks(response.data.tracks);
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
    if (query !== searchQuery) {
      setSearchQuery(query);
    }
  };

  const handleSelectTrack = (currentSelectedTrack: ITrackItem) => {
    const selectedTrackUri = selectedTrack.map((item) => item.uri);
    if (selectedTrackUri.includes(currentSelectedTrack.uri)) {
      setSelectedTrack([
        ...selectedTrack.filter(
          (track) => track.uri !== currentSelectedTrack.uri,
        ),
      ]);
    } else {
      setSelectedTrack([...selectedTrack, currentSelectedTrack]);
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
            {tracks.total > 0 && 'Results'}
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
            dataSource={tracks.items}
            loading={loading}
            pagination={{
              current: (tracks.offset + tracks.limit) / tracks.limit,
              hideOnSinglePage: true,
              total: Math.min(996, tracks.total),
              pageSize: 12,
              showSizeChanger: false,
              onChange: (page, pageSize) => handleSearch(searchQuery, page, pageSize),
            }}
            renderItem={(track) => (
              <List.Item>
                <TrackCard
                  key={track.uri}
                  track={track}
                  isSelected={selectedTrack
                    .map((item) => item.uri)
                    .includes(track.uri)}
                  onSelect={() => handleSelectTrack(track)}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
      {selectedTrack.length > 0 && (
        <Collapse
          className="selected-track-collapse"
          expandIconPosition="right"
        >
          <Collapse.Panel
            header={(
              <Badge
                color="#4b03ab"
                count={selectedTrack.length}
                offset={[selectedTrack.length > 9 ? 16 : 10, 0]}
              >
                <div className="selected-track-collapse-title">
                  The track you have selected
                </div>
              </Badge>
            )}
            key="selected-track"
          >
            <List
              split={false}
              dataSource={selectedTrack}
              renderItem={(track) => (
                <List.Item>
                  <SelectedTrackCard
                    track={track}
                    onSelect={() => handleSelectTrack(track)}
                  />
                </List.Item>
              )}
            />
          </Collapse.Panel>
        </Collapse>
      )}
    </div>
  );
};

export default Page;
