import styled from 'styled-components';
import {
  marginProps,
  paddingProps,
  textAlignProps,
  fontProps,
} from './styling/styling';

const Th = styled.th`
  ${textAlignProps};
  ${marginProps};
  ${paddingProps};
  ${fontProps};
`;

export default Th;
