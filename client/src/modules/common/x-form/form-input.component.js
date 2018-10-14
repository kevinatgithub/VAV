import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Intent } from '@blueprintjs/core';
import FormGroup from './form-group.component';

const FormInput = ({ field, form: { touched, errors }, type, label, placeholder, optional, inline }) => {
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

FormInput.propTypes = {
  field: PropTypes.object,
  type: PropTypes.string,
  touched: PropTypes.object,
  errors: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  optional: PropTypes.bool,
  inline: PropTypes.bool,
};

export default FormInput;
