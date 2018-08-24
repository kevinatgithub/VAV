import React from 'react';
import { Route } from 'react-router-dom';
import Loadable from 'utils/loadable';
import PropTypes from 'prop-types';
import WithLogin from './modules/login/containers/login.container';
import { Div } from './modules/ui';

const AsyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ './modules/home/containers/home-container'),
});
const AsyncContact = Loadable({
  loader: () => import(/* webpackChunkName: "contact" */ './modules/contact/containers/contact-container'),
});
const AsyncHeader = Loadable({
  loader: () => import(/* webpackChunkName: "header" */ './modules/header/containers/header-container'),
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
    <PrivateRoute exact={true} path='/' component={AsyncHome} />
    <Route path='/contact' component={AsyncContact} />
  </Div>;
export default Routes;
