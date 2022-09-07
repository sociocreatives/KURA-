import { useState } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import authService from 'renderer/api/auth-service';

export type ProtectedRouteProps = {
  component: any;
} & RouteProps;

const ProtectedRoute = ({
  component: Component,
  ...restOfProps
}: ProtectedRouteProps) => {
  const [token, _setToken] = useState(authService.getToken());
  const [user, _setUser] = useState(authService.getStoredUser());
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        user && token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
