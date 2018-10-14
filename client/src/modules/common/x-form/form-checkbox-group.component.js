import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@blueprintjs/core';
import { FieldArray } from 'formik';
import FormGroup from './form-group.component';

const FormCheckboxGroup = ({ field, form: { touched, errors, values }, options, label, optional, inline }) => {
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
      <FieldArray
        name={fieldName}
        render={({ push, remove }) =>
          options.map(o =>
            <Checkbox
              name={fieldName}
              key={o.value}
              label={o.label}
              value={o.value}
              checked={values[fieldName].includes(o.value)}
              onChange={(e) => {
                if (e.target.checked) {
                  push(o.value);
                } else {
                  const idx = values.selectedChassisNumbers.indexOf(o.value);
                  remove(idx);
                }
              }}
            />,
          )
        }
      />
    </FormGroup>
  );
};

FormCheckboxGroup.propTypes = {
  field: PropTypes.object,
  options: PropTypes.array,
  form: PropTypes.object,
  label: PropTypes.string,
  optional: PropTypes.bool,
  inline: PropTypes.bool,
};

export default FormCheckboxGroup;
