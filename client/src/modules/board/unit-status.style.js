import styled from 'styled-components';
import { Div, Flex } from 'core/styled';
import { unitStatus } from '../../core/utils/values';

const innerStatus = {
  [unitStatus.NORMAL]: '#06D73E',
  [unitStatus.MATERIAL_CALL]: '#FAAD14',
  [unitStatus.MANAGER_CALL]: '#F5222D',
};

const outerStatus = {
  [unitStatus.NORMAL]: 'rgba(6, 215, 62, 0.42)',
  [unitStatus.MATERIAL_CALL]: 'rgba(250, 173, 20, .42)',
  [unitStatus.MANAGER_CALL]: 'rgba(245, 34, 45, .42)',
};

export const Outer = styled(Flex)`
  align-items: center;
  justify-content: center;
  height: 16px;
  width: 16px;
  border-radius: 16px;
  background-color: ${p => outerStatus[p.status]};

  ${p => (p.status === unitStatus.MANAGER_CALL && !p.noBlink) && `
    & {
      animation: blinker 1s linear infinite;
    }

    @keyframes blinker {
      50% { opacity: 0; }
    }
  `}
`;

export const Inner = styled(Div)`
  height: 12px;
  width: 12px;
  border-radius: 12px;
  background-color: ${p => innerStatus[p.status]};
`;
