const AUTH_BASE_URL = 'https://accounts.spotify.com/authorize';
const API_BASE_URL = 'https://api.spotify.com/v1';
const RESPONSE_TYPE = 'token';
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_API_KEY;
const SCOPE = 'playlist-modify-private';
const REDIRECT_URI = process.env.REACT_APP_DEV_URL;

export {
  AUTH_BASE_URL,
  API_BASE_URL,
  RESPONSE_TYPE,
  CLIENT_ID,
  SCOPE,
  REDIRECT_URI,
};
