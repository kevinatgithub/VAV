import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Intent, Switch } from '@blueprintjs/core';

const FormGroupSwitch = ({ field, form: { touched, errors }, label, optional, inline }) => {
  const { name: fieldName } = field;

  return (
    <FormGroup
      label={label}
      labelFor={fieldName}
      inline={inline}
      labelInfo={optional && '(optional)'}
      helperText={touched[fieldName] && errors[fieldName] && errors[fieldName]}
      intent={touched[fieldName] && errors[fieldName] && Intent.DANGER}
    >
      <Switch
        {...field}
        id={fieldName}
        intent={touched[fieldName] && errors[fieldName] && Intent.DANGER}
      />
    </FormGroup>
  );
};

FormGroupSwitch.propTypes = {
  field: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  label: PropTypes.string,
  optional: PropTypes.bool,
  inline: PropTypes.bool,
};

export default FormGroupSwitch;
