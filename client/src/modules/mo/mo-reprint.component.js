import React from 'react';
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Flex, Button } from 'core/styled';
import { FormCheckboxGroup } from 'modules/common/x-form/components';
import SideDialog from '../common/side-dialog/side-dialog.container';

const validationSchema = yup.object().shape({
  selectedChassisNumbers: yup.string().required('At least 1 chassis number is required'),
});

function MoReprint({ chassis, onReprint, onClose }) {
  return (
    <SideDialog
      icon='print'
      onClose={onClose}
      title='Reprint Chassis Numbers'
    >
      {onSideDialogClose =>
        <Formik
          initialValues={{ selectedChassisNumbers: [] }}
          onSubmit={onReprint}
          validationSchema={validationSchema}
          render={({ dirty }) => (
            <Form style={{ width: '100%' }}>
              <Field
                name='selectedChassisNumbers'
                label='Select Chassis Number(s)'
                component={FormCheckboxGroup}
                inline
                options={chassis.filter(c => c.isPrinted).map(c => ({ value: c.id, label: c.id }))}
              />
              <Flex paddingTop={50} fdr jcfe>
                <Button marginRight={5} onClick={onSideDialogClose}>
                Cancel
                </Button>
                <Button
                  icon='print' intent={Intent.SUCCESS} type='submit'
                  disabled={!dirty}
                >
                Print
                </Button>
              </Flex>
            </Form>
          )}
        />
      }
    </SideDialog>


  );
}

MoReprint.propTypes = {
  chassis: PropTypes.array.isRequired,
  onReprint: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MoReprint;
