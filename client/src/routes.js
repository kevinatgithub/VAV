import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'core/utils/loadable';
import MoLoadable from './modules/mo/mo.loadable';
import TaktimeLoadable from './modules/takt-time/takt-time.loadable';
import BoardLoadable from './modules/board/board.loadable';

const AsyncSettings = Loadable({
  loader: () => import(/* webpackChunkName: "settings" */ './modules/settings/containers/settings-container'),
});
const AsyncPageNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "page-not-found" */ './modules/common/non-ideal-state/page-not-found'),
});

const Routes = ({ store }) => (
  <Fragment>
    <Switch>
      <Route exact path='/' component={BoardLoadable(store)} />
      <Route exact path='/mo' component={MoLoadable(store)} />
      <Route exact path='/takt-time' component={TaktimeLoadable(store)} />
      <Route exact path='/settings' component={AsyncSettings} />
      <Route component={AsyncPageNotFound} />
    </Switch>
  </Fragment>
);

Routes.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Routes;
