import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'modules/common/loading-bar/loading-bar.container';
import Header from './header.component';
import Sidebar from './sidebar.component';
import ErrorAlert from './error-alert.container';

function App({ children }) {
  return (
    <Fragment>
      <Header />
      <Sidebar />
      <LoadingBar />
      { children }
      <ErrorAlert />
    </Fragment>
  );
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
