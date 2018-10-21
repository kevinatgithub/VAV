import { LoadableWithModel } from '../../core/utils/loadable';

const TaktimeLoadable = store => LoadableWithModel({
  loader: {
    Models: () => import(/* webpackChunkName: "takt-time-models" */'./models'),
    Component: () => import(/* webpackChunkName: "takt-time" */'./takt-time.container'),
  },
  store,
});

export default TaktimeLoadable;
