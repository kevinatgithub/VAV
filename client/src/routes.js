import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'core/utils/loadable';
import MoLoadable from './modules/mo/mo.loadable';

const AsyncDashboard = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */ './modules/dashboard/containers/dashboard-container'),
});
const AsyncSettings = Loadable({
  loader: () => import(/* webpackChunkName: "settings" */ './modules/settings/containers/settings-container'),
});
const AsyncPageNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "page-not-found" */ './modules/common/non-ideal-state/page-not-found'),
});

const Routes = () => (
  <Fragment>
    <Switch>
      <Route exact path='/' component={AsyncDashboard} />
      <Route exact path='/mo' component={MoLoadable} />
      <Route exact path='/settings' component={AsyncSettings} />
      <Route component={AsyncPageNotFound} />
    </Switch>
  </Fragment>
);

export default Routes;
