import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './modules/app/components/app';
import Header from './modules/header/components/header';
import LoadingBar from './modules/common/loading-bar/containers/loading-bar-container';
import Sidebar from './modules/sidebar/components/sidebar';
import Routes from './routes';
import theme from './theme';

const Root = ({ store }) =>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App>
          <Header />
          <LoadingBar />
          <Sidebar />
          <Routes />
        </App>
      </Router>
    </ThemeProvider>
  </Provider>;

Root.propTypes = {
  store: PropTypes.object,
};

export default Root;
