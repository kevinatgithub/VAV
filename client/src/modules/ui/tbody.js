import styled from 'styled-components';
import {
  widthProps,
  heightProps,
  marginProps,
  paddingProps,
} from './styling/styling';

const Tbody = styled.tbody`
  ${marginProps};
  ${paddingProps};
  ${widthProps};
  ${heightProps};
`;

export default Tbody;
