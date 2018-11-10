import styled from 'styled-components';
import { Div, Flex } from 'core/styled';
import { Colors } from '@blueprintjs/core';
import { unitStatus } from '../../core/utils/values';

const innerStatus = {
  [unitStatus.NORMAL]: Colors.GREEN3,
  [unitStatus.MATERIAL_CALL]: Colors.ORANGE3,
  [unitStatus.MANAGER_CALL]: Colors.RED3,
};

const outerStatus = {
  [unitStatus.NORMAL]: 'rgba(15, 153, 96, 0.42)',
  [unitStatus.MATERIAL_CALL]: 'rgba(217, 130, 43, .42)',
  [unitStatus.MANAGER_CALL]: 'rgba(219, 55, 55, .42)',
};

export const Outer = styled(Flex)`
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  border-radius: 16px;
  background-color: ${p => outerStatus[p.status]};

  ${p => (p.status === unitStatus.MANAGER_CALL && !p.noBlink) && `

  `}
`;

export const Inner = styled(Div)`
  height: 12px;
  width: 12px;
  border-radius: 12px;
  background-color: ${p => innerStatus[p.status]};
`;
