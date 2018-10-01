import styled from 'styled-components';
import { Spinner as SpinnerRaw } from '@blueprintjs/core';
import { widthProps, heightProps, marginProps, paddingProps } from './styling/styling';

const Spinner = styled(SpinnerRaw)`
  display: inline-block;
  ${widthProps};
  ${heightProps};
  ${marginProps};
  ${paddingProps};
`;

Spinner.SIZE_LARGE = SpinnerRaw.SIZE_LARGE;
Spinner.SIZE_SMALL = SpinnerRaw.SIZE_SMALL;
Spinner.SIZE_STANDARD = SpinnerRaw.SIZE_STANDARD;

export default Spinner;
