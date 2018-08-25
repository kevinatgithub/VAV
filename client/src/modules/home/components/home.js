import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Button } from '@blueprintjs/core';
import { MainContent } from '../../ui';

class Home extends Component {
  state = {}

  render() {
    return (
      <MainContent padding={15}>
        Home
        <Button icon='refresh' intent='danger' text='Reset' />
      </MainContent>
    );
  }
}

export default Home;
