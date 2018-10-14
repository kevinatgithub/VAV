import React from 'react';
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core';
import { Select } from 'core/styled';
import FormGroup from './form-group.component';

const FormSelect = ({ field, form: { touched, errors }, options, label, placeholder, optional, defaultValue, inline }) => {
  const { name: fieldName } = field;
  const placeholderOpt = { label: placeholder, value: '', disabled: true };

  return (
    <FormGroup
      label={label}
      name={fieldName}
      optional={optional}
      inline={inline}
      touched={touched}
      errors={errors}
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

FormSelect.propTypes = {
  field: PropTypes.object,
  options: PropTypes.array,
  touched: PropTypes.object,
  errors: PropTypes.object,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  optional: PropTypes.bool,
  defaultValue: PropTypes.string,
  inline: PropTypes.string,
};

export default FormSelect;
