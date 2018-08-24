const PATHS = require('./paths');
const sharedConfig = require(`${PATHS.config}/shared`);

function getConfig(env) {
  if (env && env.production) {
    return require(`${PATHS.config}/prod`);
  } else if (env && env.test) {
    return require(`${PATHS.config}/test`);
  }
  return require(`${PATHS.config}/dev`);
}

function getClientEnvironment(env) {
  const envConfig = getConfig(env);
  const config = Object.assign({}, sharedConfig, envConfig);
  return Object.keys(config).reduce((acc, key) => {
    acc[key] = JSON.stringify(config[key]);
    return acc;
  }, {});
}

module.exports = getClientEnvironment;
