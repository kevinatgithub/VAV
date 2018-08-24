import styled from 'styled-components';
import {
  marginProps,
  paddingProps,
  textAlignProps,
  fontProps,
  overflowProps,
  borderProps,
} from './styling/styling';

const Title = styled.span`
  color: ${p => p.primary ? p.theme.color.primary : p.theme.color.text};
  font-size: ${p => p.theme.fontSize[p.size] || p.theme.fontSize.h2};
  font-weight: 300;
  ${textAlignProps};
  ${marginProps};
  ${paddingProps};
  ${fontProps};
  ${overflowProps};
  ${borderProps};
`;

export default Title;
