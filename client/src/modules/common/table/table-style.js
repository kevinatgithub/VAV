import { Div } from '../../ui';

const Wrapper = Div.extend`
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
