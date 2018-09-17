/* eslint no-unused-expressions: 0 */
import { injectGlobal } from 'styled-components';

injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #e9eaed;
  }

  #root {
    height: 100%;
  }

  *:focus {outline:none}

  .side-dialog-backdrop + div.bp3-dialog-container {
    justify-content: flex-end;
    align-items: stretch;
  }
`;
