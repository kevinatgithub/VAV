import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Switch } from '@blueprintjs/core';
import { MainContent, Div } from '../../ui';
import DocumentTitle from '../../common/document-title/document-title';

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <MainContent>
        <DocumentTitle pageTitle='Board' />
        <Div>Under construction...</Div>
        <Switch label='Fullscreen' defaultChecked={true} />
      </MainContent>
    );
  }
}

export default Dashboard;
