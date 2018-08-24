import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { ThemeProvider } from 'styled-components';
import Routes from '../../../routes';
import theme from '../../../theme';
import LoadingIndicator from '../../common/loading-indicator/components/loading-indicator';

class App extends Component {
  componentDidMount() {
    const { configLoading, configLoaded, getConfigDataRequest } = this.props;

    if (!configLoading && !configLoaded) {
      getConfigDataRequest();
    }
  }

  render() {
    const { configLoaded } = this.props;

    return (
      <ThemeProvider theme={theme}>
        {!configLoaded ?
          <LoadingIndicator />
          :
          <Layout>
            <Routes />
          </Layout>
        }
      </ThemeProvider>
    );
  }
}

App.propTypes = {
  configLoading: PropTypes.bool.isRequired,
  configLoaded: PropTypes.bool.isRequired,
  getConfigDataRequest: PropTypes.func.isRequired,
};

export default App;
