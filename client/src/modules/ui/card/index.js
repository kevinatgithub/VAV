import styled from 'styled-components';
import { Card as CardRaw } from '@blueprintjs/core';
import { Flex } from '..';
import { widthProps } from '../styling/styling';

export const Card = styled(CardRaw)`
  ${widthProps};
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const CardHeader = Flex.extend`
    box-shadow: 0 1px 0 rgba(16, 22, 26, 0.15);
    background: #ffffff;
    min-height: 40px;
    padding-left: 20px;
    align-items: center;
    border-radius: 6px 6px 0 0;
    font-size: 18px;
    font-weight: 600;
    color: #182026;

    .bp3-icon {
      margin-right: 10px;
      color: #5c7080;
    }
`;

export const CardBody = Flex.extend`
  flex: 1;
  margin: 20px;
  line-height: 18px;
`;

