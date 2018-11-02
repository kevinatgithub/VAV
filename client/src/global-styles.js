/* eslint no-unused-expressions: 0 */
import { injectGlobal } from 'styled-components';
import theme from './core/theme';

injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: ${theme.color.background};
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

  .fade-enter,
  .fade-appear {
    opacity: 0.01;
  }
  .fade-enter-active, .fade-appear-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  .bounce-enter, .bounce-appear {
    opacity: 0;
    transform: scale(0.5);
  }
  .bounce-enter-active, .bounce-appear-active {
    opacity: 1;
    transform: scale(1);
    transition-property: opacity, transform;
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(0.54, 1.12, 0.38, 1.11);
    transition-delay: 0;
  }
  .bounce-exit {
    opacity: 1;
    transform: scale(1);
  }
  .bounce-exit-active {
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(0.54, 1.12, 0.38, 1.11);
    transition-delay: 0;
  }
  .bounce-exit-done {
    opacity: 0;
    transform: scale(0.5);
  }

  .slideVertical-enter,
  .slideVertical-appear {
    overflow-y: hidden;
    max-height: 0px;
  }
  .slideVertical-enter-active, .slideVertical-appear-active {
    overflow-y: hidden;
    max-height: 53px;
    transition: all 300ms cubic-bezier(0, 1, 0.5, 1);
  }
  .slideVertical-exit {
    overflow-y: hidden;
    max-height: 53px;
  }
  .slideVertical-exit-active {
    overflow-y: hidden;
    max-height: 0px;
    transition: all 300ms cubic-bezier(0, 1, 0.5, 1);
  }

  .slideHorizontal-enter,
  .slideHorizontal-appear {
    overflow-y: hidden;
    max-width: 0px;
  }
  .slideHorizontal-enter-active, .slideHorizontal-appear-active {
    overflow-y: hidden;
    max-width: 80px;
    transition: all 300ms cubic-bezier(0, 1, 0.5, 1);
  }
  .slideHorizontal-exit {
    overflow-y: hidden;
    max-width: 80px;
  }
  .slideHorizontal-exit-active {
    overflow-y: hidden;
    max-width: 0px;
    transition: all 300ms cubic-bezier(0, 1, 0.5, 1);
  }
`;
