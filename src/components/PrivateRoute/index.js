import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, ...props }) => {
  const token = useSelector((state) => state.user.token);

  return (
    <Route {...props} render={() => (token ? children : <Redirect to="/" />)} />
  );
};

export default PrivateRoute;
