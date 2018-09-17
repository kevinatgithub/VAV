import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button as ButtonRaw, Intent } from '@blueprintjs/core';
import { marginProps, heightProps, paddingProps } from './styling/styling';

const Button = ({ children, onClick, className, type = 'button', icon, intent, loading, disabled, minimal }) => {
  return (
    <ButtonRaw
      onClick={onClick}
      className={className}
      type={type}
      icon={icon}
      intent={intent}
      loading={loading}
      disabled={disabled}
      minimal={minimal}
    >
      {children}
    </ButtonRaw>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  icon: PropTypes.string,
  intent: PropTypes.oneOf([...Object.values(Intent)]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  minimal: PropTypes.bool,
};

export default styled(Button)`
  &.bp3-button:not(.bp3-minimal) {
    box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2), inset 0 -1px 0 rgba(16, 22, 26, 0.1);
  }
  ${marginProps};
  ${paddingProps};
  ${heightProps};
`;
