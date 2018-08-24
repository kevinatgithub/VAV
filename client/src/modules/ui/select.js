import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntdSelect } from 'antd';
import styled from 'styled-components';
import {
  marginProps,
  heightProps,
  widthProps,
} from './styling/styling';

// eslint-disable-next-line no-unused-vars
const Select = ({ children, onChange, className, size, defaultValue }) =>
  <AntdSelect
    size={size}
    defaultValue={defaultValue}
    className={className}
    onChange={onChange}
  >{children}</AntdSelect>;

Select.propTypes = {
  size: PropTypes.oneOf(['small', 'default', 'large']),
  defaultValue: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export const { Option } = AntdSelect.Option;

export default styled(Select)`
  ${marginProps};
  ${heightProps};
  ${widthProps};
`;
