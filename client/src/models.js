import appModels from './modules/app/models';
import moModels from './modules/mo/models';

const models = {
  ...appModels,
  ...moModels,
};

export default models;
