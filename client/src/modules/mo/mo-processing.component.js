import React from 'react';
import PropTypes from 'prop-types';
import { Intent, Classes } from '@blueprintjs/core';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { Flex, Button, CardBody } from 'core/styled';
import { FormCheckboxGroup, FormSwitch } from 'modules/common/x-form/components';
import style from './mo-common.style';

const { Wrapper, Header, Title } = style;

const validationSchema = yup.object().shape({
  selectedChassisNumbers: yup.string().required('At least 1 chassis number is required'),
});

function MoProcessing({ mo, processing, onProcess, onClose }) {
  return (
    <Wrapper className={Classes.ELEVATION_4}>
      <Header>
        <Flex flex={1} aic>
          <Title>Release to Production</Title>
        </Flex>
        <Button minimal icon='cross' onClick={onClose} />
      </Header>
      <CardBody>
        <Formik
          initialValues={{ specialProject: false, selectedChassisNumbers: [] }}
          onSubmit={onProcess}
          validationSchema={validationSchema}
          render={({ dirty }) => (
            <Form style={{ width: '100%' }}>
              <Field
                type='text' name='specialProject' label='Special Project' component={FormSwitch} inline
                optional
              />
              <Field
                name='selectedChassisNumbers'
                label='Select Chassis Number(s)'
                component={FormCheckboxGroup}
                inline
                options={mo.chassis.map(c => ({ value: c.id, label: c.id }))}
              />
              <Flex paddingTop={50} fdr jcfe>
                <Button
                  fill large icon='tick-circle' intent={Intent.SUCCESS} type='submit'
                  disabled={!dirty} loading={processing}
                >
                  Process
                </Button>
              </Flex>
            </Form>
          )}
        />
      </CardBody>
    </Wrapper>
  );
}

MoProcessing.propTypes = {
  mo: PropTypes.object,
  processing: PropTypes.bool.isRequired,
  onProcess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MoProcessing;
