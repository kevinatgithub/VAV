import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Div } from 'core/styled';
import DocumentTitle from '../common/document-title/document-title.component';
import PageContent from '../common/page-content/page-content';
import SectionsPanel from './sections.component';
import TaktimeTable from './takt-time-table.component';
import TaktimeEntry from './takt-time-entry.container';

class Taktime extends Component {
  state = {};

  componentDidMount() {
    this.props.getSectionsRequest();
  }

  handleSelectSection = (section) => {
    this.props.getSectionTaktTimesRequest(section);
  };

  handleShowTaktimeForm = () => {
    this.props.showSideDialog(true);
  };

  handleHideTaktimeForm = () => {
    this.props.showSideDialog(false);
  };

  handleTaktTimeEdit = (id) => {
    const { sectionTaktTimes } = this.props;
    const sectionTaktTime = sectionTaktTimes.find(st => st.id === id);
    this.props.editTaktTime(sectionTaktTime);
    this.props.showSideDialog(true);
  };

  handleTaktTimeDelete = (id) => {
    const { sectionTaktTimes } = this.props;
    const sectionTaktTime = sectionTaktTimes.find(st => st.id === id);
    this.props.deleteTaktTimeRequest(sectionTaktTime);
  };

  render() {
    const { sections, sectionTaktTimes, isTaktimesLoading, selectedSection } = this.props;

    return (
      <PageContent paddingless>
        <DocumentTitle pageTitle='Taktime Configuration' />
        <Div full>
          <Row height='100%'>
            <Row.Col sm={6} md={2}>
              <SectionsPanel sections={sections} selectedSection={selectedSection} onSelectSection={this.handleSelectSection} />
            </Row.Col>
            <Row.Col sm={6} md={10} style={{ paddingTop: 30, paddingBottom: 30, paddingLeft: 22, paddingRight: 30 }}>
              {selectedSection && (
                <Fragment>
                  <TaktimeTable
                    section={selectedSection.name}
                    taktTimes={sectionTaktTimes}
                    loading={isTaktimesLoading}
                    onShowTaktimeForm={this.handleShowTaktimeForm}
                    onTaktTimeEdit={this.handleTaktTimeEdit}
                    onTaktTimeDelete={this.handleTaktTimeDelete}
                  />
                </Fragment>
              )}
            </Row.Col>
          </Row>
        </Div>
        <TaktimeEntry onClose={this.handleHideTaktimeForm} />
      </PageContent>
    );
  }
}

Taktime.propTypes = {
  sections: PropTypes.array,
  sectionTaktTimes: PropTypes.array,
  isTaktimesLoading: PropTypes.bool,
  selectedSection: PropTypes.object,

  getSectionsRequest: PropTypes.func.isRequired,
  getSectionTaktTimesRequest: PropTypes.func.isRequired,
  showSideDialog: PropTypes.func.isRequired,
  deleteTaktTimeRequest: PropTypes.func.isRequired,
  editTaktTime: PropTypes.func.isRequired,
};

const mapStateToProps = ({ sections, sectionTaktTimes }) => ({
  sections: sections.data,
  sectionTaktTimes: sectionTaktTimes.data,
  isTaktimesLoading: sectionTaktTimes.isLoading,
  selectedSection: sectionTaktTimes.section,
});

const mapActionsToProps = ({
  sections: { getSectionsRequest },
  sectionTaktTimes: { getSectionTaktTimesRequest, deleteTaktTimeRequest },
  sideDialog: { showSideDialog },
  taktTime: { editTaktTime },
}) => ({
  getSectionsRequest,
  getSectionTaktTimesRequest,
  showSideDialog,
  deleteTaktTimeRequest,
  editTaktTime,
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(Taktime);
