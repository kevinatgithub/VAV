import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import DocumentTitle from '../../common/document-title/document-title';
import { Card, CardBody } from '../../ui/card';
import PageContent from '../../common/page-content/page-content';

class MO extends Component {
  state = {};

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    return (
      <PageContent title='Manufacturing Orders'>
        <DocumentTitle pageTitle='Manufacturing Orders' />
        <Card>
          <CardBody>
            Under construction...
          </CardBody>
        </Card>
      </PageContent>
    );
  }
}

export default MO;
