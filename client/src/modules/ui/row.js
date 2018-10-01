import styled from 'styled-components';
import { Row as RowRaw, Col } from 'react-flexbox-grid';
import { widthProps, heightProps, positionProps, marginProps, paddingProps, overflowProps } from './styling/styling';

const Row = styled(RowRaw)`
  ${widthProps};
  ${heightProps};
  ${positionProps};
  ${marginProps};
  ${paddingProps};
  ${overflowProps};
`;

Row.Col = styled(Col)`
  ${widthProps};
  ${heightProps};
  ${positionProps};
  ${marginProps};
  ${paddingProps};
  ${overflowProps};
`;

export default Row;
