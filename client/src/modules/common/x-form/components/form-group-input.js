import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, Intent } from '@blueprintjs/core';

const FormGroupInput = ({ field, form: { touched, errors }, type, label, placeholder, optional }) => {
  const { name: fieldName } = field;

  return (
    <FormGroup
      label={label}
      labelFor={fieldName}
      labelInfo={optional && '(optional)'}
      helperText={touched[fieldName] && errors[fieldName] && errors[fieldName]}
      intent={touched[fieldName] && errors[fieldName] && Intent.DANGER}
    >
      <InputGroup
        {...field}
        type={type}
        placeholder={placeholder}
        id={fieldName}
        intent={touched[fieldName] && errors[fieldName] && Intent.DANGER}
      />
    </FormGroup>
  );
};

FormGroupInput.propTypes = {
  field: PropTypes.object,
  type: PropTypes.string,
  touched: PropTypes.object,
  errors: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  optional: PropTypes.bool,
};

export default FormGroupInput;
