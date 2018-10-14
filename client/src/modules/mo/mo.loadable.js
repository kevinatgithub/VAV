import Loadable from '../../core/utils/loadable';

const MoLoadable = Loadable({
  loader: () => import(/* webpackChunkName: "mo" */ './mo.container'),
});

export default MoLoadable;
