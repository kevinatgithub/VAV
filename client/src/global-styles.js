/* eslint no-unused-expressions: 0 */
import { injectGlobal } from 'styled-components';

/* VENDOR HERE */
import 'normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

/* GLOBAL APP STYLE HERE */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #f5f8fa;
  }

  #root {
    height: 100%;
  }
`;
