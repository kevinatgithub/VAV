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

  handleSelectMo = (mo) => {
    this.props.getMoDetailsRequest(mo);
  };

  handleMoDetailsClose = () => {
    this.props.unselectMo();
  };

  handleShowReleaseToProdPane = () => {
    this.props.setPreparingToProcess(true);
  };

  handleHideReleaseToProdPane = () => {
    this.props.setPreparingToProcess(false);
  };

  render() {
    const { mos, selectedMo, selectedMoId, preparingToProcess } = this.props;
    const rowStyle = { paddingLeft: 0, paddingRight: 0, zIndex: 7 };

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
                onSelectMo={this.handleSelectMo}
                onFilterByStatus={this.handleFilterByStatus}
                onSearch={this.handleSearch}
                onShowReleaseToProdPane={this.handleShowReleaseToProdPane}
              />
            </Row.Col>
            {selectedMo && (
              <Row.Col sm={6} md={5} style={rowStyle}>
                <MoDetails
                  mo={selectedMo}
                  onClose={this.handleMoDetailsClose}
                  onShowReleaseToProdPane={this.handleShowReleaseToProdPane}
                  releaseToProd={preparingToProcess}
                />
              </Row.Col>
            )}
            {preparingToProcess &&
              selectedMo && (
              <Row.Col sm={12} md={4} style={rowStyle}>
                <MoProcessing mo={selectedMo} onClose={this.handleHideReleaseToProdPane} />
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
                      description={'You can select an MO on the list to view details and start processing.'}
                    />
                  </Flex>
                </CenterBody>
              </Row.Col>
            )}
          </Row>
        </Div>
      </PageContent>
    );
  }
}

MO.propTypes = {
  mos: PropTypes.object,
  selectedMo: PropTypes.object,
  selectedMoId: PropTypes.string,
  preparingToProcess: PropTypes.bool,

  getMosRequest: PropTypes.func.isRequired,
  getMoDetailsRequest: PropTypes.func.isRequired,
  filterByStatus: PropTypes.func.isRequired,
  searchMo: PropTypes.func.isRequired,
  unselectMo: PropTypes.func.isRequired,
  setPreparingToProcess: PropTypes.func.isRequired,
};

const mapStateToProps = ({ mos, selectedMo }) => ({
  mos: mos.data,
  selectedMo: selectedMo.data,
  selectedMoId: selectedMo.id,
  preparingToProcess: selectedMo.preparingToProcess,
});

const mapDispatchToProps = ({
  mos: { getMosRequest, filterByStatus, searchMo },
  selectedMo: { getMoDetailsRequest, unselectMo, setPreparingToProcess },
}) => ({
  getMosRequest,
  getMoDetailsRequest,
  filterByStatus,
  searchMo,
  unselectMo,
  setPreparingToProcess,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MO);
