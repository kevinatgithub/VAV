import { LoadableWithModel } from '../../core/utils/loadable';

const BoardLoadable = store => LoadableWithModel({
  loader: {
    Models: () => import(/* webpackChunkName: "board-models" */'./models'),
    Component: () => import(/* webpackChunkName: "board" */'./board.container'),
  },
  store,
});

export default BoardLoadable;
