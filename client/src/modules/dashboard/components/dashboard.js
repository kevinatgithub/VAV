import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Button, Switch } from '@blueprintjs/core';
import { Helmet } from 'react-helmet';
import { MainContent } from '../../ui';

class Dashboard extends Component {
  state = {}

  render() {
    return (
      <MainContent>
        <Helmet><title>Hino - Dashboard</title></Helmet>
        Dashboard
        <Button icon='refresh' intent='danger' text='Reset' />
        <Switch label='Fullscreen' defaultChecked={true} />
      </MainContent>
    );
  }
}

export default Dashboard;
