import styled from 'styled-components';
import {
  heightProps,
  widthProps,
  paddingProps,
  marginProps,
} from './styling/styling';

const Table = styled.table`
  ${widthProps};
  ${heightProps};
  ${marginProps};
  ${paddingProps};
`;

export default Table;
