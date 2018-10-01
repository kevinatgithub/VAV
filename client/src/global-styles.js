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
    display: flex;
    flex-direction: column;
  }

  *:focus {outline:none}

  .side-dialog-backdrop + div.bp3-dialog-container {
    justify-content: flex-end;
    align-items: stretch;
  }

  .slide-enter .bp3-dialog,  .slide-appear .bp3-dialog {
    transform: translate3d(500px, 0, 0);
  }

  .slide-enter.slide-enter-active .bp3-dialog, .slide-appear.slide-appear-active .bp3-dialog {
    transform: translate3d(0px, 0, 0);
    transition: transform 300ms cubic-bezier(0, .52, 0, 1);
  }

  .slide-exit .bp3-dialog {
    transform: translate3d(0px, 0, 0);
  }

  .slide-exit.slide-exit-active .bp3-dialog {
    transform: translate3d(500px, 0, 0);
    transition: transform 300ms cubic-bezier(0, .52, 0, 1);
  }

  .fade-enter {
    opacity: 0.01;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0.01;
    transition: opacity 500ms ease-in;
  }
`;
