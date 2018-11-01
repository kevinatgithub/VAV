import styled from 'styled-components';
import { Flex, Card } from 'core/styled';
import { H6 } from '@blueprintjs/core';

export const Wrapper = styled(Card)`
  flex: 1;
  min-height: 80px;
  padding: 6px 8px;
`;

export const UnitTitle = styled(H6)`
  margin-left: 5px;
  margin-bottom: 5px;
`;

export const Progress = styled(Flex)`
  align-items: center;

  .bp3-progress-bar {
    height: 6px;
  }
`;

