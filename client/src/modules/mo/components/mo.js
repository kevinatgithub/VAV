import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentTitle from '../../common/document-title/document-title';
import PageContent from '../../common/page-content/page-content';
import { Div, Row } from '../../ui';
import MoList from './mo-list';
import MoDetails from './mo-details';

class MO extends Component {
  static propTypes = {
    mos: PropTypes.object,
    selectedMo: PropTypes.object,
    getMosRequest: PropTypes.func.isRequired,
    getMoDetailsRequest: PropTypes.func.isRequired,
    filterByStatus: PropTypes.func.isRequired,
    searchMo: PropTypes.func.isRequired,
    unselectMachine: PropTypes.func.isRequired,
  };
  state = {
    selectedMoId: null,
    statusFilter: '',
    searchTerm: '',
  };

  componentDidMount() {
    this.props.getMosRequest({ pageNo: 1 });
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleLoadMoreMos = (pageNo) => {
    this.props.getMosRequest({ status: this.state.statusFilter, pageNo });
  };

  handleFilterByStatus = (statusFilter) => {
    this.setState({ statusFilter, selectedMoId: null }, () => {
      const { searchTerm } = this.state;
      this.props.filterByStatus({ statusFilter, searchTerm });
      this.props.unselectMachine();
    });
  };

  handleSearch = () => {
    this.setState({ selectedMoId: null }, () => {
      const { statusFilter, searchTerm } = this.state;
      this.props.searchMo({ statusFilter, searchTerm });
      this.props.unselectMachine();
    });
  };

  handleSelectMo = (mo) => {
    this.setState({ selectedMoId: mo.id }, () => {
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
  }

  render() {
    const { mos, selectedMo } = this.props;
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
                onFilterByStatus={this.handleFilterByStatus}
                onSearch={this.handleSearch}
                onSearchTermChange={this.handleSearchTermChange}
                searchTerm={this.state.searchTerm}
              />
            </Row.Col>
            <Row.Col sm={6} md={6} style={{ paddingLeft: 0, paddingRight: 0, zIndex: 7 }}>
              {selectedMo && <MoDetails mo={selectedMo} onClose={this.handleMoDetailsClose} />}
            </Row.Col>
          </Row>
        </Div>
      </PageContent>
    );
  }
}

export default MO;
