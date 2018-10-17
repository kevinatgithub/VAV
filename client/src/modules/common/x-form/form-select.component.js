import React from 'react';
import PropTypes from 'prop-types';
import { Intent } from '@blueprintjs/core';
import { Select } from 'core/styled';
import FormGroup from './form-group.component';

function FormSelect({
  field,
  form: { touched, errors },
  options,
  label,
  placeholder,
  optional,
  defaultValue,
  inline,
  disabled,
  onAfterChange,
}) {
  const { name } = field;
  const placeholderOpt = { label: placeholder, value: '', disabled: true };
  const handleChange = (e) => {
    field.onChange(e);
    if (onAfterChange) {
      onAfterChange(e.target.value);
    }
  };

  return (
    <FormGroup
      label={label} name={name} optional={optional} inline={inline} touched={touched}
      errors={errors}
    >
      <Select
        {...field}
        onChange={handleChange}
        id={name}
        options={[placeholderOpt, ...options]}
        defaultValue={defaultValue}
        intent={touched[name] && errors[name] && Intent.DANGER}
        disabled={disabled}
      />
    </FormGroup>
  );
}

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
  disabled: PropTypes.bool,
  onAfterChange: PropTypes.func,
};

export default FormSelect;
