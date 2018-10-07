import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NonIdealState } from '@blueprintjs/core';
import DocumentTitle from '../../common/document-title/document-title';
import PageContent from '../../common/page-content/page-content';
import { Div, Row, CenterBody, Flex } from '../../ui';
import MoList from './mo-list';
import MoDetails from './mo-details';
import MoProcessing from './mo-processing';

class MO extends Component {
  static propTypes = {
    mos: PropTypes.object,
    selectedMo: PropTypes.object,
    getMosRequest: PropTypes.func.isRequired,
    getMoDetailsRequest: PropTypes.func.isRequired,
    filterByStatus: PropTypes.func.isRequired,
    searchMo: PropTypes.func.isRequired,
    unselectMachine: PropTypes.func.isRequired,
    resetMo: PropTypes.func.isRequired,
  };
  state = {
    selectedMoId: null,
    statusFilter: '',
    searchTerm: '',
    showReleaseToProdPane: false,
  };

  componentDidMount() {
    this.props.getMosRequest({ pageNo: 1 });
  }

  componentWillUnmount() {
    this.props.resetMo();
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleLoadMoreMos = (pageNo) => {
    this.props.getMosRequest({ statusFilter: this.state.statusFilter, pageNo });
  };

  handleFilterByStatus = (statusFilter) => {
    this.setState({ statusFilter, selectedMoId: null, showReleaseToProdPane: false }, () => {
      const { searchTerm } = this.state;
      this.props.filterByStatus({ statusFilter, searchTerm });
      this.props.unselectMachine();
    });
  };

  handleSearch = () => {
    this.setState({ selectedMoId: null, showReleaseToProdPane: false }, () => {
      const { statusFilter, searchTerm } = this.state;
      this.props.searchMo({ statusFilter, searchTerm });
      this.props.unselectMachine();
    });
  };

  handleSelectMo = (mo) => {
    this.setState({ selectedMoId: mo.id, showReleaseToProdPane: false }, () => {
      this.props.getMoDetailsRequest(mo.id);
    });
  };

  handleMoDetailsClose = () => {
    this.setState({ selectedMoId: null }, () => {
      this.props.unselectMachine();
    });
  };

  handleSearchTermChange = (searchTerm) => {
    this.setState({ searchTerm });
  };

  handleShowReleaseToProdPane = () => {
    this.setState({ showReleaseToProdPane: true });
  };

  handleHidwReleaseToProdPane = () => {
    this.setState({ showReleaseToProdPane: false });
  };

  render() {
    const { mos, selectedMo } = this.props;
    const { showReleaseToProdPane, searchTerm } = this.state;
    const rowStyle = { paddingLeft: 0, paddingRight: 0, zIndex: 7 };

    return (
      <PageContent paddingLess>
        <DocumentTitle pageTitle='Manufacturing Orders' />
        <Div full>
          <Row height='100%' style={{ marginLeft: 0, marginRight: 0 }}>
            <Row.Col sm={6} md={3} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <MoList
                mos={mos}
                onLoadMore={this.handleLoadMoreMos}
                onSelectMo={this.handleSelectMo}
                selectedMoId={this.state.selectedMoId}
                searchTerm={searchTerm}
                onFilterByStatus={this.handleFilterByStatus}
                onSearch={this.handleSearch}
                onSearchTermChange={this.handleSearchTermChange}
                onShowReleaseToProdPane={this.handleShowReleaseToProdPane}
              />
            </Row.Col>
            {selectedMo &&
              <Row.Col sm={6} md={5} style={rowStyle}>
                <MoDetails
                  mo={selectedMo}
                  onClose={this.handleMoDetailsClose}
                  onShowReleaseToProdPane={this.handleShowReleaseToProdPane}
                  releaseToProd={showReleaseToProdPane}
                />
              </Row.Col>
            }
            {showReleaseToProdPane &&
              selectedMo &&
                <Row.Col sm={12} md={4} style={rowStyle}>
                  <MoProcessing mo={selectedMo} onClose={this.handleHidwReleaseToProdPane} />
                </Row.Col>
            }
            {!selectedMo &&
              (mos && mos.result.length > 0) &&
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
            }
          </Row>
        </Div>
      </PageContent>
    );
  }
}

export default MO;
