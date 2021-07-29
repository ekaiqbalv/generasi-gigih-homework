import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "constants/spotify";
import Navbar from "components/Navbar";
import SearchBar from "components/SearchBar";
import CreatePlaylist from "components/CreatePlaylist";
import TrackCard from "components/TrackCard";
import "./style.css";

const Page = () => {
  const token = useSelector((state) => state.user.token);
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [selectedTrackUri, setSelectedTrackUri] = useState([]);
  const [formCreatePlaylist, setFormCreatePlaylist] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => setUser(response.data))
        .catch((error) => {
          if (error.response.status === 400 || error.response.status === 401) {
            alert(
              "There is something wrong, make sure you have been logged in!"
            );
          }
        });
    }
  }, [token]);

  const handleInputCreatePlaylist = (e) => {
    const { name, value } = e.target;
    setFormCreatePlaylist({ ...formCreatePlaylist, [name]: value });
  };

  const handleSubmitFormCreatePlaylist = async (e) => {
    e.preventDefault();
    try {
      const responseCreatePlaylist = await axios.post(
        `${API_BASE_URL}/users/${user.id}/playlists`,
        {
          name: formCreatePlaylist.title,
          public: false,
          description: formCreatePlaylist.description,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (selectedTrackUri.length > 0) {
        await axios.post(
          `${API_BASE_URL}/playlists/${responseCreatePlaylist.data.id}/tracks`,
          {
            uris: selectedTrackUri,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      }
      setSelectedTrackUri([]);
      alert("You have successfully created a new playlist!");
      e.target.reset();
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        alert("There is something wrong, make sure you have been logged in!");
      }
    }
  };

  const handleInputSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      axios
        .get(`${API_BASE_URL}/search`, {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            q: searchQuery,
            type: "track",
            limit: 12,
          },
        })
        .then((response) => setTracks(response.data.tracks.items))
        .catch((error) => {
          if (error.response.status === 400 || error.response.status === 401) {
            alert(
              "There is something wrong, make sure you have been logged in!"
            );
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
      <Navbar isLoggedIn={token ? true : false} />
      <div className="split-content">
        <div className="split-content-child-1">
          <CreatePlaylist
            handleInputCreatePlaylist={handleInputCreatePlaylist}
            handleSubmitFormCreatePlaylist={handleSubmitFormCreatePlaylist}
          />
        </div>
        <div className="split-content-child-2">
          <h1 className="section-title">
            Let's find something for your playlist
          </h1>
          <SearchBar
            handleInputSearch={handleInputSearch}
            handleSearch={handleSearch}
          />
          <h2 className="sub-section-title">
            {tracks.length > 0 && "Results"}
          </h2>
          <div className="playlist-container">
            {tracks.length > 0 &&
              tracks.map((track) => (
                <TrackCard
                  key={track.uri}
                  trackName={track.name}
                  album={track.album}
                  artists={track.artists}
                  isSelected={selectedTrackUri.includes(track.uri)}
                  onSelect={() => handleSelectTrack(track.uri)}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
