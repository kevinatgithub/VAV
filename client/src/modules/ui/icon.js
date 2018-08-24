import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon as AntdIcon } from 'antd';
import {
  marginProps,
  paddingProps,
  fontProps,
} from './styling/styling';

// eslint-disable-next-line no-unused-vars
const Icon = ({ clickable, name, large, onClick, className, type, spin }) =>
  <AntdIcon type={name} className={className} onClick={onClick} spin={spin} />;

Icon.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  clickable: PropTypes.bool,
  large: PropTypes.bool,
  onClick: PropTypes.func,
  spin: PropTypes.bool,
};

export default styled(Icon)`
  ${marginProps};
  ${paddingProps};
  ${fontProps};
  cursor: ${p => p.clickable && 'pointer'};
  font-size: ${p => p.large ? p.theme.fontSize.large : p.theme.fontSize.normal};
  color: ${p => p.type === 'primary' && p.theme.color.primary};
`;
