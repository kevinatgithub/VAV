import styled from 'styled-components';
import {
  marginProps,
  paddingProps,
  extraProps,
  textAlignProps,
  fontProps,
} from './styling/styling';

const Td = styled.td`
  ${textAlignProps};
  ${marginProps};
  ${extraProps};
  ${paddingProps};
  ${fontProps};
`;

export default Td;
