import styled from 'styled-components';
import { Flex, Card } from 'core/styled';
import { H6, Colors } from '@blueprintjs/core';
import { unitStatus } from '../../core/utils/values';

const statusColor = {
  [unitStatus.NORMAL]: Colors.GREEN3,
  [unitStatus.MATERIAL_CALL]: Colors.ORANGE3,
  [unitStatus.MANAGER_CALL]: 'rgba(219, 55, 55, 0.60)',
};

export const Wrapper = styled(Card)`
  min-height: 80px;
  width: 222px;
  padding: 6px 8px;
  margin-right: 8px;
  font-weight: 500;

  &.bp3-card {
    background-color: ${p => p.status !== unitStatus.MANAGER_CALL && statusColor[p.status]};
  }

  ${p => p.status === unitStatus.MANAGER_CALL && `
    & {
      animation: blinker 1s linear infinite;
    }

    @keyframes blinker {
      50% { background-color: ${statusColor.MANAGER_CALL}; }
    }
  `}
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

