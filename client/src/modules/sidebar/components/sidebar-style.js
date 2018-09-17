import styled from 'styled-components';
import { MenuItem as MenuItemRaw } from '@blueprintjs/core';
import { Aside } from '../../ui';

const Wrapper = Aside.extend`
    position: absolute;
    top: 0;
    left: 0;
    padding-top: ${p => p.theme.metrics.header};
    height: 100%;
    width: ${p => p.theme.metrics.sidebar};

    > ul {
      border-radius: 0;
      min-width: ${p => p.theme.metrics.sidebar};
      height: 100%;

      .bp3-icon {
        margin-top: 0;
      }
    }

    .bp3-menu-item {
      flex-direction: column;
      align-items: center;
      padding-top: 6px;
      padding-bottom: 6px;

      > .bp3-icon {
        margin-right: 0;
        margin-top: 2px;
      }

      > .bp3-text-overflow-ellipsis {
        font-size: 12px;
        margin-top: 2px;
      }

      &.bp3-active {
        background-color: #394b59;
      }
    }
`;

const MenuItem = styled(MenuItemRaw)`
  flex-direction: column;
  align-items: center;


  .bp3-menu-item-label {
    font-size: 0.78em;
  }
`;


export default {
  Wrapper,
  MenuItem,
};
