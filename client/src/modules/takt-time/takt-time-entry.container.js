import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Intent } from '@blueprintjs/core';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Flex, Button } from 'core/styled';
import { FormSelect, FormInput } from '../common/x-form';
import SideDialog from '../common/side-dialog/side-dialog.container';

const validationSchema = yup.object().shape({
  bodyTypeId: yup
    .string()
    .max(150, 'Should not exceed 150 characters')
    .required('Body Type is required'),
  chassisModelId: yup
    .string()
    .max(150, 'Should not exceed 150 characters')
    .required('Chassis Model is required'),
  workTime: yup
    .number()
    .required('Takt Time is required'),
});

class TaktimeEntry extends Component {
  handleOpened = () => {
    this.props.getChassisModelsRequest();
  };

  handleSubmit = (values) => {
    this.props.saveTaktTimeRequest(values);
  };

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  handleChassisModelChange = (chassisModelId) => {
    const { getBodyTypesRequest, chassisModels } = this.props;
    const chassisModel = (chassisModels || []).find(cm => cm.value === chassisModelId);
    if (chassisModel) {
      getBodyTypesRequest(chassisModel.type);
    }
  };

  render() {
    const { taktTime, bodyTypes, chassisModels, isSaving } = this.props;
    let initialValues = { bodyTypeId: '', chassisModelId: '', workTime: '' };

    if (taktTime) {
      const { id, bodyTypeId, chassisModelId, workTime } = taktTime;
      initialValues = { id, bodyTypeId, chassisModelId, workTime };
    }

    return (
      <SideDialog icon='plus' onClose={this.handleClose} onOpened={this.handleOpened} title='Takt Time Entry'>
        {onSideDialogClose => (
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}
            render={({ dirty, values }) => (
              <Form style={{ width: '100%' }}>
                <Field
                  name='chassisModelId'
                  label='Chassis Model'
                  placeholder='Select a Chassis Model'
                  component={FormSelect}
                  options={chassisModels}
                  onAfterChange={this.handleChassisModelChange}
                />
                <Field
                  name='bodyTypeId'
                  label='Body Type'
                  placeholder='Select a Body Type'
                  component={FormSelect}
                  options={bodyTypes}
                  disabled={!values.chassisModelId}
                />
                <Field
                  name='workTime'
                  label='Takt Time (mins)'
                  placeholder='Enter a Takt Time'
                  type='number'
                  component={FormInput}
                />
                <Flex paddingTop={50} fdr jcfe>
                  <Button marginRight={5} onClick={onSideDialogClose}>
                    Cancel
                  </Button>
                  <Button icon='floppy-disk' intent={Intent.SUCCESS} type='submit' loading={isSaving} disabled={!dirty}>
                    Save
                  </Button>
                </Flex>
              </Form>
            )}
          />
        )}
      </SideDialog>
    );
  }
}

TaktimeEntry.propTypes = {
  taktTime: PropTypes.object,
  chassisModels: PropTypes.array.isRequired,
  bodyTypes: PropTypes.array.isRequired,
  isSaving: PropTypes.bool.isRequired,

  onClose: PropTypes.func.isRequired,

  getChassisModelsRequest: PropTypes.func.isRequired,
  getBodyTypesRequest: PropTypes.func.isRequired,
  saveTaktTimeRequest: PropTypes.func.isRequired,
};

const mapStateToProps = ({ taktTime }) => ({
  taktTime: taktTime.selectedTaktTime,
  chassisModels: taktTime.chassisModels,
  bodyTypes: taktTime.bodyTypes,
  isSaving: taktTime.isSaving,
});

const mapActionsToProps = ({ taktTime: { getChassisModelsRequest, getBodyTypesRequest, saveTaktTimeRequest } }) => ({
  getChassisModelsRequest,
  getBodyTypesRequest,
  saveTaktTimeRequest,

});

export default connect(
  mapStateToProps,
  mapActionsToProps,
)(TaktimeEntry);
