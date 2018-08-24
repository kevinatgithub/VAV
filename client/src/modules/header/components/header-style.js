import { Layout } from 'antd';
import styled from 'styled-components';
import { Div, Image, Button } from '../../ui';

export const Wrapper = styled(Layout.Header)`
  background-color: #fff;
  padding: 0;

  > div {
    height: 100%;
  }
`;

export const Right = styled(Div)`
  background-color: ${p => p.theme.color.primary};
`;

export const HeaderButton = styled(Button)`
  &.ant-btn {
    line-height: normal;
    border-right-color: ${p => p.theme.color.borderPrimary};
    border-left-color: ${p => p.theme.color.borderPrimary};
    border-right-width: ${p => p.borderRight ? '1px' : 0};
    border-left-width: ${p => p.borderLeft ? '1px' : 0};
    min-width: 70px;
    padding: 0 10px;
    border-radius: 0;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const RotatingImage = Image.extend`
  -webkit-transition: -webkit-transform 0.6s ease-in-out;
  transition: transform 0.6s ease-in-out;

  &:hover {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;
