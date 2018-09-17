import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'utils/loadable';
import WithLogin from './modules/login/containers/login.container';

const AsyncHeader = Loadable({
  loader: () => import(/* webpackChunkName: "header" */ './modules/header/containers/header-container'),
});
const AsyncSidebar = Loadable({
  loader: () => import(/* webpackChunkName: "sidebar" */ './modules/sidebar/containers/sidebar-container'),
});
const AsyncLoadingBar = Loadable({
  loader: () =>
    import(/* webpackChunkName: "loading-bar" */ './modules/common/loading-bar/containers/loading-bar-container'),
});
const AsyncDashboard = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */ './modules/dashboard/containers/dashboard-container'),
});
const AsyncSettings = Loadable({
  loader: () => import(/* webpackChunkName: "settings" */ './modules/settings/containers/settings-container'),
});
const AsyncMO = Loadable({
  loader: () => import(/* webpackChunkName: "mo" */ './modules/mo/containers/mo-container'),
});
const AsyncPageNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "page-not-found" */ './modules/common/non-ideal-state/page-not-found'),
});

const MasterRoute = ({ isPrivate, component: Component, ...rest }) => {
  const AuthComponent = isPrivate ? WithLogin(Component) : Component;
  return (
    <Route
      {...rest}
      render={props =>
        <Fragment>
          <AsyncHeader />
          <AsyncSidebar />
          <AsyncLoadingBar />
          <AuthComponent {...props} />
        </Fragment>
      }
    />
  );
};

const Routes = () =>
  <Fragment>
    <Switch>
      <MasterRoute exact path='/' component={AsyncDashboard} />
      <MasterRoute exact path='/mo' component={AsyncMO} />
      <MasterRoute exact path='/settings' component={AsyncSettings} />
      <MasterRoute component={AsyncPageNotFound} />
    </Switch>
  </Fragment>;
export default Routes;
