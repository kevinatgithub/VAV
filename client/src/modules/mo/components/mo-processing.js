import React from 'react';
import PropTypes from 'prop-types';
import { Intent, Classes } from '@blueprintjs/core';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import FormGroupSwitch from 'common/x-form/components/form-group-switch';
import FormCheckboxGroup from 'common/x-form/components/form-checkbox-group';
import { Flex, Button } from '../../ui';
import style from './mo-details-style';
import { CardBody } from '../../ui/card';

const { Wrapper, Header, Title } = style;

const validationSchema = yup.object().shape({
  selectedChassisNumbers: yup.string().required('At least 1 chassis number is required'),
});

const MoProcessing = ({ mo, onProcess, onClose }) => {
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
          initialValues={{ specialProject: false, selectedChassisNumbers: [''] }}
          onSubmit={onProcess}
          validationSchema={validationSchema}
          render={({ dirty }) =>
            <Form style={{ width: '100%' }}>
              <Field
                type='text'
                name='specialProject'
                label='Special Project'
                component={FormGroupSwitch}
                inline
                optional
              />
              <Field
                name='selectedChassisNumbers'
                label='Select Chassis Number(s)'
                component={FormCheckboxGroup}
                inline
                options={mo.chassis.map(c => ({ value: c, label: c }))}
              />
              <Flex paddingTop={50} fdr jcfe>
                <Button
                  fill large icon='tick-circle' intent={Intent.SUCCESS} type='submit'
                  disabled={!dirty}
                >
                  Process
                </Button>
              </Flex>
            </Form>
          }
        />
      </CardBody>
    </Wrapper>
  );
};

MoProcessing.propTypes = {
  mo: PropTypes.object,
  onProcess: PropTypes.func,
  onClose: PropTypes.func,
};

export default MoProcessing;
