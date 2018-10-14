import styled from 'styled-components';
import { Alert as AlertRaw, H3, Icon } from '@blueprintjs/core';

export const Alert = styled(AlertRaw)`
  .bp3-alert-body {
    flex-direction: column;
    align-items: center;
  }
  .bp3-alert-contents {
    text-align: center;
  }
`;

export const Title = styled(H3)`
  text-align: center;
`;

export const ErrorIcon = styled(Icon)`
  margin-bottom: 15px;
`;

