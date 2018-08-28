import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'utils/loadable';
import PropTypes from 'prop-types';
import WithLogin from './modules/login/containers/login.container';

const AsyncDashboard = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */ './modules/dashboard/containers/dashboard-container'),
});
const AsyncSettings = Loadable({
  loader: () => import(/* webpackChunkName: "settings" */ './modules/settings/containers/settings-container'),
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
  <Fragment>
    <PrivateRoute exact={true} path='/' component={AsyncDashboard} />
    <PrivateRoute path='/settings' component={AsyncSettings} />
  </Fragment>;
export default Routes;
