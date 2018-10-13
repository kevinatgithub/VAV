import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NonIdealState } from '@blueprintjs/core';
import { Div, Row, CenterBody, Flex } from 'core/styled';
import DocumentTitle from 'modules/common/document-title/document-title.component';
import PageContent from 'modules/common/page-content/page-content';
import MoList from './mo-list/mo-list.component';
import MoDetails from './mo-details/mo-details.component';
import MoProcessing from './mo-processing.component';
import MoReprint from './mo-reprint.component';

class MO extends Component {
  componentDidMount() {
    this.props.getMosRequest(1);
  }

  handleLoadMoreMos = (pageNo) => {
    this.props.getMosRequest(pageNo);
  };

  handleFilterByStatus = (statusFilter) => {
    this.props.filterByStatus(statusFilter);
    this.props.unselectMo();
  };

  handleSearch = (searchTerm) => {
    this.props.searchMo(searchTerm);
    this.props.unselectMo();
  };

  handleShowReleaseToProdPane = () => {
    this.props.setPreparingToProcess(true);
  };

  handleHideReleaseToProdPane = () => {
    this.props.setPreparingToProcess(false);
  };

  handleProcessingMo = ({ specialProject, selectedChassisNumbers }) => {
    const body = { id: this.props.selectedMo.id, specialProject, chassisNumbers: selectedChassisNumbers };
    this.props.processMoRequest(body);
  };

  handleShowReprintDialog = () => {
    this.props.showSideDialog(true);
  };

  handleCloseReprintDialog = () => {
    this.props.showSideDialog(false);
  };

  handleReprint = ({ selectedChassisNumbers }) => {
    console.log(selectedChassisNumbers); // eslint-disable-line
  };

  render() {
    const { mos, selectedMo, selectedMoId, preparingToProcess, isProcessing, unselectMo, getMoDetailsRequest } = this.props;
    const rowStyle = { paddingLeft: 0, paddingRight: 0, zIndex: 0 };

    return (
      <PageContent paddingLess>
        <DocumentTitle pageTitle='Manufacturing Orders' />
        <Div full>
          <Row height='100%' style={{ marginLeft: 0, marginRight: 0 }}>
            <Row.Col sm={6} md={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <MoList
                mos={mos}
                selectedMoId={selectedMoId}
                onLoadMore={this.handleLoadMoreMos}
                onSelectMo={getMoDetailsRequest}
                onFilterByStatus={this.handleFilterByStatus}
                onSearch={this.handleSearch}
                onShowReleaseToProdPane={this.handleShowReleaseToProdPane}
              />
            </Row.Col>
            {selectedMo && (
              <Row.Col sm={6} md={5} style={rowStyle}>
                <MoDetails
                  mo={selectedMo}
                  onClose={unselectMo}
                  onShowReleaseToProdPane={this.handleShowReleaseToProdPane}
                  onShowReprintDialog={this.handleShowReprintDialog}
                  releaseToProd={preparingToProcess}
                />
              </Row.Col>
            )}
            {preparingToProcess &&
              selectedMo && (
              <Row.Col sm={12} md={4} style={rowStyle}>
                <MoProcessing
                  mo={selectedMo}
                  processing={isProcessing}
                  onClose={this.handleHideReleaseToProdPane}
                  onProcess={this.handleProcessingMo}
                />
              </Row.Col>
            )}
            {!selectedMo &&
              (mos && mos.result.length > 0) && (
              <Row.Col sm={12} md={9} style={rowStyle}>
                <CenterBody>
                  <Flex fdr jcc>
                    <NonIdealState
                      icon='info-sign'
                      title='Hey, there!'
                      description={'You can select an MO on the list to view details and start isProcessing.'}
                    />
                  </Flex>
                </CenterBody>
              </Row.Col>
            )}
          </Row>
        </Div>
        {selectedMo && (
          <MoReprint chassis={selectedMo.chassis} onReprint={this.handleReprint} onClose={this.handleCloseReprintDialog} />
        )}
      </PageContent>
    );
  }
}

MO.propTypes = {
  mos: PropTypes.object,
  selectedMo: PropTypes.object,
  selectedMoId: PropTypes.string,
  preparingToProcess: PropTypes.bool,
  isProcessing: PropTypes.bool,

  getMosRequest: PropTypes.func.isRequired,
  getMoDetailsRequest: PropTypes.func.isRequired,
  filterByStatus: PropTypes.func.isRequired,
  searchMo: PropTypes.func.isRequired,
  unselectMo: PropTypes.func.isRequired,
  setPreparingToProcess: PropTypes.func.isRequired,
  processMoRequest: PropTypes.func.isRequired,
  showSideDialog: PropTypes.func.isRequired,
};

const mapStateToProps = ({ mos, selectedMo }) => ({
  mos: mos.data,
  selectedMo: selectedMo.data,
  selectedMoId: selectedMo.id,
  preparingToProcess: selectedMo.preparingToProcess,
  isProcessing: selectedMo.isProcessing,
});

const mapDispatchToProps = ({
  mos: { getMosRequest, filterByStatus, searchMo },
  selectedMo: { getMoDetailsRequest, unselectMo, setPreparingToProcess, processMoRequest },
  sideDialog: { showSideDialog },
}) => ({
  getMosRequest,
  getMoDetailsRequest,
  filterByStatus,
  searchMo,
  unselectMo,
  setPreparingToProcess,
  processMoRequest,
  showSideDialog,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MO);
