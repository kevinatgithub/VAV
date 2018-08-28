import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Intent } from '@blueprintjs/core';
import FormGroupInput from 'common/x-form/components/form-group-input';
import FormGroupSelect from 'common/x-form/components/form-group-select';
import { MainContent, Button } from 'ui';

const validationSchema = yup.object().shape({
  chassisNumber: yup.string().required('Chassis number is required'),
  modelNumber: yup
    .string()
    .max(10, 'Model number has reached the max allowed characters of 10')
    .required('Model number is required'),
  bodyType: yup.string().required('Body type is required'),
});

class Settings extends Component {
  static propTypes = {
    isSaving: PropTypes.bool.isRequired,
    saveSettingsRequest: PropTypes.func.isRequired,
  };
  state = {};

  bodyTypes = [
    { label: 'Mini Van', value: 'miniVan' },
    { label: 'Armor Van', value: 'armorVan' },
    { label: 'Dump Truck', value: 'dumpTruck' },
  ];

  handleSubmit = (values) => {
    this.props.saveSettingsRequest(values);
  };

  render() {
    return (
      <MainContent>
        <Formik
          initialValues={{ chassisNumber: '', modelNumber: '', bodyType: '' }}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}
          render={() => {
            return (
              <Form style={{ width: 300 }}>
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
                  options={this.bodyTypes}
                  placeholder='Select a Body type'
                  component={FormGroupSelect}
                />
                <Button marginRight={5}>Cancel</Button>
                <Button icon='floppy-disk' intent={Intent.SUCCESS} type='submit' loading={this.props.isSaving}>
                  Save
                </Button>
              </Form>
            );
          }}
        />
      </MainContent>
    );
  }
}

export default Settings;
