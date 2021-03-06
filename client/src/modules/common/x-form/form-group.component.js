import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { FormGroup as FormGroupRaw, Intent, Colors } from '@blueprintjs/core';
import styled from 'styled-components';
import { TRANSITION_TIMEOUT } from 'core/utils/values';
import { Div } from 'core/styled';

const StyledFormGroup = styled(FormGroupRaw)`
  .bp3-label {
    color: ${p => (p.intent === Intent.DANGER ? Colors.RED2 : null)};
  }
  .bp3-input-group {
    display: inline-block;
  }
`;

const FormGroup = ({ name, touched, errors, label, optional, inline, children }) => {
  const hasError = !!(touched[name] && errors[name]);

  return (
    <StyledFormGroup
      label={label}
      labelFor={name}
      labelInfo={optional && '(optional)'}
      helperText={
        hasError && (
          <CSSTransition in={hasError} appear unmountOnExit timeout={TRANSITION_TIMEOUT} classNames='bounce'>
            <Div>{errors[name]}</Div>
          </CSSTransition>
        )
      }
      intent={hasError ? Intent.DANGER : Intent.NONE}
      inline={inline}
    >
      {children}
    </StyledFormGroup>
  );
};

FormGroup.propTypes = {
  name: PropTypes.string,
  touched: PropTypes.object,
  errors: PropTypes.object,
  label: PropTypes.string,
  optional: PropTypes.bool,
  inline: PropTypes.bool,
  children: PropTypes.node,
};

export default FormGroup;
