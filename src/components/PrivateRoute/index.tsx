import { ReactNode, useEffect } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { notification } from 'antd';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { setUser } from 'redux/actions/user';
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

  return (
    <Route {...props} render={() => (token ? children : <Redirect to="/" />)} />
  );
};

export default PrivateRoute;
