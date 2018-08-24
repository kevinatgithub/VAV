import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Flex } from 'ui';
import { translate } from 'react-i18next';
import { Span, Label, Icon, PageBody } from '../../ui';
import PageHeader from '../../page-header/components/page-header';
import PageHeaderTitle from '../../page-header/components/page-header-title';
import MachineSidePanel from './machine-side-panel';
import MachineFormModal from './machine-form-dialog';
import { nullSafe } from '../../utils/object';

class Home extends Component {
  static propTypes = {
    machines: PropTypes.array,
    selectedMachine: PropTypes.object,
    getMachinesRequest: PropTypes.func.isRequired,
    addMachineRequest: PropTypes.func.isRequired,
    editMachineRequest: PropTypes.func.isRequired,
    selectMachine: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  state = {
    showMachineModal: false,
    machineDialogMode: '',
  };

  componentDidMount() {
    this.props.getMachinesRequest();
  }

  handleMachineModalCancel = () => {
    this.setState({ showMachineModal: false });
  };

  handleMachineModalSubmit = (machine) => {
    const { editMachineRequest, addMachineRequest } = this.props;
    const saveMachine = this.state.machineDialogMode === 'edit' ? editMachineRequest : addMachineRequest;
    saveMachine(machine);
  };

  handleAddMachine = () => {
    this.setState({ machineDialogMode: 'add', showMachineModal: true });
  };

  handleEditMachine = () => {
    this.setState({ machineDialogMode: 'edit', showMachineModal: true });
  };

  handleSelectMachine = (machineSerialNumber) => {
    const { selectMachine, machines } = this.props;
    const selectedMachine = machines.find(m => m.serialNumber === machineSerialNumber);
    selectMachine(selectedMachine);
  };

  renderPageTitle() {
    const { displayName, serialNumber } = nullSafe(this.props.selectedMachine);
    return (
      <PageHeaderTitle
        title={displayName}
        subTitle={
          serialNumber &&
            <Span>
              <Label>({this.props.t('pageHeader.serialNumber')}:</Label> {serialNumber})
            </Span>

        }
      />
    );
  }

  renderPageDesc() {
    return (
      <Flex fdr>
        <Flex paddingRight={30}>Name trip XYZ</Flex>
        <Flex paddingRight={30}>05/07/2018 04:08h</Flex>
        <Flex paddingRight={30}>
          <Icon name='arrow-right' large />
        </Flex>
        <Flex paddingRight={30}>05/07/2018 20:59h</Flex>
        <Flex paddingRight={30}>Destelbergen Kerk</Flex>
        <Flex paddingRight={30}>Rooien</Flex>
      </Flex>
    );
  }

  renderActionButtons() {
    return (
      <Flex paddingLeft={30}>
        <Icon
          name='left' type='primary' large marginRight={5} paddingLeft={5}
          paddingRight={5} clickable
        />
        <Icon
          name='right' type='primary' large marginLeft={5} paddingLeft={5}
          paddingRight={5} clickable
        />
      </Flex>
    );
  }

  render() {
    const { t, selectedMachine, machines } = this.props;
    const { machineDialogMode, showMachineModal } = this.state;

    return [
      <PageHeader key={0} title={this.renderPageTitle()} />,
      <PageBody key='pageContent'>
        <Row gutter={25}>
          <Col lg={8} md={12} sm={24}>
            <MachineSidePanel
              machines={machines}
              selectedMachine={selectedMachine}
              onSelectMachine={this.handleSelectMachine}
              onAddMachine={this.handleAddMachine}
              onEditMachine={this.handleEditMachine}
              t={t}
            />
          </Col>
          <Col md={8} sm={24}>
            <p>Date locale: {t('date', { value: new Date() })}</p>
            <p>Number locale: {t('number', { value: 111.5 })}</p>
            <p>Translation: {t('test.language')}</p>
          </Col>
        </Row>
        <MachineFormModal
          key={2}
          machine={selectedMachine}
          visible={showMachineModal}
          mode={machineDialogMode}
          t={t}
          onSubmit={this.handleMachineModalSubmit}
          onCancel={this.handleMachineModalCancel}
        />
      </PageBody>,
    ];
  }
}

export default translate('translations')(Home);
