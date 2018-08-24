import React from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import Loadable from 'utils/loadable';
import PropTypes from 'prop-types';
import WithLogin from './modules/login/containers/login.container';

const AsyncHome = Loadable({
  loader: () => import(/* webpackChunkName: "home" */ './modules/home/containers/home-container'),
});
const AsyncContact = Loadable({
  loader: () => import(/* webpackChunkName: "contact" */ './modules/contact/containers/contact-container'),
});
const AsyncRegister = Loadable({
  loader: () => import(/* webpackChunkName: "register" */ './modules/register/containers/register-container'),
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
  <Layout.Content>
    <Route path='/' component={AsyncHeader} />
    <PrivateRoute exact={true} path='/' component={AsyncHome} />
    <Route path='/register' component={AsyncRegister} />
    <Route path='/contact' component={AsyncContact} />
    <Route path='/contact' component={AsyncContact} />
  </Layout.Content>;
export default Routes;
