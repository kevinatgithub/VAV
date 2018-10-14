import styled from 'styled-components';

import {
  positionProps,
  backgroundProps,
  heightProps,
  widthProps,
  flexProps,
} from './styling/styling';

const Image = styled.img`
  ${widthProps};
  ${heightProps};
  ${backgroundProps};
  ${positionProps};
  ${flexProps};
`;

export default Image;
