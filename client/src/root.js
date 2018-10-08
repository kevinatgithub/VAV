import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './modules/app/app-container';
import Routes from './routes';
import theme from './theme';

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
