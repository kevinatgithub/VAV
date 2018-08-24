import styled from 'styled-components';
import {
  marginProps,
  paddingProps,
  heightProps,
  widthProps,
  fontProps,
  extraProps,
  indentProps,
} from './styling/styling';

const Li = styled.li`
  ${marginProps};
  ${paddingProps};
  ${heightProps};
  ${widthProps};
  ${fontProps};
  ${extraProps};
  ${indentProps};
`;

export default Li;
