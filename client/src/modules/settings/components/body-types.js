import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router';
import { Position, Tooltip, Intent } from '@blueprintjs/core';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import FormGroupInput from 'common/x-form/components/form-group-input';
import FormGroupSelect from 'common/x-form/components/form-group-select';
import { Card, CardBody } from '../../ui/card';
import Table from '../../common/table/table';
import { Flex, Button } from '../../ui';
import SideDialog from '../../common/side-dialog/containers/side-dialog-container';

const validationSchema = yup.object().shape({
  chassisNumber: yup.string().required('Chassis number is required'),
  modelNumber: yup
    .string()
    .max(10, 'Should not exceed 10 characters')
    .required('Model number is required'),
  bodyType: yup.string().required('Body type is required'),
});

const bodyTypesOpt = [
  { label: 'Mini Van', value: 'miniVan' },
  { label: 'Armor Van', value: 'armorVan' },
  { label: 'Dump Truck', value: 'dumpTruck' },
];

class BodyTypes extends Component {
  static propTypes = {
    bodyTypes: PropTypes.array,
    isSaving: PropTypes.bool.isRequired,
    saveSettingsRequest: PropTypes.func.isRequired,
    showSideDialog: PropTypes.func.isRequired,
  };

  handleSubmit = (values) => {
    this.props.saveSettingsRequest(values);
  };

  columnActions = () =>
    <Flex jcc>
      <Tooltip content='Edit Body Type' position={Position.LEFT}>
        <Button
          icon='annotation'
          minimal
          marginRight={2}
          intent={Intent.PRIMARY}
          minHeight={25}
          onClick={this.handleDialogOpen}
        />
      </Tooltip>
      <Tooltip content='Delete Body Type' position={Position.RIGHT}>
        <Button icon='trash' minimal marginLeft={2} intent={Intent.DANGER} minHeight={25} />
      </Tooltip>
    </Flex>
  ;

  handleDialogOpen = () => {
    this.props.showSideDialog(true);
  };

  handleDialogClose = () => {
    this.props.showSideDialog(false);
  };

  render() {
    const { bodyTypes, isSaving } = this.props;

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
          </Table>
          <SideDialog
            icon='annotation'
            onClose={this.handleDialogClose}
            title='Edit Body Type'
            loading={isSaving}
          >
            {onSideDialogClose =>
              <Formik
                initialValues={{ chassisNumber: '', modelNumber: '', bodyType: '' }}
                onSubmit={this.handleSubmit}
                validationSchema={validationSchema}
                render={props =>
                  <Form style={{ width: '100%' }}>
                    <Field
                      type='text'
                      name='chassisNumber'
                      label='Chassis No.'
                      placeholder='Enter a chassis number'
                      required
                      component={FormGroupInput}
                    />
                    <Field
                      type='text'
                      name='modelNumber'
                      label='Model No.'
                      placeholder='Enter a model number'
                      component={FormGroupInput}
                    />
                    <Field
                      type='text'
                      name='description'
                      label='Description'
                      placeholder='Enter a description'
                      optional
                      component={FormGroupInput}
                    />
                    <Field
                      name='bodyType'
                      label='Body type'
                      options={bodyTypesOpt}
                      placeholder='Select a Body type'
                      component={FormGroupSelect}
                    />
                    <Flex paddingTop={30} fdr jcfe>
                      <Button marginRight={5} onClick={onSideDialogClose}>Cancel</Button>
                      <Button icon='floppy-disk' intent={Intent.SUCCESS} type='submit' loading={this.props.isSaving}>
                      Save
                      </Button>
                    </Flex>
                    <Prompt when={props.dirty} message='You have unsaved work. Are you sure you want to leave?' />
                  </Form>
                }
              />
            }
          </SideDialog>
        </CardBody>
      </Card>
    );
  }
}

export default BodyTypes;
