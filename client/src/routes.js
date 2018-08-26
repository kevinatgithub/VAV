import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'utils/loadable';
import PropTypes from 'prop-types';
import WithLogin from './modules/login/containers/login.container';
import { Div } from './modules/ui';

const AsyncDashboard = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */ './modules/dashboard/containers/dashboard-container'),
});
const AsyncSettings = Loadable({
  loader: () => import(/* webpackChunkName: "settings" */ './modules/settings/containers/settings-container'),
});
const AsyncHeader = Loadable({
  loader: () => import(/* webpackChunkName: "header" */ './modules/header/containers/header-container'),
});
const AsyncSidebar = Loadable({
  loader: () => import(/* webpackChunkName: "sidebar" */ './modules/sidebar/containers/sidebar-container'),
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  const PrivateComponent = WithLogin(Component);
  return <Route {...rest} render={props => <PrivateComponent {...props} />} />;
};

PrivateRoute.propTypes = {
  location: PropTypes.string,
  component: PropTypes.func.isRequired,
};

const Routes = () =>
  <Div>
    <Route path='/' component={AsyncHeader} />
    <Route path='/' component={AsyncSidebar} />
    <PrivateRoute exact={true} path='/' component={AsyncDashboard} />
    <PrivateRoute path='/settings' component={AsyncSettings} />
  </Div>;
export default Routes;
