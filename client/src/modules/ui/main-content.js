import styled from 'styled-components';
import {
  mainProps,
  widthProps,
  heightProps,
  marginProps,
  paddingProps,
  backgroundProps,
  flexProps,
  textAlignProps,
  fontProps,
  hoverProps,
  borderProps,
  positionProps,
  overflowProps,
  extraProps,
} from './styling/styling';

const MainContent = styled.main`
  display: flex;
  margin-left: ${p => p.theme.metrics.sidebar};
  padding: 20px;
  ${mainProps};
  ${widthProps};
  ${heightProps};
  ${positionProps};
  ${textAlignProps};
  ${marginProps};
  ${extraProps};
  ${hoverProps};
  ${paddingProps};
  ${flexProps};
  ${backgroundProps};
  ${fontProps};
  ${borderProps};
  ${overflowProps};
`;

export default MainContent;
