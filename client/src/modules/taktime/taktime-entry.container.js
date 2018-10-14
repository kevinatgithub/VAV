import React from 'react';
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Flex, Button } from 'core/styled';
import { FormSelect } from 'modules/common/x-form';
import SideDialog from '../common/side-dialog/side-dialog.container';

const validationSchema = yup.object().shape({
  bodyType: yup
    .string()
    .max(150, 'Should not exceed 150 characters')
    .required('Body Type is required'),
  chassisModel: yup
    .string()
    .max(150, 'Should not exceed 150 characters')
    .required('Chassis Model is required'),
});

function TaktimeEntry({ bodyTypes, chassisModels, onSubmit, onClose }) {
  return (
    <SideDialog
      icon='print'
      onClose={onClose}
      title='Reprint Chassis Numbers'
    >
      {onSideDialogClose =>
        <Formik
          initialValues={{ bodyType: null, chassisModel: null, workTime: null }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          render={({ dirty }) => (
            <Form style={{ width: '100%' }}>
              <Field
                name='bodyType'
                label='Select a Body Type'
                component={FormSelect}
                options={bodyTypes}
              />
              <Field
                name='chassisModel'
                label='Select a Chassis Model'
                component={FormSelect}
                options={chassisModels}
              />
              <Flex paddingTop={50} fdr jcfe>
                <Button marginRight={5} onClick={onSideDialogClose}>
                Cancel
                </Button>
                <Button
                  icon='disk' intent={Intent.SUCCESS} type='submit'
                  disabled={!dirty}
                >
                Save
                </Button>
              </Flex>
            </Form>
          )}
        />
      }
    </SideDialog>


  );
}

TaktimeEntry.propTypes = {
  bodyTypes: PropTypes.array.isRequired,
  chassisModels: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TaktimeEntry;
