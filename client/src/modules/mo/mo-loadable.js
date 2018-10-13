import Loadable from '../../core/utils/loadable';

const MoLoadable = Loadable({
  loader: () => import('./mo.container'),
});

export default MoLoadable;
