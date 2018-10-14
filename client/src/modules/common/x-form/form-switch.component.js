import React from 'react';
import PropTypes from 'prop-types';
import { Intent, Switch } from '@blueprintjs/core';
import FormGroup from './form-group.component';

const FormSwitch = ({ field, form: { touched, errors }, label, optional, inline }) => {
  const { name: fieldName } = field;

  return (
    <FormGroup
      label={label}
      name={fieldName}
      optional={optional}
      inline={inline}
      touched={touched}
      errors={errors}
    >
      <Switch
        {...field}
        id={fieldName}
        intent={touched[fieldName] && errors[fieldName] && Intent.DANGER}
      />
    </FormGroup>
  );
};

FormSwitch.propTypes = {
  field: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  label: PropTypes.string,
  optional: PropTypes.bool,
  inline: PropTypes.bool,
};

export default FormSwitch;
