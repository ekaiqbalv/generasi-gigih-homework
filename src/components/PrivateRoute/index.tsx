import { ReactNode, useEffect } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { notification } from 'antd';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setUser, deleteUser } from 'redux/actions/user';
import { API_BASE_URL } from 'constants/spotify';

interface IPrivateRouteProps extends RouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children, ...props }: IPrivateRouteProps) => {
  const token = useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const { id, display_name: displayName, images } = response.data;
          dispatch(setUser({ id, displayName, images }));
        })
        .catch((error) => {
          notification.error({
            message: 'Error',
            description: `There is something wrong. ${error.response.data.error.message}!`,
          });
          if (
            error.response.data.error.message === 'The access token expired'
          ) {
            dispatch(deleteUser());
          }
        });
    }
  }, [token]);

  return (
    <Route {...props} render={() => (token ? children : <Redirect to="/" />)} />
  );
};

export default PrivateRoute;
