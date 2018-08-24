import styled from 'styled-components';
import {
  heightProps,
  widthProps,
  marginProps,
  paddingProps,
} from './styling/styling';

const Ul = styled.ul`
  overflow: -moz-scrollbars-vertical;
  overflow-y: auto;
  ${heightProps};
  ${widthProps};
  ${marginProps};
  ${paddingProps};
`;

export default Ul;
