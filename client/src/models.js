import appModels from './modules/app/models';
import moModels from './modules/mo/models';
import sideModels from './modules/common/side-dialog/models';

const models = {
  ...appModels,
  ...moModels,
  ...sideModels,
};

export default models;
