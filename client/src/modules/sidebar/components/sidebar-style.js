import { Aside } from '../../ui';

const Wrapper = Aside.extend`
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 50px;
    height: 100%;
    width: 75px;

    > ul {
      border-radius: 0;
      min-width: 75px;
      height: 100%;

      .bp3-icon {
        margin-right: 0;
      }
    }

    .bp3-menu-item {
      flex-direction: column;
      align-items: center;
    }

    .bp3-menu-item-label {
      font-size: 0.8em;
    }
`;


export default {
  Wrapper,
};
