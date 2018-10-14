import Loadable from '../../core/utils/loadable';

const TaktimeLoadable = Loadable({
  loader: () => import(/* webpackChunkName: "taktime" */'./taktime.container'),
});

export default TaktimeLoadable;
