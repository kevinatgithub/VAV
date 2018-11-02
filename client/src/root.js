import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from 'core/theme';
import App from 'modules/app/app.component';
import Routes from 'routes';

const Root = ({ store, hot }) =>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App>
          <Routes key={hot && Math.random()} />
        </App>
      </Router>
    </ThemeProvider>
  </Provider>;

Root.propTypes = {
  store: PropTypes.object,
  hot: PropTypes.bool,
};

export default Root;
