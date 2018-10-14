import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Position, Tooltip, Intent } from '@blueprintjs/core';
import { Flex, Button, Card, CardBody } from 'core/styled';
import Table from '../../common/table/table.component';
import SideDialog from '../../common/side-dialog/side-dialog.container';
import BodyTypeForm from './body-type-form';
import PopoverConfirmDelete from '../../common/popover-confirm-delete/popover-confirm-delete';

class BodyTypes extends Component {
  static propTypes = {
    bodyTypes: PropTypes.array,
    isSavingBodyType: PropTypes.bool.isRequired,
    saveBodyTypeRequest: PropTypes.func.isRequired,
    deleteBodyTypeRequest: PropTypes.func.isRequired,
    showSideDialog: PropTypes.func.isRequired,
    selectBodyType: PropTypes.func.isRequired,
    selectedBodyType: PropTypes.object,
  };

  handleSubmit = (values) => {
    this.props.saveBodyTypeRequest(values);
  };

  columnActions = ({ value }) =>
    <Flex jcc>
      <Tooltip content='Edit' position={Position.LEFT}>
        <Button
          icon='annotation'
          minimal
          marginRight={2}
          intent={Intent.PRIMARY}
          minHeight={25}
          onClick={this.handleDialogOpen(value)}
        />
      </Tooltip>
      <PopoverConfirmDelete name='body type' onDelete={this.handleDelete(value)}>
        <Tooltip content='Delete' position={Position.RIGHT}>
          <Button icon='trash' minimal marginLeft={2} intent={Intent.DANGER} minHeight={25} />
        </Tooltip>
      </PopoverConfirmDelete>
    </Flex>
  ;

  handleDialogOpen = value => () => {
    const { showSideDialog, bodyTypes, selectBodyType } = this.props;
    const bodyType = bodyTypes.find(b => b.id === value);

    if (bodyType) {
      selectBodyType(bodyType);
    }
    showSideDialog(true);
  };

  handleDelete = value => () => {
    this.props.deleteBodyTypeRequest(value);
  };

  handleDialogClose = () => {
    this.props.selectBodyType(null);
    this.props.showSideDialog(false);
  };

  render() {
    const { bodyTypes, isSavingBodyType, selectedBodyType } = this.props;
    const initialValues = selectedBodyType || { code: '', name: '' };

    return (
      <Card width='100%'>
        <CardBody>
          <Table data={bodyTypes} width='100%'>
            <Table.RowDefinition>
              <Table.ColumnDefinition id='code' title='Code' order={1} />
              <Table.ColumnDefinition id='name' title='Name' order={2} />
              <Table.ColumnDefinition id='createdBy' title='Created By' order={3} />
              <Table.ColumnDefinition id='dateCreated' title='Date Created' order={4} />
              <Table.ColumnDefinition actions id='id' customComponent={this.columnActions} />
            </Table.RowDefinition>
            <Table.Toolbar>
              <Button intent={Intent.PRIMARY} icon='plus' onClick={this.handleDialogOpen()}>Add Body Type</Button>
            </Table.Toolbar>
          </Table>
          <SideDialog
            icon='annotation'
            onClose={this.handleDialogClose}
            title='Edit Body Type'
            loading={isSavingBodyType}
          >
            {onSideDialogClose =>
              <BodyTypeForm
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
                onCancel={onSideDialogClose}
                isSaving={isSavingBodyType}
              />
            }
          </SideDialog>
        </CardBody>
      </Card>
    );
  }
}

export default BodyTypes;

