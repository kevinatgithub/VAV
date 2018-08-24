import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button as AntdButton } from 'antd';
import { marginProps } from './styling/styling';

// eslint-disable-next-line no-unused-vars
const Button = ({
  children,
  onClick,
  className,
  ghost,
  type,
  size,
  shape,
  icon,
  disabled,
  onMouseEnter,
  onMouseLeave,
}) =>
  <AntdButton
    type={type}
    size={size}
    shape={shape}
    className={className}
    onClick={onClick}
    ghost={ghost}
    icon={icon}
    disabled={disabled}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </AntdButton>;

Button.propTypes = {
  type: PropTypes.oneOf(['default', 'primary', 'ghost', 'dashed', 'danger']),
  size: PropTypes.oneOf(['small', 'default', 'large']),
  shape: PropTypes.oneOf(['circle', 'circle-outline']),
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
  ghost: PropTypes.bool,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default styled(Button)`
  ${marginProps};
`;
