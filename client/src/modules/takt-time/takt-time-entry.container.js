import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Intent } from '@blueprintjs/core';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Flex, Button } from 'core/styled';
import { FormSelect, FormInput } from '../common/x-form';
import SideDialog from '../common/side-dialog/side-dialog.container';

class TaktimeEntry extends Component {
  getValidationSchema(sectionName) {
    const validationSchema = { workTime: yup.number().required('Takt Time is required') };

    switch (sectionName) {
      case 'Chassis Assembly':
        validationSchema.chassisModelId = yup
          .string()
          .max(150, 'Should not exceed 150 characters')
          .required('Chassis Model is required');
        break;
      case 'Truck Line':
      case 'Bus Line':
        validationSchema.bodyTypeId = yup
          .string()
          .max(150, 'Should not exceed 150 characters')
          .required('Body Type is required');
        break;
      default:
        validationSchema.chassisModelId = yup
          .string()
          .max(150, 'Should not exceed 150 characters')
          .required('Chassis Model is required');
        validationSchema.bodyTypeId = yup
          .string()
          .max(150, 'Should not exceed 150 characters')
          .required('Body Type is required');
        break;
    }
    return yup.object().shape(validationSchema);
  }

  handleOpened = () => {
    if (!this.props.showChassisModel) {
      this.props.getBodyTypesRequest();
    } else {
      this.props.getChassisModelsRequest();
    }
  };

  handleSubmit = (values) => {
    this.props.saveTaktTimeRequest(values);
  };

  handleChassisModelChange = (chassisModelId) => {
    if (this.props.showBodyType) {
      const { getBodyTypesRequest, chassisModels } = this.props;
      const chassisModel = (chassisModels || []).find(cm => cm.value === chassisModelId);
      if (chassisModel) {
        getBodyTypesRequest(chassisModel.type);
      }
    }
  };

  render() {
    const { taktTime, bodyTypes, chassisModels, isSaving, onClose, section, showChassisModel, showBodyType } = this.props;
    let initialValues = { bodyTypeId: '', chassisModelId: '', workTime: '' };

    if (taktTime) {
      const { id, bodyTypeId, chassisModelId, workTime } = taktTime;
      initialValues = { id, bodyTypeId, chassisModelId, workTime };
    }

    return (
      <SideDialog icon='plus' onClose={onClose} onOpened={this.handleOpened} title='Takt Time Entry'>
        {onSideDialogClose => (
          <Formik
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            validationSchema={this.getValidationSchema(section.name)}
            render={({ dirty, values }) => (
              <Form style={{ width: '100%' }}>
                {showChassisModel && (
                  <Field
                    name='chassisModelId'
                    label='Chassis Model'
                    placeholder='Select a Chassis Model'
                    component={FormSelect}
                    options={chassisModels}
                    onAfterChange={this.handleChassisModelChange}
                  />
                )}
                {showBodyType && (
                  <Field
                    name='bodyTypeId'
                    label='Body Type'
                    placeholder='Select a Body Type'
                    component={FormSelect}
                    options={bodyTypes}
                    disabled={showChassisModel && !values.chassisModelId}
                  />
                )}
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
  section: PropTypes.object.isRequired,

  showChassisModel: PropTypes.bool.isRequired,
  showBodyType: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  getChassisModelsRequest: PropTypes.func.isRequired,
  getBodyTypesRequest: PropTypes.func.isRequired,
  saveTaktTimeRequest: PropTypes.func.isRequired,
};

const mapStateToProps = ({ taktTime, sectionTaktTimes }) => ({
  taktTime: taktTime.selectedTaktTime,
  chassisModels: taktTime.chassisModels,
  bodyTypes: taktTime.bodyTypes,
  isSaving: taktTime.isSaving,
  section: sectionTaktTimes.section,
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
