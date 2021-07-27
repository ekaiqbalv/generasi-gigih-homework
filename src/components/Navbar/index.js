import {
  AUTH_BASE_URL,
  RESPONSE_TYPE,
  CLIENT_ID,
  SCOPE,
  REDIRECT_URI,
} from "constants/spotify";
import "./style.css";

const Navbar = ({ isLoggedIn }) => {
  const SPOTIFY_AUTH_URL = `${AUTH_BASE_URL}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`;

  return (
    <div className="navbar-container">
      {isLoggedIn ? (
        <a href="/">Logout</a>
      ) : (
        <a href={SPOTIFY_AUTH_URL}>Login</a>
      )}
    </div>
  );
};

export default Navbar;
