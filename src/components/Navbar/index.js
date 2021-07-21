import "./style.css";

const Navbar = ({ isLoggedIn }) => {
  const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
    process.env.REACT_APP_SPOTIFY_API_KEY
  )}&scope=playlist-modify-private&redirect_uri=${encodeURIComponent(
    process.env.REACT_APP_DEV_URL
  )}`;

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
