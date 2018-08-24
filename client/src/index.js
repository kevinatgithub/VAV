import 'normalize.css';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next';
import configureStore from './store/configure-store';
import Root from './root';
import rootReducer from './reducers';
import './global-styles';
import i18n from './modules/common/translation/i18n';

const store = configureStore(rootReducer);

const renderApp = (RootCmp) => {
  render(
    <I18nextProvider i18n={i18n}>
      <AppContainer>
        <RootCmp store={store} />
      </AppContainer>
    </I18nextProvider>,
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
