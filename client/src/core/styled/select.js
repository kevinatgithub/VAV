import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { HTMLSelect, Intent, Colors } from '@blueprintjs/core';
import {
  marginProps,
  heightProps,
  widthProps,
} from './styling/styling';

// eslint-disable-next-line no-unused-vars
const Select = ({ id, options, onChange, onBlur, value, className, defaultValue, disabled }) =>
  <HTMLSelect
    id={id}
    defaultValue={defaultValue}
    className={className}
    onChange={onChange}
    onBlur={onBlur}
    value={value || ''}
    options={options}
    disabled={disabled}
  />;

Select.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default styled(Select)`
  ${marginProps};
  ${heightProps};
  ${widthProps};

  &.bp3-html-select select {
    padding-right: 30px;
    ${p => p.intent === Intent.DANGER ? `border: 1px solid ${Colors.RED3}` : 'transparent'};
    ${p => p.intent === Intent.DANGER ? 'box-shadow: none' : null}
  }
`;
