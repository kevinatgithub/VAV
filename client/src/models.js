import appModels from './modules/app/models';
import moModels from './modules/mo/models';
import sideModels from './modules/common/side-dialog/models';
import taktTimeModels from './modules/takt-time/models';

const models = {
  ...appModels,
  ...moModels,
  ...sideModels,
  ...taktTimeModels,
};

export default models;
