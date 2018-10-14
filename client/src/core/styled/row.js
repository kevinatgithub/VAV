import styled from 'styled-components';
import { Row as RowRaw, Col } from 'react-flexbox-grid';
import { widthProps, heightProps, positionProps, marginProps, paddingProps, overflowProps } from './styling/styling';

const Row = styled(RowRaw)`
  &.row {
    margin-left: 0px;
    margin-right: 0px;
  }

  > div[class^="col-"]:first-child {
    padding-left: 0px;
  };
  > div[class^="col-"]:last-child {
    padding-right: 0px;
  };
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
