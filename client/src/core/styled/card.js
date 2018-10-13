import styled from 'styled-components';
import { Card as CardRaw } from '@blueprintjs/core';
import { widthProps, flexProps, marginProps, paddingProps } from './styling/styling';

export const Card = styled(CardRaw)`
  ${widthProps};
  padding: 0;
  display: flex;
  flex-direction: column;
`;

export const CardHeader = styled.div`
  display: flex;
  box-shadow: 0 1px 0 rgba(16, 22, 26, 0.15);
  background: #ffffff;
  min-height: 40px;
  padding-left: 20px;
  padding-right: 10px;
  align-items: center;
  border-radius: 6px 6px 0 0;
  font-size: 18px;
  font-weight: 600;
  color: #182026;
  ${marginProps};
  ${paddingProps};
  ${flexProps};

  .bp3-icon {
    margin-right: 10px;
    color: #5c7080;
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 20px;
  line-height: 18px;
  ${marginProps};
  ${paddingProps};
  ${flexProps};
`;
export const CardFooter = styled.div`
  display: flex;
  margin: 20px;
  line-height: 18px;
  ${marginProps};
  ${paddingProps};
  ${flexProps};
`;

