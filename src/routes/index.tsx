import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Route from './Route';

import Home from '../pages/Home';
import { ROUTES } from '../config/constants';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path={ROUTES.HOME} component={Home} />
    <Route exact path={ROUTES.DASHBOARD} component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
