import appModels from './modules/app/models';
import moModels from './modules/mo/models';
import sideModels from './modules/common/side-dialog/models';
import taktimeModels from './modules/taktime/models';

const models = {
  ...appModels,
  ...moModels,
  ...sideModels,
  ...taktimeModels,
};

export default models;
