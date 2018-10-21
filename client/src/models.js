import appModels from './modules/app/models';
import sideModels from './modules/common/side-dialog/models';

const models = {
  ...appModels,
  ...sideModels,
};

export default models;
