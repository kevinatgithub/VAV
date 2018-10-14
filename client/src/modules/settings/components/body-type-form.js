import React from 'react';
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import FormGroupInput from 'modules/common/x-form/components/form-group-input';
import { Button, Flex } from 'core/styled';

const validationSchema = yup.object().shape({
  code: yup
    .string()
    .max(150, 'Should not exceed 150 characters')
    .required('Code is required'),
  name: yup
    .string()
    .max(150, 'Should not exceed 150 characters')
    .required('Name is required'),
});

const BodyTypeForm = ({ initialValues, onCancel, onSubmit, isSaving }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      render={props =>
        <Form style={{ width: '100%' }}>
          <Field
            type='text'
            name='code'
            label='Code'
            placeholder='Enter a body type code'
            required
            component={FormGroupInput}
          />
          <Field type='text' name='name' label='Name' placeholder='Enter a body type name' component={FormGroupInput} />
          <Flex paddingTop={30} fdr jcfe>
            <Button marginRight={5} onClick={onCancel}>
              Cancel
            </Button>
            <Button icon='floppy-disk' intent={Intent.SUCCESS} type='submit' loading={isSaving} disabled={!props.dirty}>
              Save
            </Button>
          </Flex>
        </Form>
      }
    />
  );
};

BodyTypeForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  dirty: PropTypes.bool,
};

export default BodyTypeForm;
