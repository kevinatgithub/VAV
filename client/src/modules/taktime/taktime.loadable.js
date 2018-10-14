import Loadable from '../../core/utils/loadable';

const TaktimeLoadable = Loadable({
  loader: () => import('./taktime.container'),
});

export default TaktimeLoadable;
