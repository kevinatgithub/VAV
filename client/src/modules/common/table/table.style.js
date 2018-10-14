import { Div } from 'core/styled';
import styled from 'styled-components';

const Wrapper = styled(Div)`
  display: flex;

  > div,
  .bp3-html-table {
    width: 100%;
  }

  .griddle-cell {
    padding: 10px;
    vertical-align: middle;
  }

  .griddle-pagination {
    margin-top: 15px;
    text-align: right;

    > *:not(:first-child){
      margin-left: 5px;
    }
  }
`;

export default { Wrapper };
