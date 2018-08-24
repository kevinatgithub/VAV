import 'normalize.css';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configure-store';
import Root from './root';
import rootReducer from './reducers';
import './global-styles';

const store = configureStore(rootReducer);

const renderApp = (RootCmp) => {
  render(
    <AppContainer>
      <RootCmp store={store} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

if (module.hot) {
  // hot reload reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(require('./reducers').default); // eslint-disable-line global-require
  });
  module.hot.accept('./root', () => {
    renderApp(require('./root').default); // eslint-disable-line global-require
  });
}

renderApp(Root);
