import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Switch, Dialog, Classes, H5 } from '@blueprintjs/core';
import { Helmet } from 'react-helmet';
import { MainContent, Div, Button } from '../../ui';

class Dashboard extends Component {
  state = {
    dialogOpen: false,
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  }

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  }

  render() {
    return (
      <MainContent>
        <Helmet><title>Hino - Dashboard</title></Helmet>
        <Button onClick={this.handleDialogOpen} icon='refresh' intent='danger'>
          Open Dialog
        </Button>
        <Switch label='Fullscreen' defaultChecked={true} />
        <Dialog
          icon='info-sign'
          canEscapeKeyClose
          canOutsideClickClose
          enforceFocus
          isOpen={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          title='Sample Dialog'
        >
          <Div className={Classes.DIALOG_BODY}>
            <H5>Dashboard</H5>
          </Div>
        </Dialog>
      </MainContent>
    );
  }
}

export default Dashboard;
