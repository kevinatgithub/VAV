import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Button, Intent } from '@blueprintjs/core';
import FormGroupInput from 'common/x-form/components/form-group-input';
import FormGroupSelect from 'common/x-form/components/form-group-select';
import { MainContent } from 'ui';
import { toaster } from 'utils/toaster';

const validationSchema = yup.object().shape({
  chassisNumber: yup.string()
    .required('Chassis number is required'),
  modelNumber: yup.string()
    .max(10, 'Model number has reached the max allowed characters of 10')
    .required('Model number is required'),
  bodyType: yup.string()
    .required('Body type is required'),
});

class Settings extends Component {
  state = { };
  bodyTypes = [
    { label: 'Mini Van', value: 'miniVan' },
    { label: 'Armor Van', value: 'armorVan' },
    { label: 'Dump Truck', value: 'dumpTruck' },
  ];


  handleSubmit = (values) => {
    toaster.show({ message: JSON.stringify(values) });
  };

  render() {
    return (
      <MainContent>
        <Formik
          initialValues={{ chassisNumber: '', modelNumber: '', bodyType: '' }}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}
          render={(props) => {
            return (
              <Form onSubmit={props.handleSubmit}>
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
                <Button icon='cross' intent={Intent.NONE}>Cancel</Button>
                <Button icon='floppy-disk' intent={Intent.WARNING} type='submit'>Submit</Button>
              </Form>
            );
          }}
        />
      </MainContent>
    );
  }
}

export default Settings;
