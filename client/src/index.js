import 'normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import 'react-flexbox-grid/dist/react-flexbox-grid.css';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './configure-store';
import Root from './root';
import rootReducer from './reducers';
import './global-styles';

const store = configureStore(rootReducer);

const renderApp = (RootCmp) => {
  render(
    <AppContainer>
      <RootCmp store={store} hot={!!module.hot} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default); // eslint-disable-line global-require
  });
  module.hot.accept('./root', () => {
    renderApp(require('./root').default); // eslint-disable-line global-require
  });
}

renderApp(Root);
