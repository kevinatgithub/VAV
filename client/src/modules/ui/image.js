import styled from 'styled-components';

import {
  positionProps,
  backgroundProps,
  heightProps,
  widthProps,
} from './styling/styling';

const Image = styled.img`
  ${widthProps};
  ${heightProps};
  ${backgroundProps};
  ${positionProps};
`;

export default Image;
