import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@blueprintjs/core';
import { Div } from 'core/styled';
import DocumentTitle from '../../common/document-title/document-title.component';
import BodyTypes from './body-types';
import PageContent from '../../common/page-content/page-content';
import settingsStyle from './settings-style';

const { TabsWrapper } = settingsStyle;

class Settings extends Component {
  static propTypes = {
    bodyTypes: PropTypes.array,
    getBodyTypesRequest: PropTypes.func.isRequired,
  };
  state = { selectedTabId: 'bodyTypes' };

  componentDidMount() {
    this.props.getBodyTypesRequest();
  }

  handleTabChange = (selectedTabId) => {
    this.setState({ selectedTabId });
  };

  render() {
    return (
      <PageContent title='Settings'>
        <DocumentTitle pageTitle='Settings' />
        <TabsWrapper>
          <Tabs id='TabsExample' onChange={this.handleTabChange} selectedTabId={this.state.selectedTabId}>
            <Tab id='bodyTypes' title='Body Types' panel={<BodyTypes {...this.props} />} />
            <Tab id='models' title='Models' panel={<Div>A</Div>} />
            <Tab id='modelSeries' title='Model Series' panel={<Div>A</Div>} />
            <Tabs.Expander />
          </Tabs>
        </TabsWrapper>
      </PageContent>
    );
  }
}

export default Settings;
