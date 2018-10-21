import { LoadableWithModel } from '../../core/utils/loadable';

const MoLoadable = store => LoadableWithModel({
  loader: {
    Models: () => import(/* webpackChunkName: "mo-models" */'./models'),
    Component: () => import(/* webpackChunkName: "mo" */'./mo.container'),
  },
  store,
});

export default MoLoadable;
