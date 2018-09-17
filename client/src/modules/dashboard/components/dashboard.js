import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Switch, Classes, H5 } from '@blueprintjs/core';
import { MainContent, Div, Button } from '../../ui';
import DocumentTitle from '../../common/document-title/document-title';
import SideDialog from '../../common/side-dialog/containers/side-dialog-container';

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
        <DocumentTitle pageTitle='Board' />
        <Button onClick={this.handleDialogOpen} icon='refresh' intent='danger'>
          Open Dialog
        </Button>
        <Switch label='Fullscreen' defaultChecked={true} />
        <SideDialog
          icon='info-sign'
          isOpen={this.state.dialogOpen}
          onClose={this.handleDialogClose}
          title='Sample Dialog'
        >
          <Div className={Classes.DIALOG_BODY}>
            <H5>Dashboard</H5>
          </Div>
        </SideDialog>
      </MainContent>
    );
  }
}

export default Dashboard;
