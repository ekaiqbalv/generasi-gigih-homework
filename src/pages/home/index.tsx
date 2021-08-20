import { useEffect } from 'react';
import { Typography } from 'antd';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import { setToken } from 'redux/actions/user';
import {
  AUTH_BASE_URL,
  RESPONSE_TYPE,
  CLIENT_ID,
  SCOPE,
  REDIRECT_URI,
} from 'constants/spotify';
import './style.css';

interface IParams {
  // eslint-disable-next-line camelcase
  access_token?: string;
}

const Page = () => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const SPOTIFY_AUTH_URL = `${AUTH_BASE_URL}?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&scope=${SCOPE}&redirect_uri=${REDIRECT_URI}`;

  useEffect(() => {
    if (window.location.hash) {
      const params: IParams = queryString.parse(window.location.hash);
      window.location.hash = '';
      dispatch(setToken(params.access_token));
    }
  }, [dispatch]);

  return (
    <div className="page-container">
      {token ? (
        <Redirect to="/create-playlist" />
      ) : (
        <div className="home-container">
          <Typography.Title level={1}>
            Create your own playlist!
          </Typography.Title>
          <Typography.Title level={4}>
            Find and create based on your taste in music
          </Typography.Title>
          <a className="login-button" href={SPOTIFY_AUTH_URL}>
            Login
          </a>
        </div>
      )}
    </div>
  );
};

export default Page;
