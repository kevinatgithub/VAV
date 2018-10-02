import React from 'react';
import PropTypes from 'prop-types';
import { Intent, FormGroup, Checkbox, Classes } from '@blueprintjs/core';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import FormGroupSwitch from 'common/x-form/components/form-group-switch';
import { Flex, Button } from '../../ui';
import style from './mo-details-style';
import { CardBody } from '../../ui/card';

const { Wrapper, Header, Title } = style;

const validationSchema = yup.object().shape({
  chassisNumbers: yup
    .string()
    .max(150, 'Should not exceed 150 characters')
    .required('Code is required'),
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
          initialValues={{ specialProject: false, chassisNumbers: '' }}
          onSubmit={onProcess}
          validationSchema={validationSchema}
          render={() =>
            <Form style={{ width: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Flex fdc flex={1}>
                <Field
                  type='text'
                  name='specialProject'
                  label='Special Project'
                  component={FormGroupSwitch}
                  inline
                  optional
                />
                <FormGroup
                  label='Select Chassis Numbers'
                  labelFor='selectChassis'
                  inline
                >
                  {mo && mo.chassis.map(c =>
                    <Checkbox key={c} label={c} />,
                  ) }
                </FormGroup>
              </Flex>
              <Flex paddingBottom={20} fdr jcfe>
                <Button marginRight={5} onClick={onClose}>
              Cancel
                </Button>
                <Button icon='barcode' intent={Intent.SUCCESS} type='submit'>
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
