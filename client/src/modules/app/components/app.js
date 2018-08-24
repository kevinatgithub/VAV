import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Routes from '../../../routes';
import theme from '../../../theme';
// import LoadingIndicator from '../../common/loading-indicator/components/loading-indicator';

class App extends Component {
  state = {}

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    );
  }
}

export default App;
