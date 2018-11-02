import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PageNotFound from './modules/common/non-ideal-state/page-not-found.component';
import MoLoadable from './modules/mo/mo.loadable';
import TaktimeLoadable from './modules/takt-time/takt-time.loadable';
import BoardLoadable from './modules/board/board.loadable';
import { store } from './';
import NoNetwork from './modules/common/non-ideal-state/no-network.component';

function RouteWithHook(props) {
  if (!navigator.onLine) {
    return (
      <Redirect
        to={{
          pathname: '/no-network',
          state: { from: props.location },
        }}
      />
    );
  }
  return <Route {...props} />;
}

const Routes = () => (
  <Fragment>
    <Switch>
      <RouteWithHook exact path='/' component={BoardLoadable(store)} />
      <RouteWithHook exact path='/mo' component={MoLoadable(store)} />
      <RouteWithHook exact path='/takt-time' component={TaktimeLoadable(store)} />
      <Route path='/no-network' component={NoNetwork} />
      <Route component={PageNotFound} />
    </Switch>
  </Fragment>
);

export default Routes;
