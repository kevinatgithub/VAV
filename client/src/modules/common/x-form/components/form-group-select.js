import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Intent } from '@blueprintjs/core';
import { Select } from '../../../ui';

const FormGroupSelect = ({ field, form: { touched, errors }, options, label, placeholder, optional, defaultValue }) => {
  const { name: fieldName } = field;
  const placeholderOpt = { label: placeholder, value: '', disabled: true };

  return (
    <FormGroup
      label={label}
      labelFor={fieldName}
      labelInfo={optional && '(optional)'}
      helperText={touched[fieldName] && errors[fieldName] && errors[fieldName]}
      intent={touched[fieldName] && errors[fieldName] && Intent.DANGER}
    >
      <Select
        {...field}
        id={fieldName}
        options={[placeholderOpt, ...options]}
        defaultValue={defaultValue}
        intent={touched[fieldName] && errors[fieldName] && Intent.DANGER}
      />
    </FormGroup>
  );
};

FormGroupSelect.propTypes = {
  field: PropTypes.object,
  options: PropTypes.array,
  touched: PropTypes.object,
  errors: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  optional: PropTypes.bool,
  defaultValue: PropTypes.string,
};

export default FormGroupSelect;
