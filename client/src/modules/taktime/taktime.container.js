import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Div, Flex } from 'core/styled';
import { H2 } from '@blueprintjs/core';
import DocumentTitle from '../common/document-title/document-title.component';
import PageContent from '../common/page-content/page-content';
import SectionsPanel from './sections.component';
import TaktimeTable from './taktime-table.component';

class Taktime extends Component {
  state = {};

  componentDidMount() {
    this.props.getSectionsRequest();
  }

  handleSelectSection = (section) => {
    this.props.getSectionTaktimesRequest(section);
  };

  handleShowTaktimeForm = () => {
    console.log(object); // eslint-disable-line
  };

  handleTaktimeEdit = (value) => {
    console.log(value); // eslint-disable-line
  };

  handleTaktimeDelete = (value) => {
    console.log(value); // eslint-disable-line
  };

  render() {
    const { sections, sectionTaktimes, selectedSection } = this.props;

    return (
      <PageContent paddingless>
        <DocumentTitle pageTitle='Taktime Configuration' />
        <Div full>
          <Row height='100%'>
            <Row.Col sm={6} md={2}>
              <SectionsPanel sections={sections} selectedSection={selectedSection} onSelectSection={this.handleSelectSection} />
            </Row.Col>
            <Row.Col sm={6} md={10} style={{ paddingTop: 15, paddingBottom: 15, paddingLeft: 25, paddingRight: 25 }}>
              {selectedSection && (
                <Fragment>
                  <Flex paddingBottom={2}>
                    <H2>{selectedSection && selectedSection.name}</H2>
                  </Flex>
                  <TaktimeTable
                    taktimes={sectionTaktimes}
                    onShowTaktimeForm={this.handleShowTaktimeForm}
                    onTaktimeEdit={this.handleTaktimeEdit}
                    onTaktimeDelete={this.handleTaktimeDelete}
                  />
                </Fragment>
              )}
            </Row.Col>
          </Row>
        </Div>
      </PageContent>
    );
  }
}

Taktime.propTypes = {
  sections: PropTypes.array,
  sectionTaktimes: PropTypes.array,
  selectedSection: PropTypes.object,
  getSectionsRequest: PropTypes.func.isRequired,
  getSectionTaktimesRequest: PropTypes.func.isRequired,
};

const mapStateToProps = ({ sections, sectionTaktimes }) => ({
  sections: sections.data,
  sectionTaktimes: sectionTaktimes.data,
  selectedSection: sectionTaktimes.section,
});

const mapActionsToProps = ({ sections: { getSectionsRequest }, sectionTaktimes: { getSectionTaktimesRequest } }) => ({
  getSectionsRequest,
  getSectionTaktimesRequest,
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Taktime);
