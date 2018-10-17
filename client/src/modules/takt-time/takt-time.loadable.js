import Loadable from '../../core/utils/loadable';

const TaktimeLoadable = Loadable({
  loader: () => import(/* webpackChunkName: "takt-time" */'./takt-time.container'),
});

export default TaktimeLoadable;
