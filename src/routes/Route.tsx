import React from 'react';
import {
  RouteProps as ReactDOMProps,
  Route as ReactDOMRoute,
  Redirect,
} from 'react-router-dom';

import { getToken } from '../utils/auth';

interface RouteProps extends ReactDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        const matchPrivacy = isPrivate === !!getToken();

        if (matchPrivacy) {
          return <Component />;
        }

        return (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : 'dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
