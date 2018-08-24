import styled from 'styled-components';
import { flexProps, marginProps, paddingProps, textAlignProps, fontProps, overflowProps } from './styling/styling';

const Label = styled.label`
  color: ${p => p.theme.color[p.color] || p.theme.color.textLight};
  font-size: ${p => p.theme.fontSize.normal};
  padding: ${p => p.noPadding ? 0 : '8px 0'};
  ${flexProps};
  ${textAlignProps};
  ${marginProps};
  ${paddingProps};
  ${fontProps};
  ${overflowProps};
`;

export default Label;
