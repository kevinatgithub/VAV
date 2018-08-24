import styled from 'styled-components';
import {
  marginProps,
  paddingProps,
  flexProps,
  positionProps,
  backgroundProps,
  fontProps,
  borderProps,
  overflowProps,
  textAlignProps,
  extraProps,
  heightProps,
  widthProps,
} from './styling/styling';

const Flex = styled.div`
  ${marginProps};
  ${paddingProps};
  ${positionProps};
  ${fontProps};
  ${backgroundProps};
  ${borderProps};
  ${textAlignProps};
  ${heightProps};
  ${widthProps};
  ${flexProps};
  ${overflowProps};
  ${extraProps};
`;

export default Flex;
