import { Redirect, Route, RouteProps } from 'react-router-dom';

import { ReactChild, ReactChildren, useState } from 'react';
import authService from 'renderer/api/auth-service';


interface PropsType {
  children: ReactChild | ReactChildren;
}


export type AuthLayoutRouteProps = {
  component: any;
} & RouteProps;
const AuthLayout = ({ children }: PropsType) => {
    return (<div>
      {children}
    </div>)
  };

  const AuthLayoutRoute = ({component: Component, ...rest} : AuthLayoutRouteProps) => {

  const [token, _setToken] = useState(authService.getToken());
  const [user, _setUser] = useState(authService.getStoredUser());
    return (
      <>
      {
        token&&user ? <Redirect to="/capture-readings" /> : (<Route {...rest} render={matchProps => (
          <AuthLayout>
              <Component {...matchProps} />
          </AuthLayout>
        )} />)
      }
      </>
    )
  };

export default AuthLayoutRoute;
